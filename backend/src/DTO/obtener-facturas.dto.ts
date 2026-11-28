import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { JSONSchema } from "class-validator-jsonschema";

export class ObtenerFacturasDTO {
  @JSONSchema({
    description: "Fecha inicio",
    example: new Date(),
  })
  @IsString()
  fechainicio?: Date;

  @JSONSchema({
    description: "Fecha final",
    example: new Date(),
  })
  @IsString()
  fechafinal?: Date;

  @JSONSchema({
    description: "ID de la factura",
    example: "1",
  })
  @IsNumber()
  idFactura?: number;
}
