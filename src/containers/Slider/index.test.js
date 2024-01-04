import { render, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

// Début du bloc de tests pour la création du Slider
describe("When slider is created", () => {
  // Test pour vérifier si une liste d'images est affichée
  it("a list picture is displayed", async () => {
    // Mock de la fonction console.error pour éviter les erreurs non désirées lors du test
    window.console.error = jest.fn();
    // Mock de la fonction loadData de l'API pour retourner une valeur prédéfinie
    api.loadData = jest.fn().mockReturnValue(data);
    // Rendu du composant Slider à l'intérieur du composant DataProvider
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    // Recherche des textes "World economic forum", "janvier" et "Oeuvre à la coopération entre le secteur public et le privé." dans le document
    // Ces opérations sont asynchrones car elles attendent que les textes apparaissent
    await screen.findByText("World economic forum");
    await screen.findByText("janvier");
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
  });
});