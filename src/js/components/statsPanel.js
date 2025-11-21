import { clearElement, createElement } from "../utils/dom.js";
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
    const { totalCountries, averagePopulation, favoritesPopulation } = stats;
// Kaarten met cijfers

    panel.innerHTML = `
    <div class="row gy-3 mb-3">test
    <div class="card-body">Aantal landen, ${totalCountries.toString()} </div>
    <div class="card-body">Aantal landen, ${averagePopulation.toString()} </div>
    <div class="card-body">Aantal landen, ${favoritesPopulation.toString()} </div>
    </div>`

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

    // bar chart
    const barRow = createElement("div", "row bar-chart-row");

    const maxValue = Math.max(totalCountries, averagePopulation, favoritesPopulation);

    const bar1 = createBar(totalCountries, maxValue, "bg-primary-subtle border border-primary");
    const bar2 = createBar(averagePopulation, maxValue, "bg-success-subtle border border-success");
    const bar3 = createBar(favoritesPopulation, maxValue, "bg-warning-subtle border border-warning");

    barRow.appendChild(bar1);
    barRow.appendChild(bar2);
    barRow.appendChild(bar3);

    panel.appendChild(barRow);

    // TODO:
    // - bereken relatieve hoogtes (bijv. in procent)
    // - maak voor elk stat een "bar" div
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

function createBar(value, maxValue = 100, colorClass) {
    const barWrapper = createElement("div", "col");
    const bar = createElement("div", `rounded w-100 ${colorClass}`);

    // hoogte in procent
    const percentage = (value / maxValue) * 100;
    bar.style.height = `${percentage}%`;

    barWrapper.appendChild(bar);
    return barWrapper;
}
