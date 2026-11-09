import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

import { JSONSchema } from "class-validator-jsonschema";

export class CrearCategoriaDTO {
  @JSONSchema({
    description: "Nombre de la categoría",
    example: "Computadoras",
  })
  @IsString()
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @MaxLength(100, {
    message: "El nombre no puede superar los 100 caracteres",
  })
  nombre!: string;

  @JSONSchema({
    description: "Descripción de la categoría",
    example: "Laptops y computadoras de escritorio",
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, {
    message: "La descripción no puede superar los 255 caracteres",
  })
  descripcion?: string;
}
