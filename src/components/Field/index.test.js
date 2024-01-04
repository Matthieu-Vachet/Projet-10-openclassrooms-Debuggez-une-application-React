import { fireEvent, render, screen } from "@testing-library/react";
import Field, { FIELD_TYPES } from "./index";


// Début du bloc de tests pour la création d'un champ
describe("When a field is created", () => {
  // Test pour vérifier si un nom est défini sur le champ
  it("a name is set on the field", () => {
    // Rendu du composant Field avec la prop name
    render(<Field name="field-name" />);
    // Recherche du champ par son test ID
    const fieldElement = screen.getByTestId("field-testid");
    // Vérification que le champ est présent dans le document et que son nom est "field-name"
    expect(fieldElement).toBeInTheDocument();
    expect(fieldElement.name).toEqual("field-name");
  });
  // Test pour vérifier si un placeholder est défini sur le champ
  it("a placeholder is set on the field", () => {
    // Rendu du composant Field avec les props placeholder et name
    render(<Field placeholder="field-placeholder" name="test" />);
    // Recherche du champ par son test ID
    const fieldElement = screen.getByTestId("field-testid");
    // Vérification que le placeholder du champ est "field-placeholder"
    expect(fieldElement.placeholder).toEqual("field-placeholder");
  });
  // Test pour vérifier si un label est défini avec le champ
  it("a label is set with field", () => {
    // Rendu du composant Field avec les props placeholder, label et name
    render(<Field placeholder="field-placeholder" label="field_label" name="test" />);
    // Recherche du label par son texte
    const labelElement = screen.getByText(/field_label/);
    // Vérification que le label est présent dans le document
    expect(labelElement).toBeInTheDocument();
  });


  // Début du bloc de tests pour le cas où la valeur du champ change
  describe("and its valued changed", () => {
    // Test pour vérifier si une valeur onChange est exécutée
    it("a onChange value is executed", () => {
      // Création d'un mock pour la fonction onChange
      const onChange = jest.fn();
      // Rendu du composant Field avec la prop onChange et name
      render(<Field onChange={onChange} name="test" />);
      // Recherche du champ par son test ID
      const fieldElement = screen.getByTestId("field-testid");
      // Simulation d'un clic sur le champ
      fireEvent(
        fieldElement,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
    });
  });


  // Début du bloc de tests pour le cas où le type du champ est défini sur FIELD_TYPES.INPUT_TEXT
  describe("and its type is set to FIELD_TYPES.INPUT_TEXT", () => {
    // Test pour vérifier si un champ de texte est rendu
    it("a text input is rendered", () => {
      // Désactivation des avertissements de propTypes
      window.console.error = jest.fn().mockImplementation(() => null);
      // Rendu du composant Field avec les props type et name
      render(<Field type={FIELD_TYPES.INPUT_TEXT} name="test" />);
      // Recherche du champ par son test ID
      const fieldElement = screen.getByTestId("field-testid");
      // Vérification que le type du champ est "text"
      expect(fieldElement.type).toEqual("text");
    });
  });


  // Début du bloc de tests pour le cas où le type du champ est défini sur FIELD_TYPES.TEXTAREA
  describe("and its type is set to FIELD_TYPES.TEXTAREA", () => {
    // Test pour vérifier si une zone de texte est rendue
    it("a textarea is rendered", () => {
      // Désactivation des avertissements de propTypes
      window.console.error = jest.fn().mockImplementation(() => null);
      // Rendu du composant Field avec les props type et name
      render(<Field type={FIELD_TYPES.TEXTAREA} name="test" />);
      // Recherche du champ par son test ID
      const fieldElement = screen.getByTestId("field-testid");
      // Vérification que le type du champ est "textarea"
      expect(fieldElement.type).toEqual("textarea");
    });
  });


  // Début du bloc de tests pour le cas où le type du champ est défini sur une valeur incorrecte
  describe("and its type is set to a wrong value", () => {
    // Test pour vérifier si un champ de texte est rendu
    it("a text input is rendered", () => {
      // Désactivation des avertissements de propTypes
      window.console.error = jest.fn().mockImplementation(() => null);
      // Rendu du composant Field avec les props type et name
      render(<Field type="wrong-type" name="test" />);
      // Recherche du champ par son test ID
      const fieldElement = screen.getByTestId("field-testid");
      // Vérification que le type du champ est "text"
      expect(fieldElement.type).toEqual("text");
    });
  });
});
