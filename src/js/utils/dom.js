/**
 * Maakt een element met optionele class(es) en text.
 */
export function createElement(tag, className = "", text = "") {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
}
/**
 * Verwijdert alle child nodes uit een element.
 */
export function clearElement(el) {
    if (!el) return;
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}
7. src/js/services/countriesService.js
/**
 * onderstaand url kan niet meer up to date zijn
 controleer zelf de api
 */
const COUNTRIES_API_URL = "https://restcountries.com/v3.1/all";
/**
 * Haalt alle landen op via de REST Countries API.
 * @returns {Promise<Array>} array van landen
 */
export async function fetchAllCountries() {
// TODO:
// - gebruik fetch om COUNTRIES_API_URL op te halen
// - controleer res.ok
// - parse JSON en geef de array terug
// - gooi een fout bij problemen
    throw new Error("fetchAllCountries() is nog niet geïmplementeerd");
}