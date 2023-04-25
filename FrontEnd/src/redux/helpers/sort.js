export function sort(value, recipes) {
  if (value === "HelathScore-Upward") {
    const result = recipes.sort((a, b) => b.HealthScore - a.HealthScore);
    return result;
  }
  if (value === "HelathScore-Descendant") {
    const result = recipes.sort((a, b) => a.HealthScore - b.HealthScore);
    return result;
  }
  if (value === "Ascendente") {
    const result = recipes.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
    return result;
  }
  if (value === "Descendente") {
    const result = recipes.sort((a, b) => b.Nombre.localeCompare(a.Nombre));
    return result;
  }
}
