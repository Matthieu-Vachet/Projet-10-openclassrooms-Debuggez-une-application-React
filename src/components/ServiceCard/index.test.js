import { render, screen } from "@testing-library/react";
import ServiceCard from "./index";


// Début du bloc de tests pour le cas où une carte de service est créée
describe("When a service card is created", () => {
  // Test pour vérifier si une image est affichée avec une valeur alt
  it("an image is display with alt value", () => {
    // Rendu du composant ServiceCard avec les props imageSrc et imageAlt
    render(
      <ServiceCard imageSrc="http://src-image" imageAlt="image-alt-text">{" "}</ServiceCard>
    );
    // Recherche de l'élément image par son test ID
    const imageElement = screen.getByTestId("card-image-testid");
    // Vérification que l'élément image est dans le document
    expect(imageElement).toBeInTheDocument();
    // Vérification que l'attribut alt de l'élément image est égal à "image-alt-text"
    expect(imageElement.alt).toEqual("image-alt-text");
  });
  // Test pour vérifier si un contenu est affiché
  it("a content is displayed", () => {
    // Rendu du composant ServiceCard avec les props imageSrc, imageAlt et des enfants
    render(
      <ServiceCard imageSrc="http://src-image" imageAlt="image-alt-text">
        This is the card content
      </ServiceCard>
    );
    // Recherche de l'élément content par son texte
    const contentElement = screen.getByText(/This is the card content/);
    // Vérification que l'élément content est dans le document
    expect(contentElement).toBeInTheDocument();
  });
});
