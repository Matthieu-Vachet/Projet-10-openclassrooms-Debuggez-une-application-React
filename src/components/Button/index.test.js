import { fireEvent, render, screen } from "@testing-library/react";
import Button, { BUTTON_TYPES } from "./index";

// Début du bloc de tests pour la création d'un bouton
describe("When a button is created", () => {
  // Test pour vérifier si le bouton inclut un titre
  it("the button must include a title", () => {
    // Rendu du composant Button avec les props title et type
    render(<Button title="my-button" type={BUTTON_TYPES.DEFAULT} />);
    // Recherche du bouton par son titre
    const buttonElement = screen.getByTitle("my-button");
    // Vérification que le bouton est présent dans le document
    expect(buttonElement).toBeInTheDocument();
  });
  // Test pour vérifier si le bouton affiche un label
  it("the button must display a label", () => {
    // Rendu du composant Button avec le label "label"
    render(<Button>label</Button>);
    // Recherche du bouton par son label
    const buttonElement = screen.getByText(/label/);
    // Vérification que le bouton est présent dans le document
    expect(buttonElement).toBeInTheDocument();
  });


  // Début du bloc de tests pour le cas où le bouton est cliqué
  describe("and it's clicked", () => {
    // Test pour vérifier si un événement onClick est exécuté
    it("an event onClick it executed", () => {
      // Création d'un mock pour la fonction onClick
      const onClick = jest.fn();
      // Rendu du composant Button avec la prop onClick
      render(<Button onClick={onClick} />);
      // Recherche du bouton par son test ID
      const buttonElement = screen.getByTestId("button-test-id");
      // Simulation d'un clic sur le bouton
      fireEvent(
        buttonElement,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
      // Vérification que la fonction onClick a été appelée au moins une fois
      expect(onClick.mock.calls.length).toBeGreaterThan(0);
    });
  });


  // Début du bloc de tests pour le cas où le type sélectionné est "submit"
  describe("and selected type is submit", () => {
    // Test pour vérifier si un input de type "submit" est créé
    it("an input submit is created", () => {
      // Rendu du composant Button avec le type "submit" et le label "label"
      render(<Button type={BUTTON_TYPES.SUBMIT}>label</Button>);
      // Recherche du bouton par son test ID
      const buttonElement = screen.getByTestId("button-test-id");
      // Vérification que le type du bouton est "submit"
      expect(buttonElement.type).toEqual("submit");
    });
  });
});
