
import conexion from "../base-datos/conexion";
import { obtenerCategoria } from "../src/servicios/categoria/obtener-categoria.service";

jest.mock("../base-datos/conexion", () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockConexion = conexion as unknown as jest.Mock;

describe("Pruebas del servicio obtenerCategoria", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe obtener todas las categorías", async () => {
    const categorias = [
      { id_categoria: 1, nombre: "Computadoras" },
      { id_categoria: 2, nombre: "Accesorios" }
    ];

    const consulta = {
      select: jest.fn().mockResolvedValue(categorias)
    };

    mockConexion.mockReturnValue(consulta);

    const resultado = await obtenerCategoria();

    expect(mockConexion).toHaveBeenCalledWith("categorias");
    expect(consulta.select).toHaveBeenCalledWith("*");
    expect(resultado).toEqual(categorias);
  });

  test("Debe obtener una categoría por su ID", async () => {
    const categoria = {
      id_categoria: 1,
      nombre: "Computadoras"
    };

    const consulta = {
      where: jest.fn().mockReturnThis(),
      first: jest.fn().mockResolvedValue(categoria)
    };

    mockConexion.mockReturnValue(consulta);

    const resultado = await obtenerCategoria(1);

    expect(consulta.where).toHaveBeenCalledWith("id_categoria", 1);
    expect(consulta.first).toHaveBeenCalled();
    expect(resultado).toEqual(categoria);
  });

  test("Debe devolver null cuando la categoría no existe", async () => {
    const consulta = {
      where: jest.fn().mockReturnThis(),
      first: jest.fn().mockResolvedValue(undefined)
    };

    mockConexion.mockReturnValue(consulta);

    const resultado = await obtenerCategoria(999);

    expect(resultado).toBeNull();
  });

});
