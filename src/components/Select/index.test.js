import { fireEvent, render, screen } from "@testing-library/react";
import Select from "./index";


// Début du bloc de tests pour le cas où un élément select est créé
describe("When a select is created", () => {
  // Test pour vérifier si une liste de choix est affichée
  it("a list of choices is displayed", () => {
    // Rendu du composant Select avec la prop selection
    render(<Select selection={["value1", "value2"]} />);
    // Recherche de l'élément select par son test ID
    const selectElement = screen.getByTestId("select-testid");
    // Recherche de l'élément selectDefault par son texte
    const selectDefault = screen.getByText("Toutes");
    // Vérification que l'élément select est dans le document
    expect(selectElement).toBeInTheDocument();
    // Vérification que l'élément selectDefault est dans le document
    expect(selectDefault).toBeInTheDocument();
  });
  // Test pour vérifier si un bouton d'action de repliement est affiché
  it("a collapse action button is displayed", () => {
    // Rendu du composant Select avec la prop selection
    render(<Select selection={["value1", "value2"]} />);
    // Recherche de l'élément collapseButton par son test ID
    const collapseButtonElement = screen.getByTestId("collapse-button-testid");
    // Vérification que l'élément collapseButton est dans le document
    expect(collapseButtonElement).toBeInTheDocument();
  });


  // Début du bloc de tests pour le cas où un élément select est créé avec une étiquette
  describe("with a label", () => {
    // Test pour vérifier si une étiquette est affichée
    it("a label is displayed", () => {
      // Rendu du composant Select avec les props label et selection
      render(<Select label="label" selection={["value1", "value2"]} />);
      // Recherche de l'élément labelDefault par son texte
      const labelDefault = screen.getByText("label");
      // Vérification que l'élément labelDefault est dans le document
      expect(labelDefault).toBeInTheDocument();
    });
  });


  // Début du bloc de tests pour le cas où un clic est déclenché sur le bouton de repliement
  describe("and a click is trigger on collapse button", () => {
    // Test pour vérifier si une liste de valeurs est affichée
    it("a list of values is displayed", () => {
      // Rendu du composant Select avec la prop selection
      render(<Select selection={["value1", "value2"]} />);
      // Recherche de l'élément collapseButton par son test ID
      const collapseButtonElement = screen.getByTestId("collapse-button-testid");
      // Déclenchement d'un événement de clic sur l'élément collapseButton
      fireEvent(
        collapseButtonElement,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
      // Recherche des éléments choice1 et choice2 par leur texte
      const choice1 = screen.getByText("value1");
      const choice2 = screen.getByText("value2");
      // Vérification que les éléments choice1 et choice2 sont dans le document
      expect(choice1).toBeInTheDocument();
      expect(choice2).toBeInTheDocument();
    });


    // Début du bloc de tests pour le cas où un clic est déclenché sur un élément de choix
    describe("and a click is triggered on a choice item", () => {
      // Test pour vérifier si un callback onChange est appelé
      it("a onChange callback is called", () => {
        // Création d'un mock pour la fonction onChange
        const onChange = jest.fn();
        // Rendu du composant Select avec les props selection et onChange
        render(<Select selection={["value1", "value2"]} onChange={onChange} />);
        // Recherche de l'élément collapseButton par son test ID
        const collapseButtonElement = screen.getByTestId("collapse-button-testid");
        // Déclenchement d'un événement de clic sur l'élément collapseButton
        fireEvent(
          collapseButtonElement,
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
        // Recherche de l'élément choice1 par son texte
        const choice1 = screen.getByText("value1");
        // Déclenchement d'un événement de clic sur l'élément choice1
        fireEvent(
          choice1,
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
        // Vérification que la fonction onChange a été appelée au moins une fois
        expect(onChange.mock.calls.length).toBeGreaterThan(0);

        // Déclenchement d'un autre événement de clic sur l'élément collapseButton
        fireEvent(
          collapseButtonElement,
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
        // Recherche de l'élément choiceAll par son texte
        const choiceAll = screen.getByText("Toutes");
        // Déclenchement d'un événement de clic sur l'élément choiceAll
        fireEvent(
          choiceAll,
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
          })
        );
        // Vérification que la fonction onChange a été appelée plus d'une fois
        expect(onChange.mock.calls.length).toBeGreaterThan(1);
      });
    });
  });
});
