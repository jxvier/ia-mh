// Tarjetas de "Explorá la sección" en el Inicio.
// Los números (01, 02, …) se calculan solos según el orden de la lista.
// PARA RESTAURAR una tarjeta desactivada, quitale el comentario (//).
const tarjetas = [
  { label: "Manifiesto", desc: "Nuestra postura frente a la IA.", color: "#0B0B0B", href: "/manifiesto/" },
  { label: "Cuadernos GuÍA", desc: "Bitácoras de exploración y experimentos.", color: "#F1591F", href: "/cuadernos/" },
  // DESACTIVADA PARA EL LANZAMIENTO:
  // { label: "Biblioteca", desc: "Papers, herramientas y recursos.", color: "#16A75C", href: "/biblioteca/" },
  { label: "Antecedentes", desc: "Artículos, casos y noticias.", color: "#5A2AE6", href: "/antecedentes/" },
  // DESACTIVADA PARA EL LANZAMIENTO:
  // { label: "Multimedia", desc: "Videos y material audiovisual.", color: "#FFC629", href: "/multimedia/" },
  // DESACTIVADA PARA EL LANZAMIENTO:
  // { label: "Equipo", desc: "Quiénes somos.", color: "#16A75C", href: "/equipo/" },
];

export default tarjetas.map((t, i) => ({ ...t, cat: String(i + 1).padStart(2, "0") }));
