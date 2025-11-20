import { clearElement, createElement } from "../utils/dom.js";
/**
 * Render de lijst van landen in #country_list.
 *
 * @param {Object} config
 * @param {Array} config.countries
 * @param {Array} config.favorites
 * @param {Function} config.onCountryClick (country) => void
 * @param {Function} config.onFavoriteToggle (country) => void
 */
export function renderCountryList({ countries, favorites, onCountryClick, onFavoriteToggle }) {
    const container = document.querySelector("#country_list");
    if (!container) return;
    clearElement(container);
    if (!countries || countries.length === 0) {
        const empty = createElement(
            "div",
            "col-12 alert alert-light border text-center mb-0",
            "Geen landen gevonden voor deze filter."
        );

        container.appendChild(empty);
        return
    }

    container.innerHTML = countries.map(country => {
        return `
            <div class="col">
                
                <div class="card h-100 shadow-sm border-0 pb-4 ps-2 pe-2">
                <img class="img-fluid" src=${country.flags.png} alt="">
                    <div class="card-body d-flex flex-column justify-content-end">
                       <h2>${country.name.common}</h2>
                    <p>Populatie: ${country.population}</p>
                    <p>Regio: ${country.region}</p>
                    <div class="d-flex justify-content-between">
                        <button type="button" class="btn_modal btn btn-primary w-a">Info</button>
                        <button type="button" class="btn_modal btn btn-warning w-a">Favoriet</button>
                        </div>
                    </div>
                </div>  
            </div>
`;
    })
        .join("");




// TODO:
// - vlag, naam, regio, populatie tonen
// - knop "Details" die onCountryClick(country) oproept
// - knop/icon voor favoriet (onFavoriteToggle(country))
// - check of dit land in favorites zit (kleur/icoon aanpassen)

}