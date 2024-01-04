import { render, screen } from "@testing-library/react";
import md5 from "md5";
import Icon from ".";


// Début du bloc de tests pour le composant Icon
describe("Icon component", () => {
    // Début du bloc de tests pour le cas où une icône est créée avec le nom "twitch"
    describe("When a icon is created with name twitch", () => {
        // Test pour vérifier si l'icône contient cette valeur de hachage de chemin
        it("the icon contain this path hash value 327fbc38c8e878259c3ec35ef231517a", () => {
            // Rendu du composant Icon avec la prop name
            render(<Icon name="twitch" />)
            // Vérification que le hachage MD5 de l'attribut 'd' de l'icône est égal à la valeur attendue
            expect(md5(screen.getByTestId("icon").getAttribute('d'))).toEqual('327fbc38c8e878259c3ec35ef231517a')
        });
    });


    // Début du bloc de tests pour le cas où une icône est créée avec le nom "facebook"
    describe("When a icon is created with name facebook", () => {
        // Test pour vérifier si l'icône contient cette valeur de hachage de chemin
        it("the icon contain this path hash value bbea4c9e40773b969fdb6e406059f853", () => {
            // Ce test est à compléter
        });
    });
})

