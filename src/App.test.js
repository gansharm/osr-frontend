import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock(
  "react-router-dom",
  () => {
    const React = require("react");

    return {
      BrowserRouter: ({ children }) => <>{children}</>,
      Routes: ({ children }) => <>{React.Children.toArray(children)[0]}</>,
      Route: ({ element }) => element,
      Navigate: () => null,
      useNavigate: () => jest.fn(),
      useLocation: () => ({ pathname: "/" }),
      useParams: () => ({}),
    };
  },
  { virtual: true }
);

test("renders the OSR Solutions homepage", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /Industrial Printing Solutions Experts/i,
    })
  ).toBeInTheDocument();
});
