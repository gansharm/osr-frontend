import { act, fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";
import Navbar from "./components/Navbar";
import ExhibitionPage from "./components/ExhibitionPage";
import ProductDetail from "./components/ProductDetail";
import { products } from "./data/siteData";

let mockNavigate;
let mockPathname = "/";
let mockProductSlug = products[0].slug;

jest.mock(
  "react-router-dom",
  () => {
    const React = require("react");

    return {
      BrowserRouter: ({ children }) => <>{children}</>,
      Routes: ({ children }) => <>{React.Children.toArray(children)[0]}</>,
      Route: ({ element }) => element,
      Navigate: () => null,
      useNavigate: () => mockNavigate,
      useLocation: () => ({ pathname: mockPathname }),
      useParams: () => ({ productSlug: mockProductSlug }),
    };
  },
  { virtual: true }
);

beforeEach(() => {
  mockNavigate = jest.fn();
  mockPathname = "/";
  mockProductSlug = products[0].slug;
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  window.localStorage.removeItem("exhibitionSubscriber");
});

afterEach(() => {
  document.body.classList.remove("nav-open");
  jest.useRealTimers();
});

test("renders the OSR Solutions homepage", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /Industrial Printing Solutions Experts/i,
    })
  ).toBeInTheDocument();
});

test("mobile navigation opens, navigates, and removes the overlay after closing", () => {
  jest.useFakeTimers();
  render(<Navbar />);

  fireEvent.click(screen.getByRole("button", { name: /toggle navigation menu/i }));

  const mobileMenu = document.querySelector(".mobile-menu.show");
  expect(mobileMenu).toBeInTheDocument();
  expect(document.body).toHaveClass("nav-open");

  fireEvent.click(within(mobileMenu).getByRole("button", { name: /products/i }));

  expect(mockNavigate).toHaveBeenCalledWith("/products");
  expect(document.body).not.toHaveClass("nav-open");

  act(() => {
    jest.advanceTimersByTime(400);
  });

  expect(document.querySelector(".mobile-menu")).not.toBeInTheDocument();
});

test("mobile section links close the menu before scrolling", () => {
  jest.useFakeTimers();
  const scrollIntoView = jest.fn();
  Element.prototype.scrollIntoView = scrollIntoView;

  render(
    <>
      <Navbar />
      <section id="about">About section</section>
    </>
  );

  fireEvent.click(screen.getByRole("button", { name: /toggle navigation menu/i }));

  const mobileMenu = document.querySelector(".mobile-menu.show");
  fireEvent.click(within(mobileMenu).getByRole("button", { name: /about/i }));

  expect(document.body).not.toHaveClass("nav-open");
  expect(scrollIntoView).not.toHaveBeenCalled();

  act(() => {
    jest.advanceTimersByTime(420);
  });

  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
});

test("navbar active state follows the current route", () => {
  const { rerender } = render(<Navbar />);

  expect(screen.getByRole("button", { name: "Home" })).toHaveClass("active");

  [
    ["/about", "About Us"],
    ["/products", "Products"],
    ["/products/uv-printer", "Products"],
    ["/services", "Services"],
    ["/gallery", "Gallery"],
    ["/exhibition", "Exhibition"],
    ["/contact", "Contact Us"],
    ["/reviews", "Reviews"],
  ].forEach(([path, label]) => {
    mockPathname = path;
    rerender(<Navbar />);

    expect(screen.getByRole("button", { name: "Home" })).not.toHaveClass("active");
    expect(screen.getByRole("button", { name: label })).toHaveClass("active");
  });
});

test("exhibition update subscription persists and prevents duplicate registration", () => {
  const { unmount } = render(<ExhibitionPage />);

  fireEvent.click(screen.getByRole("button", { name: /stay updated/i }));

  expect(window.localStorage.getItem("exhibitionSubscriber")).toBe("true");
  expect(screen.getByRole("button", { name: /joined/i })).toHaveAttribute("aria-pressed", "true");
  expect(
    screen.getByRole("heading", { name: /successfully joined/i })
  ).toBeInTheDocument();

  unmount();
  render(<ExhibitionPage />);

  const joinedButton = screen.getByRole("button", { name: /joined/i });
  expect(joinedButton).toHaveAttribute("aria-pressed", "true");
  fireEvent.click(joinedButton);

  expect(screen.getByRole("heading", { name: /already joined/i })).toBeInTheDocument();
  expect(window.localStorage.getItem("exhibitionSubscriber")).toBe("true");
});

test("product detail mobile controls update thumbnails and accordion state", () => {
  render(<ProductDetail />);

  const thumbs = document.querySelectorAll(".detail-thumbs button");
  expect(thumbs.length).toBeGreaterThan(0);
  fireEvent.click(thumbs[0]);
  expect(thumbs[0]).toHaveClass("active");

  const specificationsHeader = Array.from(document.querySelectorAll(".accordion-header")).find(
    (button) => button.textContent.includes("Specifications")
  );
  expect(specificationsHeader).toBeInTheDocument();

  const accordionItem = specificationsHeader.closest(".accordion-item");
  expect(accordionItem.querySelector(".accordion-panel")).not.toHaveClass("open");

  fireEvent.click(specificationsHeader);

  expect(accordionItem.querySelector(".accordion-panel")).toHaveClass("open");
});
