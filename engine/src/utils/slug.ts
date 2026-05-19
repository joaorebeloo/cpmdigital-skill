export function slugFromUrl(input: string): string {
  try {
    const url = new URL(input);
    return url.hostname
      .replace(/^www\./, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase();
  } catch {
    return input
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "reference";
  }
}
