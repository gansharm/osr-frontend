import { act, fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";
import Navbar from "./components/Navbar";
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

  expect(mockNavigate).toHaveBeenCalledWith("/services");
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
