const currencies = {
  USD: 'United States Dollar',
  AUD: 'Australian Dollar',
  BGN: 'Bulgarian Lev',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  CZK: 'Czech Republic Koruna',
  DKK: 'Danish Krone',
  GBP: 'British Pound Sterling',
  HKD: 'Hong Kong Dollar',
  HRK: 'Croatian Kuna',
  HUF: 'Hungarian Forint',
  IDR: 'Indonesian Rupiah',
  ILS: 'Israeli New Sheqel',
  INR: 'Indian Rupee',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  MXN: 'Mexican Peso',
  MYR: 'Malaysian Ringgit',
  NOK: 'Norwegian Krone',
  NZD: 'New Zealand Dollar',
  PHP: 'Philippine Peso',
  PLN: 'Polish Zloty',
  RON: 'Romanian Leu',
  RUB: 'Russian Ruble',
  SEK: 'Swedish Krona',
  SGD: 'Singapore Dollar',
  THB: 'Thai Baht',
  TRY: 'Turkish Lira',
  ZAR: 'South African Rand',
  EUR: 'Euro',
};
const fromOptions = document.querySelector('[name="from_currency"]');

const toOptions = document.querySelector('[name="to_currency"]');
const endpoint = 'https://api.exchangeratesapi.io/latest';
const catcheRates = {};
const form = document.querySelector('form');
const fromInput = document.querySelector('[name="from_amount"]');
const resultBox = document.querySelector('.to_amount');

async function getRates(base = 'USD') {
  const res = await fetch(`${endpoint}?base=${base}`);
  const data = await res.json();
  return data;
}
async function handleInput(e) {
  const fromVal = fromInput.value;
  const fromCurrecy = fromOptions.value;
  const toCurrency = toOptions.value;

  convertCurrency(fromVal, fromCurrecy, toCurrency);
}

async function convertCurrency(amount, baseCurrency, DesiredCurrency) {
  if (!catcheRates[baseCurrency]) {
    const { rates } = await getRates(baseCurrency);
    catcheRates[baseCurrency] = rates;
  }
  const multiplyBy = Number(catcheRates[baseCurrency][DesiredCurrency]);
  const result = amount * multiplyBy;
  const formatedResult = formatCurrency(result, DesiredCurrency);

  displayResult(formatedResult);
}
function formatCurrency(amount, currency) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

function displayResult(string) {
  resultBox.innerText = string;
}

function createOptions() {
  const arrayCurrency = Object.entries(currencies);
  arrayCurrency.forEach(([cCode, cName]) => {
    const html = document.createElement('option');
    const html2 = document.createElement('option');
    html.value = cCode;
    html2.value = cCode;
    html.textContent = cName;
    html2.textContent = cName;
    fromOptions.appendChild(html);
    toOptions.appendChild(html2);
  });
}
//on page load create the options for the user
createOptions();
//listen for input event
form.addEventListener('input', handleInput);
