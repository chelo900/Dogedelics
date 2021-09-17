import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("Landing Page", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(
    "Dog-edelics: a place where you can find all you want to know about those four-leged little friends"
  );
  expect(linkElement).toBeInTheDocument();
});

test("this has a button to begin", () => {
  render(
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  );
  const button = screen.getByText(/connect/i);
  expect(button).toBeInTheDocument();
});
