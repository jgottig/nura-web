/* ==========================================================
   NURA — Datos del sitio
   Todo lo editable (contacto, recetas, tabla nutricional)
   vive en este archivo.
   ========================================================== */

const NURA_CONFIG = {
  // TODO: reemplazar por el número real (formato internacional, sin + ni espacios)
  whatsapp: "5493410000000",
  instagram: "https://www.instagram.com/nura.mascotas/",
  zona: "Rosario",
};

const NURA_PRODUCTOS = [
  {
    id: "vacuna",
    nombre: "Carne Vacuna",
    corto: "Vacuna",
    base: "Avena + Vegetales",
    peso: "400 grs",
    color: "#ad3a4d",
    colorSuave: "#f3dfe2",
    bolsa: "assets/img/bolsa-vacuna.webp",
    bajada: "Roast beef cocido al vapor con avena y zanahoria. La receta con más fibra de la línea, con energía para todo el día.",
    descripcion:
      "Nuestra receta de carne vacuna combina roast beef de calidad humana con avena y zanahoria, cocidos al vapor para conservar sus nutrientes. La avena aporta fibra y energía de liberación lenta, y el núcleo vitamínico-mineral con probióticos completa el equilibrio para una digestión sana.",
    ingredientes: [
      { nombre: "Roast beef", detalle: "Proteína de calidad humana" },
      { nombre: "Avena", detalle: "Fibra y energía sostenida" },
      { nombre: "Zanahoria", detalle: "Vitaminas y antioxidantes" },
      { nombre: "Aceite de girasol", detalle: "Ácidos grasos esenciales" },
      { nombre: "Núcleo vitamínico-mineral", detalle: "Con probióticos" },
    ],
    nutricion: {
      humedad: "59,63 %",
      materiaSeca: "37,97 %",
      energia: "165,86 kcal",
      proteina: "11,34 g",
      grasa: "5,99 g",
      hidratos: "16,70 g",
      fibra: "3,59 g",
    },
    fotos: ["assets/img/vacuna-mano.webp", "assets/img/momento-vacuna.webp", "assets/img/placa-1a.webp"],
  },
  {
    id: "pollo",
    nombre: "Pollo",
    corto: "Pollo",
    base: "Quinoa + Vegetales",
    peso: "400 grs",
    color: "#d9962f",
    colorSuave: "#fbecd2",
    bolsa: "assets/img/bolsa-pollo.webp",
    bajada: "Pechuga de pollo con quinoa y zapallo anco. Suave, liviana y la receta con más proteína de la línea.",
    descripcion:
      "Pechuga de pollo fresca, quinoa y zapallo anco, cocidos al vapor. Es nuestra receta con más proteína (13,17 g cada 100 g): liviana, suave y fácil de digerir. Enriquecida con núcleo vitamínico-mineral y probióticos.",
    ingredientes: [
      { nombre: "Pechuga de pollo", detalle: "Proteína magra de calidad humana" },
      { nombre: "Quinoa", detalle: "Aminoácidos y minerales" },
      { nombre: "Zapallo anco", detalle: "Fibra suave y betacaroteno" },
      { nombre: "Aceite de girasol", detalle: "Ácidos grasos esenciales" },
      { nombre: "Núcleo vitamínico-mineral", detalle: "Con probióticos" },
    ],
    nutricion: {
      humedad: "59,23 %",
      materiaSeca: "38,27 %",
      energia: "164,78 kcal",
      proteina: "13,17 g",
      grasa: "6,20 g",
      hidratos: "16,20 g",
      fibra: "2,46 g",
    },
    fotos: ["assets/img/pollo-mano.webp", "assets/img/galgo-pollo.webp", "assets/img/placa-2a.webp"],
  },
  {
    id: "cerdo",
    nombre: "Cerdo",
    corto: "Cerdo",
    base: "Arroz + Vegetales",
    peso: "400 grs",
    color: "#e0788f",
    colorSuave: "#fde4ea",
    bolsa: "assets/img/bolsa-cerdo.webp",
    bajada: "Carne de cerdo con arroz, boniato y manzana. Una receta sabrosa y distinta para variar el menú de todos los días.",
    descripcion:
      "Carne de cerdo con arroz, boniato y un toque de manzana, cocidos al vapor. Una receta sabrosa, ideal para rotar proteínas y sumar variedad a su alimentación. Como todas nuestras recetas, lleva núcleo vitamínico-mineral y probióticos.",
    ingredientes: [
      { nombre: "Carne de cerdo", detalle: "Proteína de calidad humana" },
      { nombre: "Arroz", detalle: "Energía de fácil digestión" },
      { nombre: "Boniato", detalle: "Fibra y vitaminas" },
      { nombre: "Manzana", detalle: "Antioxidantes naturales" },
      { nombre: "Grasa de cerdo", detalle: "Energía y palatabilidad" },
      { nombre: "Núcleo vitamínico-mineral", detalle: "Con probióticos" },
    ],
    nutricion: {
      humedad: "60,24 %",
      materiaSeca: "37,26 %",
      energia: "169,25 kcal",
      proteina: "12,73 g",
      grasa: "5,21 g",
      hidratos: "18,28 g",
      fibra: "1,56 g",
    },
    fotos: ["assets/img/trio-bolsas.webp", "assets/img/plato.webp", "assets/img/placa-3a.webp"],
  },
];

// Guía de porciones (perro adulto, actividad normal) — fuente: "Nura - Tabla Porcion.pdf"
const NURA_PORCIONES = [
  { tamano: "Pequeño", rango: "1 – 5 kg", gramos: "65 – 220 g/día" },
  { tamano: "Mediano", rango: "5 – 10 kg", gramos: "220 – 375 g/día" },
  { tamano: "Grande", rango: "10 – 25 kg", gramos: "375 – 740 g/día" },
  { tamano: "Muy grande", rango: "25 – 40 kg", gramos: "740 – 1055 g/día" },
];

// Puntos [kg, g/día] para interpolar en la calculadora
const NURA_CURVA = [
  [1, 65], [5, 220], [10, 375], [25, 740], [40, 1055],
];

const NURA_CONSERVACION = [
  { icono: "frio", texto: "Mantener refrigerado" },
  { icono: "vacio", texto: "Envasado al vacío" },
  { icono: "temp", texto: "Servir a temperatura ambiente" },
  { icono: "olla", texto: "No necesita cocción" },
  { icono: "cal", texto: "Una vez descongelado, conservar en la heladera hasta 72 hs" },
  { icono: "reloj", texto: "Consumir antes de los 10 meses desde su elaboración" },
];

// Carrusel de Instagram: imágenes en assets/img/ig/ (piezas del feed + fotos de redes)
const NURA_INSTAGRAM = Array.from({ length: 15 }, (_, i) => `assets/img/ig/ig-${String(i + 1).padStart(2, "0")}.webp`);

function nuraWhatsapp(mensaje) {
  return `https://wa.me/${NURA_CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
