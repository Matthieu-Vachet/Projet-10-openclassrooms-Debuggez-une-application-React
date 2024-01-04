import { render, screen } from "@testing-library/react";
import EventCard from "./index";

// Début du bloc de tests pour la création d'une carte d'événement
describe("When a event card is created", () => {
  // Test pour vérifier si une image est affichée avec une valeur alt
  it("an image is display with alt value", () => {
    // Rendu du composant EventCard avec les props imageSrc, imageAlt, date, title et label
    render(<EventCard imageSrc="http://src-image" imageAlt="image-alt-text" date={new Date("2022-04-01")}
      title="test event"
      label="test label"
    />);
    // Recherche de l'élément image par son test ID
    const imageElement = screen.getByTestId("card-image-testid");
    // Vérification que l'élément image est présent dans le document et que sa valeur alt est "image-alt-text"
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.alt).toEqual("image-alt-text");
  });
  // Test pour vérifier si un titre, un label et un mois sont affichés
  it("a title, a label and a month are displayed", () => {
    // Rendu du composant EventCard avec les mêmes props que le test précédent
    render(
      <EventCard
        imageSrc="http://src-image"
        imageAlt="image-alt-text"
        title="test event"
        label="test label"
        date={new Date("2022-04-01")}
      />
    );
    // Recherche des éléments titre, mois et label par leur texte
    const titleElement = screen.getByText(/test event/);
    const monthElement = screen.getByText(/avril/);
    const labelElement = screen.getByText(/test label/);
    // Vérification que ces éléments sont présents dans le document
    expect(titleElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(monthElement).toBeInTheDocument();
  });


  // Début du bloc de tests pour le cas où la prop small est définie
  describe("with small props", () => {
    // Test pour vérifier si un modificateur small est ajouté
    it("a modifier small is added", () => {
      // Rendu du composant EventCard avec la prop small en plus des autres props
      render(
        <EventCard
          imageSrc="http://src-image"
          imageAlt="image-alt-text"
          title="test event"
          label="test label"
          date={new Date("2022-04-01")}
          small
        />
      );
      // Recherche de l'élément carte par son test ID
      const cardElement = screen.getByTestId("card-testid");
      // Vérification que la classe "EventCard--small" est présente dans la liste des classes de l'élément carte
      expect(cardElement.className.includes("EventCard--small")).toEqual(true);
    });
  });
});
