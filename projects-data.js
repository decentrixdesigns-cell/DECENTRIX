/* EDIT ALL PROJECT CONTENT HERE.
   These nine projects are fictional placeholders, not client work.
   Replace image values with paths such as "images/project-1.webp".
   Keep IDs unique. Description paragraphs are rendered as plain text. */
function placeholderImage(label, color = "#dce8db") {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100"><rect width="1600" height="1100" fill="${color}"/><circle cx="1240" cy="200" r="450" fill="#191919" opacity=".06"/><path d="M180 850V250h220l270 360V250h220v600H670L400 490v360z" fill="#191919" opacity=".12"/><text x="100" y="990" font-family="Arial,sans-serif" font-size="44" fill="#191919">${label}</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
const projects = [
  ["1", "Project One", "Brand identity", "#dce8db"],
  ["2", "Project Two", "Packaging design", "#eee0ce"],
  ["3", "Project Three", "Visual identity", "#ddd9eb"],
  ["4", "Project Four", "Social media graphics", "#e7e9d0"],
  ["5", "Project Five", "Print design", "#e5d8d2"],
  ["6", "Project Six", "Logo design", "#d1e3e6"],
  ["7", "Project Seven", "Brand identity", "#dcdcdc"],
  ["8", "Project Eight", "Campaign design", "#eee4b9"],
  ["9", "Project Nine", "Visual identity", "#d3dfd2"]
].map(([id, name, category, color]) => ({
  id, name, category, client: "[Client name]", year: "2026",
  mainImage: placeholderImage("PLACEHOLDER / " + name, color),
  mainAlt: "Placeholder artwork for " + name,
  galleryImages: [
    { src: placeholderImage("PLACEHOLDER / Detail 01", color), alt: name + " — replace with first project detail" },
    { src: placeholderImage("PLACEHOLDER / Detail 02", color), alt: name + " — replace with second project detail" }
  ],
  description: {
    problem: "[Explain the client’s challenge, audience and project goals.]",
    process: "[Describe your research, concepts and key design decisions.]",
    result: "[Explain the finished design and verified outcomes. Add only real results.]"
  }
}));
