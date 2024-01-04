/* eslint-disable react/self-closing-comp */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./index";


// Début du bloc de tests pour la création des données du Modal
describe("When Modal data is created", () => {
  // Test pour vérifier si le contenu du modal est affiché
  it("a modal content is display", () => {
    // Rendu du composant Modal avec la prop opened et le contenu "modal content"
    render(
      <Modal opened Content={<div>modal content</div>}>
        {() => null}
      </Modal>
    );
    // Vérification que le texte "modal content" est présent dans le document
    expect(screen.getByText("modal content")).toBeInTheDocument();
  });


  // Début du bloc de tests pour le cas où un clic est déclenché pour afficher le modal
  describe("and a click is triggered to display the modal", () => {
    // Test pour vérifier si le contenu du modal est affiché
    it("the content of modal is displayed", async () => {
      // Rendu du composant Modal avec le contenu "modal content" et un bouton pour ouvrir le modal
      render(
        <Modal Content={<div>modal content</div>}>
          {() => <button data-testid="open-modal"></button>}
        </Modal>
      );
      // Vérification que le texte "modal content" n'est pas présent dans le document
      expect(screen.queryByText("modal content")).not.toBeInTheDocument();
      // Simulation d'un clic sur le bouton pour ouvrir le modal
      fireEvent(
        screen.getByTestId("open-modal"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
    });
  });


  // Début du bloc de tests pour le cas où un clic est déclenché sur le bouton de fermeture du modal
  describe("and a click is triggered to the close button modal", () => {
    // Test pour vérifier si le contenu du modal est caché
    it("the content of the modal is hide", async () => {
      // Rendu du composant Modal avec la prop opened et le contenu "modal content"
      render(
        <Modal opened Content={<div>modal content</div>}>
          {() => null}
        </Modal>
      );
      // Vérification que le texte "modal content" est présent dans le document
      expect(screen.getByText("modal content")).toBeInTheDocument();
      // Simulation d'un clic sur le bouton pour fermer le modal
      fireEvent(
        screen.getByTestId("close-modal"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      // Vérification que le texte "modal content" n'est pas présent dans le document
      expect(screen.queryByText("modal content")).not.toBeInTheDocument();
    });
  });
});
