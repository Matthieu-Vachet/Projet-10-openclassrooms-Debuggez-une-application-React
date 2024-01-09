import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import EventList from "../../containers/Events";
import EventCard from "../../components/EventCard";
import PeopleCard from "../../components/PeopleCard";
import Menu from "../../containers/Menu";
import Slider from "../../containers/Slider";
import ServiceCard from "../../components/ServiceCard";
import Form from "../../containers/Form";


// Début du bloc de tests pour le formulaire
describe("When Form is created", () => {
  // Test pour vérifier si une liste de champs est affichée
  it("a list of fields card is displayed", async () => {
    // Rendu du composant Home
    render(<Home />);
    // Vérification que le texte "Email" est présent dans le document
    // Cette opération est asynchrone car elle attend que le texte apparaisse
    await screen.findByText("Email");
    // Vérification que le texte "Nom" est présent dans le document
    await screen.findByText("Nom");
    // Vérification que le texte "Prénom" est présent dans le document
    await screen.findByText("Prénom");
    // Vérification que le texte "Personel / Entreprise" est présent dans le document
    await screen.findByText("Personel / Entreprise");
  });


  // Début du bloc de tests pour le cas où un clic est déclenché sur le bouton de soumission
  describe("and a click is triggered on the submit button", () => {
    // Test pour vérifier si le message de succès est affiché
    it("the success message is displayed", async () => {
      // Rendu du composant Home
      render(<Home />);
      // Déclenchement d'un événement de clic sur le bouton "Envoyer"
      // Cette opération est asynchrone car elle attend que le bouton soit présent dans le document
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      // Vérification que le texte "En cours" est présent dans le document
      // Cette opération est asynchrone car elle attend que le texte apparaisse
      await screen.findByText("En cours");
      // Vérification que le texte "Message envoyé !" est présent dans le document
      // Cette opération est asynchrone car elle attend que le texte apparaisse
      await screen.findByText("Message envoyé !");
    });
  });
});



// Début du bloc de tests pour la création d'une page
describe("When a page is created", () => {
  // Test pour vérifier si un Menu est affiché
  it("a Menu is displayed", () => {
    // Rendu du composant Menu
    render(<Menu />);
  })
  // Test pour vérifier si un Slider est affiché
  it("a Slider is displayed", () => {
    // Rendu du composant Slider
    render(<Slider />);
  })
  // Test pour vérifier si une liste de services est affichée
  it("a list of services is displayed", () => {
    // Rendu du composant ServiceCard avec des props et des enfants
    render(<ServiceCard imageSrc="/images/priscilla-du-preez-Q7wGvnbuwj0-unsplash1.png">
      <h3>test title</h3>
      test text
    </ServiceCard>);
  })
  // Test pour vérifier si une liste d'événements est affichée
  it("a list of events is displayed", () => {
    // Rendu du composant EventList
    render(<EventList />);
  })
  // Test pour vérifier si une liste de personnes est affichée
  it("a list a people is displayed", () => {
    // Rendu du composant PeopleCard avec des props
    render(
      <PeopleCard
        imageSrc="http://src-image"
        imageAlt="image-alt-text"
        name="test name"
        position="test position"
      />
    );
  })
  // Test pour vérifier si un formulaire est affiché
  it("a form is displayed", () => {
    // Rendu du composant Form
    render(<Form />);
  })
  // Test pour vérifier si une carte d'événement, avec le dernier événement, est affichée
  it("an event card, with the last event, is displayed", () => {
    // Rendu du composant EventCard avec des props
    render(<EventCard imageSrc="http://src-image" imageAlt="image-alt-text" date={new Date("2022-04-01")}
      title="test event"

      label="test label"
    />);
  })
});
