/*async function updateCryptoData(apiUrl, index) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        document.getElementById(`icon${index}`).innerHTML = `<img src="${data.image.small}" alt="${data.name} Icon">`;
        document.getElementById(`name${index}`).textContent = data.name;
        document.getElementById(`price${index}`).textContent = `${data.market_data.current_price.usd} USD`;
        document.getElementById(`24Change${index}`).textContent = `${data.market_data.price_change_percentage_24h.toFixed(2)}%`;
        document.getElementById(`24Volume${index}`).textContent = `${data.market_data.total_volume.usd} USD`;
    } catch (error) {
        console.error(`Error updating crypto data ${index}:`, error.message);
    }
}

const cryptocurrencies = [
    { name: 'Bitcoin', apiUrl: 'https://api.coingecko.com/api/v3/coins/bitcoin' },
    { name: 'Ethereum', apiUrl: 'https://api.coingecko.com/api/v3/coins/ethereum' },
    { name: 'Ripple', apiUrl: 'https://api.coingecko.com/api/v3/coins/ripple' },
    { name: 'Litecoin', apiUrl: 'https://api.coingecko.com/api/v3/coins/litecoin' },
    { name: 'Cardano', apiUrl: 'https://api.coingecko.com/api/v3/coins/cardano' },
    { name: 'Polkadot', apiUrl: 'https://api.coingecko.com/api/v3/coins/polkadot' }
];

cryptocurrencies.forEach((crypto, index) => {
    const refreshInterval = (index + 1) * 6000;
    updateCryptoData(crypto.apiUrl, index + 1);
    setInterval(() => updateCryptoData(crypto.apiUrl, index + 1), refreshInterval);
});
*/
