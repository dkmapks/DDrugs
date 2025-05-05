let cash = 1000;
let btc = 0.0;
let wealth = cash;
let inventory = [];
let properties = [];
let cars = [];
let policeEnabled = true;
let godModeEnabled = false;

function updateStatus() {
  document.getElementById('cash').innerText = cash.toFixed(2);
  document.getElementById('btc').innerText = btc.toFixed(2);
  wealth = cash + btc * 50000; // Przykładowy przelicznik BTC
  document.getElementById('wealth').innerText = wealth.toFixed(2);
}

function buyDrugs() {
  // Implementacja zakupu narkotyków
  cash -= 100;
  inventory.push('narkotyki');
  updateStatus();
}

function sellDrugs() {
  // Implementacja sprzedaży narkotyków
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
    btc += amount / 50000; // Przykładowy kurs BTC
    updateStatus();
  }
}

function buyProperty() {
  // Implementacja zakupu nieruchomości
  if (cash >= 5000) {
    cash -= 5000;
    properties.push('dom');
    updateStatus();
  }
}

function buyCar() {
  // Implementacja zakupu samochodu
  if (cash >= 3000) {
    cash -= 3000;
    cars.push('samochód');
    updateStatus();
  }
}

function viewInventory() {
  alert("Ekwipunek:\n" + inventory.join(", ") + "\nNieruchomości: " + properties.join(", ") + "\nSamochody: " + cars.join(", "));
}

function saveGame() {
  let gameState = {
    cash: cash,
    btc: btc,
    inventory: inventory,
    properties: properties,
    cars: cars
  };
  localStorage.setItem('druglordSave', JSON.stringify(gameState));
  alert("Gra zapisana!");
}

function loadGame() {
  let gameState = JSON.parse(localStorage.getItem('druglordSave'));
  if (gameState) {
    cash = gameState.cash;
    btc = gameState.btc;
    inventory = gameState.inventory;
    properties = gameState.properties;
    cars = gameState.cars;
    updateStatus();
    alert("Gra wczytana!");
  } else {
    alert("Brak zapisu gry.");
  }
}

function checkModCode() {
  let code = document.getElementById('mod-code').value;
  if (code === '7432') {
    document.getElementById('mod-menu').style.display = 'block';
  } else {
    alert("Nieprawidłowy kod.");
  }
}

// Funkcje Mod Menu
function addMoney() {
  cash += 10000;
  updateStatus();
}

function disablePolice() {
  policeEnabled = false;
  alert("Policja wyłączona.");
}

function maxDrugPrices() {
  // Implementacja maksymalnych cen narkotyków
  alert("Ceny narkotyków ustawione na maksymalne.");
}

function resetGame() {
  cash = 1000;
  btc = 0.0;
  inventory = [];
  properties = [];
  cars = [];
  updateStatus();
  alert("Gra zresetowana.");
}

function addBTC() {
  btc += 1.0;
  updateStatus();
}

function godMode() {
  godModeEnabled = true;
  alert("Tryb nieśmiertelny aktywowany.");
}

function teleport() {
  // Implementacja przeniesienia do innego miasta
  alert("Przeniesiono do innego miasta.");
}

function unlockProperties() {
  // Implementacja odblokowania nieruchomości
  alert("Wszystkie nieruchomości odblokowane.");
}

function debugEvents() {
  // Implementacja wydarzeń debugowych
  alert("Wydarzenia debugowe aktywowane.");
}

function showGodUI() {
  // Implementacja God Mode UI
  alert("God Mode UI aktywowane.");
}

updateStatus();
