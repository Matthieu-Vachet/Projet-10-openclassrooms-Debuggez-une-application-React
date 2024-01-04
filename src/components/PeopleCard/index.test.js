import { render, screen } from "@testing-library/react";
import PeopleCard from "./index";


// Début du bloc de tests pour le cas où une carte de personnes est créée
describe("When a people card is created", () => {
  // Test pour vérifier si une image est affichée avec une valeur alt
  it("an image is display with alt value", () => {
    // Rendu du composant PeopleCard avec les props imageSrc, imageAlt, name et position
    render(
      <PeopleCard imageSrc="http://src-image" imageAlt="image-alt-text"
        name="test name"
        position="test position" />
    );
    // Recherche de l'élément image par son test ID
    const imageElement = screen.getByTestId("card-image-testid");
    // Vérification que l'élément image est dans le document
    expect(imageElement).toBeInTheDocument();
    // Vérification que l'attribut alt de l'élément image est égal à "image-alt-text"
    expect(imageElement.alt).toEqual("image-alt-text");
  });
  // Test pour vérifier si un titre et un mois sont affichés
  it("a title and a month are displayed", () => {
    // Rendu du composant PeopleCard avec les props imageSrc, imageAlt, name et position
    render(
      <PeopleCard
        imageSrc="http://src-image"
        imageAlt="image-alt-text"
        name="test name"
        position="test position"
      />
    );
    // Recherche de l'élément name par son texte
    const nameElement = screen.getByText(/test name/);
    // Recherche de l'élément title par son texte
    const titleElement = screen.getByText(/test position/);
    // Vérification que l'élément name est dans le document
    expect(nameElement).toBeInTheDocument();
    // Vérification que l'élément title est dans le document
    expect(titleElement).toBeInTheDocument();
  });
});
