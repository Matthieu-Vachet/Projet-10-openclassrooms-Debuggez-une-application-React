import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./index";


// Début du bloc de tests pour la création du Menu
describe("When Menu is created", () => {
  // Test pour vérifier si une liste de liens obligatoires et le logo sont affichés
  it("a list of mandatories links and the logo are displayed", async () => {
    // Rendu du composant Menu
    render(<Menu />);
    // Recherche des textes "Nos services", "Nos réalisations", "Notre équipe" et "Contact" dans le document
    // Ces opérations sont asynchrones car elles attendent que les textes apparaissent
    await screen.findByText("Nos services");
    await screen.findByText("Nos réalisations");
    await screen.findByText("Notre équipe");
    await screen.findByText("Contact");
  });


  // Début du bloc de tests pour le cas où un clic est déclenché sur le bouton de contact
  describe("and a click is triggered on contact button", () => {
    // Test pour vérifier si l'emplacement du document change
    it("document location  href change", async () => {
      // Rendu du composant Menu
      render(<Menu />);
      // Simulation d'un clic sur le bouton de contact
      fireEvent(
        await screen.findByText("Contact"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      // Vérification que l'emplacement du document a changé pour "#contact"
      expect(window.document.location.hash).toEqual("#contact");
    });
  });


  // Début du bloc de tests pour le cas où un clic est déclenché sur un lien
  describe("to click on a link", () => {
    // Test pour vérifier si nous sommes redirigés vers la section concernée
    it("we are redirected to the section concerned", async () => {
      // Rendu du composant Menu
      render(<Menu />);
      // Recherche des liens "Nos services", "Nos réalisations" et "Notre équipe" dans le document
      const servicesLink = screen.getByText(/Nos services/i);
      const realisationsLink = screen.getByText(/Nos réalisation/i);
      const equipeLink = screen.getByText(/Notre équipe/i);
      // Vérification que les liens ont les attributs href corrects
      expect(servicesLink).toHaveAttribute("href", "#nos-services");
      expect(realisationsLink).toHaveAttribute("href", "#nos-realisations");
      expect(equipeLink).toHaveAttribute("href", "#notre-equipe");
    });
  })
});
