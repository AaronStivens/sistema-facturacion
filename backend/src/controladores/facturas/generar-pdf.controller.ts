
import { Request, Response } from "express";
import { generarFacturaPDF } from "../../servicios/facturas/generar-pdf.service";

type FormatoPDF = "carta" | "tirilla";

export async function generarFacturaPDFControlador(
  req: Request<{ idFactura: string }, {}, {}, { formato?: FormatoPDF }>,
  res: Response,
): Promise<void> {
  try {

    const idFactura = Number(req.params.idFactura);
    const formato = req.query.formato ?? "carta";
    
    if (!Number.isInteger(idFactura) || idFactura <= 0) {
      res.status(400).json({
        mensaje: "El ID de la factura no es válido",
      });
      return;
    }
    
    if (!["carta", "tirilla"].includes(formato)) {
      res.status(400).json({
        mensaje: "El formato del PDF no es válido",
      });
      return;
    }

   const pdf = await generarFacturaPDF(idFactura, formato);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `inline; filename="factura-${idFactura}.pdf"`
      );
      res.setHeader("Content-Length", pdf.length);

      res.status(200).end(Buffer.from(pdf));

  } catch (error) {
    console.error("Error al generar PDF de factura:", error);

    res.status(500).json({
      mensaje: "Error interno al generar el PDF de la factura",
    });
  }
}
