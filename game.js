let cash = 1000;
let btc = 0.0;
let wealth = cash;
let inventory = [];
let properties = [];
let cars = [];
let policeEnabled = true;
let godModeEnabled = false;
let btcRate = 50000;

function updateStatus() {
  document.getElementById('cash').innerText = cash.toFixed(2);
  document.getElementById('btc').innerText = btc.toFixed(2);
  wealth = cash + btc * btcRate;
  document.getElementById('wealth').innerText = wealth.toFixed(2);
}

function buyDrugs() {
  cash -= 100;
  inventory.push('narkotyki');
  updateStatus();
}

function sellDrugs() {
  if (inventory.includes('narkotyki')) {
    cash += 150;
    inventory.splice(inventory.indexOf('narkotyki'), 1);
    updateStatus();
  }
}

function openCryptoWallet() {
  let amount = prompt("Ile chcesz wpłacić do portfela BTC?");
  amount = parseFloat(amount);
  if (amount > 0 && amount <= cash) {
    cash -= amount;
    btc += amount / btcRate;
    updateStatus();
  }
}

function buyProperty() {
  if (cash >= 5000) {
    cash -= 5000;
    properties.push('dom');
    updateStatus();
  }
}

function buyCar() {
  if (cash >= 3000) {
    cash -= 3000;
    cars.push('samochód');
    updateStatus();
  }
}

function viewInventory() {
  alert("
::contentReference[oaicite:95]{index=95}
 
