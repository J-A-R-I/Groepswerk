import { clearElement, createElement } from "../utils/dom.js";
import { calculateStats } from "../services/statsService"
/**
 * Render statistieken in #stats_panel.
 * @param {Object} stats
 * @param {number} stats.totalCountries
 * @param {number} stats.averagePopulation
 * @param {number} stats.favoritesPopulation
 */

export function renderStats(stats) {
    const panel = document.querySelector("#stats_panel");
    if (!panel) return;
    clearElement(panel);
    const { totalCountries, averagePopulation, favoritesPopulation, maxCountries } = stats;

    const cardsRow = createElement("div", "row gy-3 mb-3");
    const card1 = createStatCard("Aantal landen", totalCountries.toString());
    const card2 = createStatCard(
        "Gemiddelde populatie",
        averagePopulation.toLocaleString("nl-BE")
    );
    const card3 = createStatCard(
        "Totale populatie favorieten",
        favoritesPopulation.toLocaleString("nl-BE")
    );

    cardsRow.appendChild(card1);
    cardsRow.appendChild(card2);
    cardsRow.appendChild(card3);
    panel.appendChild(cardsRow);


    const barRow = createElement("div", "row gy-3");

    const safeMaxCountries = maxCountries || 250;
    const bar1 = createBar("Aantal landen", (totalCountries / safeMaxCountries) * 100, "bg-primary-subtle border-top border-primary");

    const maxPop = Math.max(averagePopulation, favoritesPopulation);
    const safeMaxPop = maxPop > 0 ? maxPop : 1;

    const bar2 = createBar("Gem. populatie", (averagePopulation / safeMaxPop) * 100, "bg-success-subtle border-top border-success");
    const bar3 = createBar("Populatie favorieten", (favoritesPopulation / safeMaxPop) * 100, "bg-warning-subtle border-top border-warning");

    barRow.appendChild(bar1);
    barRow.appendChild(bar2);
    barRow.appendChild(bar3);

    panel.appendChild(barRow);
}

function createStatCard(label, valueText) {
    const col = createElement("div", "col-md-4");
    const card = createElement("div", "border rounded p-3 h-100");
    const labelEl = createElement("div", "small text-muted mb-1", label);
    const valueEl = createElement("div", "h5 mb-0", valueText);
    card.appendChild(labelEl);
    card.appendChild(valueEl);
    col.appendChild(card);
    return col;
}

function createBar(label, percentage, colorClass) {
    const col = createElement("div", "col-md-4");


    const container = createElement("div", "border rounded d-flex flex-column justify-content-end overflow-hidden mb-2");
    container.style.height = "150px"; // Fixed height for the square look


    const bar = createElement("div", `w-100 ${colorClass}`);
    bar.style.height = `${percentage}%`;

    container.appendChild(bar);


    const labelEl = createElement("div", "text-center small text-muted", label);

    col.appendChild(container);
    col.appendChild(labelEl);

    return col;
}
