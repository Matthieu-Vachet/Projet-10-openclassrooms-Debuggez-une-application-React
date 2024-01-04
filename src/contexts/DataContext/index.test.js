import { render, screen } from "@testing-library/react";
import { DataProvider, api, useData } from "./index";


// Début du bloc de tests pour la création d'un contexte de données
describe("When a data context is created", () => {
  // Test pour vérifier si un appel est exécuté sur le fichier events.json
  it("a call is executed on the events.json file", async () => {
    // Simulation de la fonction loadData de l'API pour qu'elle retourne un objet avec result: "ok"
    api.loadData = jest.fn().mockReturnValue({ result: "ok" });
    // Création d'un composant qui utilise le hook useData pour récupérer les données
    // et les affiche dans une div
    const Component = () => {
      const { data } = useData();
      return <div>{data?.result}</div>;
    };
    // Rendu du composant dans le contexte du DataProvider
    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );
    // Recherche du texte "ok" dans le document
    // Cette opération est asynchrone car elle attend que le texte apparaisse
    const dataDisplayed = await screen.findByText("ok");
    // Vérification que le texte "ok" est présent dans le document
    expect(dataDisplayed).toBeInTheDocument();
  });


  // Début du bloc de tests pour le cas où l'appel aux événements échoue
  describe("and the events call failed", () => {
    // Test pour vérifier si l'erreur est dispatchée
    it("the error is dispatched", async () => {
      // Simulation de la fonction console.error pour éviter les erreurs dans la console lors du test
      window.console.error = jest.fn();
      // Simulation de la fonction loadData de l'API pour qu'elle rejette avec une erreur
      api.loadData = jest.fn().mockRejectedValue("error on calling events");

      // Création d'un composant qui utilise le hook useData pour récupérer l'erreur
      // et l'affiche dans une div
      const Component = () => {
        const { error } = useData();
        return <div>{error}</div>;
      };
      // Rendu du composant dans le contexte du DataProvider
      render(
        <DataProvider>
          <Component />
        </DataProvider>
      );
      // Recherche du texte de l'erreur dans le document
      // Cette opération est asynchrone car elle attend que le texte apparaisse
      const dataDisplayed = await screen.findByText("error on calling events");
      // Vérification que le texte de l'erreur est présent dans le document
      expect(dataDisplayed).toBeInTheDocument();
    });
  });
  // Test pour vérifier le comportement de la fonction loadData de l'API
  it("api.loadData", () => {
    // Simulation de la fonction console.error pour éviter les erreurs dans la console lors du test
    window.console.error = jest.fn();
    // Simulation de la fonction fetch globale pour qu'elle résolve avec un objet contenant des taux de change
    global.fetch = jest.fn().mockResolvedValue(() =>
      Promise.resolve({
        json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
      })
    );
    // Création d'un composant qui utilise le hook useData pour récupérer l'erreur
    // et l'affiche dans une div
    const Component = () => {
      const { error } = useData();
      return <div>{error}</div>;
    };
    // Rendu du composant dans le contexte du DataProvider
    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );
  });
});
