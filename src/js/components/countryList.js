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
        const isFav = favorites.some(f => f.cca3 === country.cca3);
        return `
            <div class="col">
                <div class="card h-100 shadow-sm border-0 pb-4 ps-2 pe-2">
                    <img class="img-fluid" src="${country.flags.png}" alt="Vlag van ${country.name.common}">
                    <div class="card-body d-flex flex-column justify-content-end">
                        <h2>${country.name.common}</h2>
                        <p>Populatie: ${country.population.toLocaleString()}</p>
                        <p>Regio: ${country.region}</p>
                        <div class="d-flex justify-content-between">
                            <button type="button" class="btn btn-primary w-a btn-detail" data-cca3="${country.cca3}">Info</button>
                            <button type="button" class="btn ${isFav ? 'btn-warning' : 'btn-outline-warning'} w-a btn-fav" data-cca3="${country.cca3}">
                                ${isFav ? '★ Favoriet' : '☆ Favoriet'}
                            </button>
                        </div>
                    </div>
                </div>  
            </div>
        `;
    }).join("");


    container.querySelectorAll(".btn-detail").forEach(btn => {
        btn.addEventListener("click", () => {
            const cca3 = btn.dataset.cca3;
            const country = countries.find(c => c.cca3 === cca3);
            if (country && onCountryClick) onCountryClick(country);
        });
    });

    container.querySelectorAll(".btn-fav").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const cca3 = btn.dataset.cca3;
            const country = countries.find(c => c.cca3 === cca3);
            if (country && onFavoriteToggle) onFavoriteToggle(country);
        });
    });



// TODO:
// - vlag, naam, regio, populatie tonen
// - knop "Details" die onCountryClick(country) oproept
// - knop/icon voor favoriet (onFavoriteToggle(country))
// - check of dit land in favorites zit (kleur/icoon aanpassen)

}