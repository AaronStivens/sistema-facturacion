
import fs from "fs/promises";
import path from "path";
import Handlebars from "handlebars";

interface OpcionesPDF {
  formato?: "letter" | "a4" | "legal";
  ancho?: string;
  alto?: string;
  horizontal?: boolean;
  margenes?: {
    superior?: string;
    inferior?: string;
    izquierdo?: string;
    derecho?: string;
  };
}

export async function generarPDF<T extends object>(
  rutaPlantilla: string,
  datos: T,
  opciones: OpcionesPDF = {}
): Promise<Uint8Array>{

  const { default: puppeteer } = await import("puppeteer");

  // Obtener plantilla
  const ruta = path.join(
    process.cwd(),
    "src",
    "plantillas",
    rutaPlantilla
  );

  const html = await fs.readFile(ruta, "utf-8");

  // Procesar plantilla con Handlebars
  const plantilla = Handlebars.compile(html);
  const contenidoHTML = plantilla(datos);

  const navegador = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const pagina = await navegador.newPage();

    await pagina.setContent(contenidoHTML, {
      waitUntil: "load",
    });

    await pagina.emulateMediaType("print");

    const pdf = await pagina.pdf({
      format: opciones.formato,
      width: opciones.ancho,
      height: opciones.alto,
      landscape: opciones.horizontal ?? false,

      printBackground: true,
      preferCSSPageSize: true,

      margin: {
        top: opciones.margenes?.superior ?? "10mm",
        bottom: opciones.margenes?.inferior ?? "10mm",
        left: opciones.margenes?.izquierdo ?? "10mm",
        right: opciones.margenes?.derecho ?? "10mm",
      },
    });

    return pdf;

  } finally {
    await navegador.close();
  }
}
