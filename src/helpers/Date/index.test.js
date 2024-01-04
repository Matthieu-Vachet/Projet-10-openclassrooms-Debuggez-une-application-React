import { getMonth } from "./index";


// Début du bloc de tests pour l'helper de date
describe("Date helper", () => {
    // Sous-bloc de tests pour la fonction getMonth
    describe("When getMonth is called", () => {
        // Test pour vérifier si la fonction retourne "janvier" pour la date "2022-01-01"
        it("the function return janvier for 2022-01-01 as date", () => {
            // Création d'une nouvelle date pour le 1er janvier 2022
            const date = new Date("2022-01-01");
            // Appel de la fonction getMonth avec la date créée
            const result = getMonth(date);
            // Vérification que le résultat est égal à "janvier"
            expect(result).toBe("janvier");
        });
        // Test pour vérifier si la fonction retourne "juillet" pour la date "2022-07-08"
        it("the function return juillet for 2022-07-08 as date", () => {
            // Création d'une nouvelle date pour le 8 juillet 2022
            const date = new Date("2022-07-08");
            // Appel de la fonction getMonth avec la date créée
            const result = getMonth(date);
            // Vérification que le résultat est égal à "juillet"
            expect(result).toBe("juillet");
        });
    });
})

