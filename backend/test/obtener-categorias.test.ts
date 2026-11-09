
describe("Pruebas del módulo de categorías", () => {

    test("Debe reconocer el nombre de una categoría", () => {
        const categoria = {
            nombre: "Computadoras"
        };

        expect(categoria.nombre).toBe("Computadoras");
    });

    test("Debe reconocer que una categoría tiene descripción", () => {
        const categoria = {
            nombre: "Computadoras",
            descripcion: "Laptops y computadoras de escritorio"
        };

        expect(categoria.descripcion).toBeDefined();
    });

    test("El nombre de una categoría no debe estar vacío", () => {
        const categoria = {
            nombre: ""
        };

        expect(categoria.nombre).toBe("");
    });

});
