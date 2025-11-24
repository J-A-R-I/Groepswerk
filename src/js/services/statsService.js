const EXCHANGE_API_BASE = "https://api.exchangerate.host/latest";
/**
 * Haal wisselkoers op van EUR naar currencyCode.
 * @param {string} currencyCode bijv. "USD"
 * @returns {Promise<number|null>} wisselkoers of null bij fout
 */
export async function fetchRateToEuro(currencyCode) {
// TODO:
// - bouw URL op met ?base=EUR&symbols=CURRENCY
// - gebruik fetch + async/await
// - haal de juiste rate uit data.rates[currencyCode]
// - geef null terug bij fout
    const res = await fetch(`https://open.er-api.com/v6/latest/EUR`);
    if (!res.ok) throw new Error("fetchRateToEuro() is nog niet correct geïmplementeerd");

    const data = await res.json();
    return data.rates[currencyCode];
}
/**
 * Bereken statistieken op basis van gefilterde landen en favorieten.
 * @param {Array} countries huidige gefilterde landen
 * @param {Array} favorites lijst van favorieten
 */
export function calculateStats(countries, favorites) {
// TODO:
// - totalCountries
// - averagePopulation
// - favoritesPopulation
    const totalCountries = countries.length;
    let averagePopulation = 0, favoritesPopulation = 0;

    if(countries.length === 0) {
        averagePopulation = 0;
    }
    else{
        for(let i = 0; i < countries.length; i++) {
            averagePopulation += Number(countries[i].population);
        }
        averagePopulation /= countries.length;
    }

    for(let i = 0; i < favorites.length; i++) {
        favoritesPopulation += Number(favorites[i].population);
    }

    return {
        totalCountries: totalCountries,
        averagePopulation: averagePopulation,
        favoritesPopulation: favoritesPopulation,
    };
}