import * as bootstrap from "bootstrap";
import { clearElement, createElement } from "../utils/dom.js";
import {focusCountry, initMap} from "../services/mapService.js";
import { fetchRateToEuro } from "../services/statsService.js";
let modalInstance = null;
let currentCountry = null;
let onFavoriteToggleCallback = null;
/**
 * Initialiseert de modal (één keer aanroepen in main.js)
 */
export function initCountryModal(onFavoriteToggle) {
    const modalElement = document.querySelector("#country_modal");
    if (!modalElement) return;
    modalInstance = new bootstrap.Modal(modalElement);
    onFavoriteToggleCallback = onFavoriteToggle;
    const favBtn = document.querySelector("#favorite_toggle_btn");
    if (favBtn) {
        favBtn.addEventListener("click", () => {
            if (currentCountry && typeof onFavoriteToggleCallback === "function") {
                onFavoriteToggleCallback(currentCountry);
            }
        });
    }
}

/**
 * Toon de modal voor een bepaald land.
 * @param {Object} country
 * @param {boolean} isFavorite
 */

export async function showCountryDetail(country, isFavorite) {
    if (!modalInstance || !country) return;
    currentCountry = country;
    const title = document.querySelector("#country_modal_label");
    const flagImg = document.querySelector("#country_flag");
    const detailsDl = document.querySelector("#country_details");
    const alertBox = document.querySelector("#country_modal_alert");
    const currencyInfo = document.querySelector("#currency_info");
    const favBtn = document.querySelector("#favorite_toggle_btn");
// TODO:
    title.textContent = country.name.common;
    flagImg.src = country.flags.png;
    flagImg.alt = `vlag van ${country.name.common}`;


    clearElement(detailsDl);

    const addDetail = (label,value) => {
        detailsDl.appendChild(createElement("dl", "col-sm-4", label));
        detailsDl.appendChild(createElement("dd", "col-sm-8", value));
    };

    addDetail("Hoofdstad", country.capital ? country.capital.join(",") : "N/A")
    addDetail("Regio", country.region)
    addDetail("Populatie", country.population.toString())

    const languages = country.languages ? Object.values(country.languages).join(" / ") : "N/A"
    addDetail("Talen", languages)


    const currencies = country.currencies
    ? Object.values(country.currencies)
            .map((c) => `${c.name} (${c.symbol})`)
            .join("") : "N/A"
    addDetail("Valuta", currencies)

    if(country.latlng){
        if(alertBox) alertBox.classList.add("d-none");
        focusCountry(country.latlng[0], country.latlng[1], country.name.common)
    } else{
        if(alertBox){
            alertBox.textContent = "Geen locatiegegevens beschikbaar"
            alertBox.classList.remove("d-none")
        }
    }
    clearElement(currencyInfo);

    if(country.currencies){
        const currencyCode = Object.keys(country.currencies)[0]
        if(currencyCode) {
            currencyInfo.textContent = "Koers Laden..."
            try {
                const rate = await fetchRateToEuro(currencyCode)
                if (rate) {
                    currencyInfo.textContent = `1 EUR = ${rate} ${currencyCode}`
                } else {
                    currencyInfo.textContent = `Koers voor ${currencyCode} niet beschikbaar`
                }
            } catch (e){
                currencyInfo.textContent = "Fout bij laden van de koers"
            }
        }
    }

    if(favBtn){
        if(isFavorite){
            favBtn.innerHTML = "verwijder uit favorieten"
            favBtn.classList.remove = "btn-outline-warning"
            favBtn.classList.add = "btn-warning"
        }else {
            favBtn.innerHTML = "toeveogen aan favorieten"
            favBtn.classList.remove = "btn-outline-warning"
            favBtn.classList.add = "btn-warning"
        }
    }
// TODO: alertBox verbergen of tonen afhankelijk van geodata (lat/lng)
// - lat/lng zoeken in country.latlng
// - als aanwezig: focusCountry(lat, lng, name)
// - anders: nette melding tonen en map eventueel "disable"-stijl geven
// TODO: wisselkoers-info ophalen
// - eerste currency-code bepalen uit country.currencies
// - fetchRateToEuro(code) aanroepen
// - resultaat tonen in currencyInfo
// - foutmeldingen netjes afhandelen
// TODO: tekst/appearance van favBtn aanpassen op basis van isFavorite
    modalInstance.show();
}