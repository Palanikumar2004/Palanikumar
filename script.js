let apiKey = 'b7370c5778b5d2106f2f9f3b';
let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");

// List of supported currencies (you can add more if needed)
const currencies = ['USD', 'INR', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'NZD', 'CNY'];

// Populate the dropdowns with the available currencies
currencies.forEach((currency) => {
  const option1 = document.createElement("option");
  option1.value = currency;
  option1.text = currency;
  fromDropDown.add(option1);

  const option2 = document.createElement("option");
  option2.value = currency;
  option2.text = currency;
  toDropDown.add(option2);
});

// Set default values
fromDropDown.value = "USD";
toDropDown.value = "INR";

// Function to perform currency conversion
let convertCurrency = () => {
  const amount = document.querySelector("#amount").value;
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  if (amount.length != 0) {
    // Fetch the exchange rate data
    fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        let fromExchangeRate = data.conversion_rates[fromCurrency];
        let toExchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
        document.querySelector("#result").innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
      })
      .catch((error) => {
        document.querySelector("#result").innerHTML = "Error: Unable to retrieve exchange rates.";
        console.error("Error fetching the API: ", error);
      });
  } else {
    alert("Please fill in the amount");
  }
};

// Event listener for the convert button
document.querySelector("#convert-button").addEventListener("click", convertCurrency);

// Trigger conversion on page load
window.addEventListener("load", convertCurrency);
