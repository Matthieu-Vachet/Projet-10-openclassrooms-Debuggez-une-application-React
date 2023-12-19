import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./index";

describe("When Menu is created", () => {
  it("a list of mandatories links and the logo are displayed", async () => {
    render(<Menu />);
    await screen.findByText("Nos services");
    await screen.findByText("Nos réalisations");
    await screen.findByText("Notre équipe");
    await screen.findByText("Contact");
  });

  describe("and a click is triggered on contact button", () => {
    it("document location  href change", async () => {
      render(<Menu />);
      fireEvent(
        await screen.findByText("Contact"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      expect(window.document.location.hash).toEqual("#contact");
    });
  });

  describe("to click on a link", () => {
    it("we are redirected to the section concerned", async () => {
      render(<Menu />);
      
    const servicesLink = screen.getByText(/Nos services/i);
    const realisationsLink = screen.getByText(/Nos réalisation/i);
    const equipeLink = screen.getByText(/Notre équipe/i);

    expect(servicesLink).toHaveAttribute("href", "#nos-services");
    expect(realisationsLink).toHaveAttribute("href", "#nos-realisations");
    expect(equipeLink).toHaveAttribute("href", "#notre-equipe");
    });
  })
});
