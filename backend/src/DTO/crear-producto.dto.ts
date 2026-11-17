import { IsNumber, IsString } from "class-validator";
import { JSONSchema } from "class-validator-jsonschema";

export class CrearProductoDTO {
  @JSONSchema({
    description: "Código del producto",
    example: "P-1",
  })
  @IsString()
  codigo!: string;

  @JSONSchema({
    description: "ID de la categoría",
    example: 1,
  })
  @IsString()
  id_categoria!: number;

  @JSONSchema({
    description: "Nombre del producto",
    example: "Producto 1",
  })
  @IsString()
  nombre!: string;

  @JSONSchema({
    description: "Descripción del producto",
    example: "Descripción del producto 1",
  })
  @IsString()
  descripcion!: string;

  @JSONSchema({
    description: "Precio del producto",
    example: 10.99,
  })
  @IsNumber()
  precio!: number;

  @JSONSchema({
    description: "Costo del producto",
    example: 5.49,
  })
  @IsNumber()
  costo!: number;

  @JSONSchema({
    description: "Existencia del producto",
    example: 100,
  })
  @IsNumber()
  existencia!: number;
}
