import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

import { JSONSchema } from "class-validator-jsonschema";

export class CrearClienteDTO {
  @JSONSchema({
    description: "Nombre del cliente",
    example: "Juan Pérez",
  })
  @IsString()
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  nombre!: string;

  @JSONSchema({
    description: "Identificación del cliente",
    example: "123456789",
  })
  @IsString()
  @IsNotEmpty({ message: "La identificación es obligatoria" })
  identificacion!: string;

  @JSONSchema({
    description: "Telefono del cliente",
    example: "123456789",
  })
  @IsString()
  @IsNotEmpty({ message: "El teléfono es obligatorio" })
  telefono!: string;

  @JSONSchema({
    description: "Correo del cliente",
    example: "K6o6e@example.com",
  })
  @IsString()
  @IsOptional()
  correo?: string;

  @JSONSchema({
    description: "Dirección del cliente",
    example: "Calle 123, Ciudad",
  })
  @IsString()
  @IsOptional()
  direccion?: string;
}
