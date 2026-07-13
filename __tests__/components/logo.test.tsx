import { render } from "@testing-library/react"
import { Logo } from "@/components/ui/logo"

describe("Logo Component", () => {
  it("should render successfully", () => {
    const { container } = render(<Logo />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("should apply custom classes", () => {
    const { container } = render(<Logo className="custom-test-class" />)
    const svgElement = container.querySelector("svg")
    
    expect(svgElement).toHaveClass("custom-test-class")
    expect(svgElement).toHaveClass("h-8") // default class
  })

  it("should contain the necessary SVG paths and definitions", () => {
    const { container } = render(<Logo />)
    
    // Check for definitions
    const defs = container.querySelector("defs")
    expect(defs).toBeInTheDocument()
    
    // Check for specific gradients that form the tactical theme
    expect(container.querySelector("#aegis-grad")).toBeInTheDocument()
    expect(container.querySelector("#aegis-grad-2")).toBeInTheDocument()
    
    // Check for the center intelligence node
    const circles = container.querySelectorAll("circle")
    expect(circles.length).toBeGreaterThan(0)
  })
})
