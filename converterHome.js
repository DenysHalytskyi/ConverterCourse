document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/api/exchange-rates');
      const rates = await response.json();
  
      if (rates) {
        const fromCurrency = document.getElementById('from-currency');
        const toCurrency = document.getElementById('to-currency');
        const fromAmount = document.getElementById('from-amount');
        const toAmount = document.getElementById('to-amount');
  
        function convertCurrency() {
          const fromRate = rates[fromCurrency.value];
          const toRate = rates[toCurrency.value];
          const amount = parseFloat(fromAmount.value);
          
          if (!isNaN(amount) && fromRate && toRate) {
            const convertedAmount = (amount * fromRate) / toRate;
            toAmount.value = convertedAmount.toFixed(2);
          }
        }
  
        fromCurrency.addEventListener('change', convertCurrency);
        toCurrency.addEventListener('change', convertCurrency);
        fromAmount.addEventListener('input', convertCurrency);
      } else {
        console.error('Failed to get exchange rates');
      }
    } catch (error) {
      console.error('An error occurred when receiving exchange rates:', error);
    }
  });
  