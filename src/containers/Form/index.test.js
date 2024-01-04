import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";


// Début du bloc de tests pour la création du formulaire
describe("When form is created", () => {
  // Test pour vérifier si une liste d'inputs est affichée
  it("a list of input is displayed", async () => {
    // Rendu du composant Form
    render(<Form />);
    // Recherche des textes "Email", "Nom", "Prénom" et "Personel / Entreprise" dans le document
    // Ces opérations sont asynchrones car elles attendent que les textes apparaissent
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });


  // Début du bloc de tests pour le cas où un clic est déclenché sur le bouton de soumission
  describe("and a click is triggered on the submit button", () => {
    // Test pour vérifier si l'action de succès est appelée
    it("the success action is called", async () => {
      // Création d'une fonction mock pour l'action de succès
      const onSuccess = jest.fn();
      // Rendu du composant Form avec la prop onSuccess
      render(<Form onSuccess={onSuccess} />);
      // Simulation d'un clic sur le bouton de soumission
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      // Recherche des textes "En cours" et "Envoyer" dans le document
      // Ces opérations sont asynchrones car elles attendent que les textes apparaissent
      await screen.findByText("En cours");
      await screen.findByText("Envoyer");
      // Vérification que l'action de succès a été appelée
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
