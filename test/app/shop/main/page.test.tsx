import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import Page from "@/app/shop/main/page"

test("Page", () => {
  render(<Page />)
  expect(screen.getByText("TestPage")).toBeDefined()
  expect(
    screen.getByRole("heading", { level: 1, name: "Welcome" }),
  ).toBeDefined()
})
