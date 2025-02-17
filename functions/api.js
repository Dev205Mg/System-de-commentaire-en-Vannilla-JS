/**
 * Interagir avec une API JSON
 * @param {String} url
 * @param {RequestInit & {json: object}} options
 * @returns {JSON}
 */
export async function fetchJSON(url, options = {}) {
  const headers = { Accept: "application/json", ...options.headers };
  if (options.json) {
    options.body = JSON.stringify(options.json);
    headers['Content-Type'] = 'application/json';
  }
  const r = await fetch(url, {...options, headers});
  if (!r.ok) {
    throw new Error("Erreur serveur", { cause: r });
  }
  return r.json();
}
