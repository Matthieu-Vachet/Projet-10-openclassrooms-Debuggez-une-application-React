import { fireEvent, render, screen } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import Events from "./index";

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },

    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
};


// Début du bloc de tests pour la création du composant Events
describe("When Events is created", () => {
  // Test pour vérifier si une liste de cartes d'événements est affichée
  it("a list of event card is displayed", async () => {
    // Simulation de la fonction loadData de l'API pour qu'elle retourne une certaine donnée
    api.loadData = jest.fn().mockReturnValue(data);
    // Rendu du composant Events dans le contexte du DataProvider
    render(
      <DataProvider>
        <Events />
      </DataProvider>
    );
    // Recherche du texte "forum" dans le document
    // Cette opération est asynchrone car elle attend que le texte apparaisse
    await screen.findByText("forum");
  });


  // Début du bloc de tests pour le cas où une erreur se produit
  describe("and an error occured", () => {
    // Test pour vérifier si un message d'erreur est affiché
    it("an error message is displayed", async () => {
      // Simulation de la fonction loadData de l'API pour qu'elle rejette avec une erreur
      api.loadData = jest.fn().mockRejectedValue();
      // Rendu du composant Events dans le contexte du DataProvider
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );
      // Recherche du texte "An error occured" dans le document
      // Cette opération est asynchrone car elle attend que le texte apparaisse
      // Vérification que le texte "An error occured" est présent dans le document
      expect(await screen.findByText("An error occured")).toBeInTheDocument();
    });
  });


  // Début du bloc de tests pour le cas où nous sélectionnons une catégorie
  describe("and we select a category", () => {
    // Test pour vérifier si une liste filtrée est affichée
    it.only("an filtered list is displayed", async () => {
      // Simulation de la fonction loadData de l'API pour qu'elle retourne une certaine donnée
      api.loadData = jest.fn().mockReturnValue(data);
      // Rendu du composant Events dans le contexte du DataProvider
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );
      // Recherche du texte "Forum #productCON" dans le document
      await screen.findByText("Forum #productCON");
      // Simulation d'un clic sur le bouton de collapse
      fireEvent(
        await screen.findByTestId("collapse-button-testid"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      // Simulation d'un clic sur le premier élément avec le texte "soirée entreprise"
      fireEvent(
        (await screen.findAllByText("soirée entreprise"))[0],
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      // Recherche du texte "Conférence #productCON" dans le document
      await screen.findByText("Conférence #productCON");
      // Vérification que le texte "Forum #productCON" n'est pas présent dans le document
      expect(screen.queryByText("Forum #productCON")).not.toBeInTheDocument();
    });
  });


  // Début du bloc de tests pour le cas où nous cliquons sur un événement
  describe("and we click on an event", () => {
    // Test pour vérifier si le détail de l'événement est affiché
    it("the event detail is displayed", async () => {
      // Simulation de la fonction loadData de l'API pour qu'elle retourne une certaine donnée
      api.loadData = jest.fn().mockReturnValue(data);
      // Rendu du composant Events dans le contexte du DataProvider
      render(
        <DataProvider>
          <Events />
        </DataProvider>
      );
      // Simulation d'un clic sur l'élément avec le texte "Conférence #productCON"
      fireEvent(
        await screen.findByText("Conférence #productCON"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      // Recherche des textes "24-25-26 Février" et "1 site web dédié" dans le document
      // Ces opérations sont asynchrones car elles attendent que les textes apparaissent
      await screen.findByText("24-25-26 Février");
      await screen.findByText("1 site web dédié");
    });
  });
});
