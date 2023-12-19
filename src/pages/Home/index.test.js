import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import EventList from "../../containers/Events";
import EventCard from "../../components/EventCard";
import PeopleCard from "../../components/PeopleCard";
import Menu from "../../containers/Menu";
import Slider from "../../containers/Slider";
import ServiceCard from "../../components/ServiceCard";
import Form from "../../containers/Form";


describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a Menu is displayed", () => {
    render(<Menu />);
  })
  it("a Slider is displayed", () => {
    render(<Slider />);
  })
  it("a list of services is displayed", () => {
    render(<ServiceCard imageSrc="/images/priscilla-du-preez-Q7wGvnbuwj0-unsplash1.png">
    <h3>test title</h3>
    test text
  </ServiceCard>);
  })
  it("a list of events is displayed", () => {
    render(<EventList />);
  })
  it("a list a people is displayed", () => {
    render(
      <PeopleCard
        imageSrc="http://src-image"
        imageAlt="image-alt-text"
        name="test name"
        position="test position"
      />
    );
  })
  it("a form is displayed", () => {
    render(<Form />);
  })
  it("an event card, with the last event, is displayed", () => {
    render(<EventCard imageSrc="http://src-image" imageAlt="image-alt-text" date={new Date("2022-04-01")} 
    title="test event"
    
    label="test label"
    />);
  })
});
