
import {IsArray,IsNumber,IsString,ValidateNested,IsObject} from "class-validator";

import { JSONSchema } from "class-validator-jsonschema";
import { Type } from "class-transformer";

class ProductoFacturaDTO {
  @JSONSchema({ description: "ID del producto", example: 1 })
  @IsNumber()
  id_producto!: number;

  @JSONSchema({ description: "Nombre del producto", example: "Laptop" })
  @IsString()
  nombre_producto!: string;

  @JSONSchema({ description: "Cantidad", example: 2 })
  @IsNumber()
  cantidad!: number;

  @JSONSchema({ description: "Precio unitario", example: 1500 })
  @IsNumber()
  precio_unitario!: number;

  @JSONSchema({ description: "Costo unitario", example: 1200 })
  @IsNumber()
  costo_unitario!: number;

}

class ClienteFacturaDTO {
  @JSONSchema({ description: "ID del cliente", example: 21545 })
  @IsNumber()
  id_cliente!: number;

  @JSONSchema({ description: "Nombre del cliente", example: "Juan Pérez" })
  @IsString()
  nombre!: string;

  @JSONSchema({ description: "Identificación del cliente", example: "0801199912345" })
  @IsString()
  identificacion!: string;

  @JSONSchema({ description: "Teléfono del cliente", example: "98765432" })
  @IsString()
  telefono!: string;
}

export class CrearFacturaDTO {  

  @JSONSchema({
    description: "ID del usuario",
    example: 21545,
  })
  @IsNumber()
  id_usuario!: number;

  @JSONSchema({
    description: "Método de pago",
    example: "Efectivo",
  })
  @IsString()
  metodo_pago!: string;

  @JSONSchema({
    description: "Impuesto aplicado",
    example: 0.15,
  })
  @IsNumber()
  Impuesto!:number

  @JSONSchema({
    description: "Descuento aplicado en porcentaje",
    example: 5,
  })
  @IsNumber()
  Descuento!:number

  @JSONSchema({
    description: "Id de cliente",
    example: 5,
  })
  @IsNumber()
  id_cliente!:number

  @JSONSchema({
    description: "Lista de productos de la factura",
    example: [
      {
        id_producto: 1,
        nombre_producto: "Laptop",
        cantidad: 2,
        precio_unitario: 1500,
        costo_unitario: 1200,        
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoFacturaDTO)
  productos!: ProductoFacturaDTO[];
}
