document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/api/exchange-rates');
      const rates = await response.json();
  
      if (rates) {
        document.getElementById('usd-rate').textContent = `PLN: ${rates.USD}`;
        document.getElementById('eur-rate').textContent = `PLN: ${rates.EUR}`;
        document.getElementById('gbp-rate').textContent = `PLN: ${rates.GBP}`;
        document.getElementById('chf-rate').textContent = `PLN: ${rates.CHF}`;
        document.getElementById('krw-rate').textContent = `PLN: ${rates.KRW}`;
        document.getElementById('inr-rate').textContent = `PLN: ${rates.INR}`;
        document.getElementById('uah-rate').textContent = `PLN: ${rates.UAH}`;
        document.getElementById('cny-rate').textContent = `PLN: ${rates.CNY}`;
        document.getElementById('sek-rate').textContent = `PLN: ${rates.SEK}`;
      } else {
        console.error('Failed to get exchange rates');
      }
    } catch (error) {
      console.error('An error occurred when receiving exchange rates:', error);
    }
  });

  