import L from "leaflet";
import "leaflet/dist/leaflet.css";
let map;
let marker;
/**
 * Initialiseert de Leaflet-kaart in #country_map.
 */
export function initMap() {
    const mapContainer = document.querySelector("#country_map");
    if (!mapContainer) return;
// TODO:
// - maak een Leaflet map
// - stel een globale view in (bijv. wereldkaart)
// - voeg OSM-tiles toe
// Voorbeeld (mag aangepast worden door studenten):
// map = L.map(mapContainer).setView([20, 0], 2);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: ... }).addTo(map);
    if(map){
        map.remove();
    }
    map = L.map(mapContainer);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}
/**
 * Zoomt in op een bepaald land en toont een marker met naam.
 * @param {number} lat
 * @param {number} lng
 * @param {string} name
 */
export function focusCountry(lat, lng, name) {
    if (!map) return;
    if (typeof lat !== "number" || typeof lng !== "number") {
        console.warn("Ongeldige coördinaten voor focusCountry");
        return;
    }
// TODO:
// - map.setView([lat, lng], zoomLevel);
// - bestaande marker verwijderen (indien aanwezig)
// - nieuwe marker maken met popup-tekst (name)
    map.setView([lat, lng], 5)

    L.marker([lat, lng]).addTo(map)
        .bindPopup(name)
        .openPopup();

    setTimeout(() => map.invalidateSize(), 500);
}