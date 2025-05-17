let cash = 1000;
let btcBalance = 0;
let storageUsed = 0;
let storageLimit = 50;
let inventory = {};

const drugs = [
  { name: "DFF", buyMin: 3, buyMax: 15, sellMin: 5, sellMax: 25 }
];

function updateUI() {
  document.getElementById("cash").textContent = cash.toFixed(2);
  document.getElementById("btc").textContent = btcBalance.toFixed(3);
  document.getElementById("storageUsed").textContent = storageUsed;
  document.getElementById("storageLimit").textContent = storageLimit;

  const invDiv = document.getElementById("inventory");
  invDiv.innerHTML = "";
  for (let drug in inventory) {
    invDiv.innerHTML += `<p>${drug}: ${inventory[drug]}</p>`;
  }

  const offersDiv = document.getElementById("supplierOffers");
  offersDiv.innerHTML = "";
  drugs.forEach(drug => {
    let price = (Math.random() * (drug.buyMax - drug.buyMin) + drug.buyMin).toFixed(2);
    offersDiv.innerHTML += `<p>${drug.name}: ${price} zł/g <button onclick="buyDrug('${drug.name}', ${price})">Kup 1g</button></p>`;
  });
}

function buyDrug(name, price) {
  if (cash >= price && storageUsed < storageLimit) {
    cash -= price;
    inventory[name] = (inventory[name] || 0) + 1;
    storageUsed += 1;
    updateUI();
  }
}

function manualBuy() {
  const name = document.getElementById("buyDrug").value;
  const amount = parseInt(document.getElementById("buyAmount").value);
  const price = parseFloat(document.getElementById("buyPrice").value);
  if (!name || isNaN(amount) || isNaN(price)) return;

  const totalCost = price * amount;
  if (cash >= totalCost && storageUsed + amount <= storageLimit) {
    cash -= totalCost;
    inventory[name] = (inventory[name] || 0) + amount;
    storageUsed += amount;
    updateUI();
  }
}

function manualSell() {
  const name = document.getElementById("sellDrug").value;
  const amount = parseInt(document.getElementById("sellAmount").value);
  const price = parseFloat(document.getElementById("sellPrice").value);
  if (!name || isNaN(amount) || isNaN(price)) return;

  if (inventory[name] >= amount) {
    cash += amount * price;
    inventory[name] -= amount;
    storageUsed -= amount;
    if (inventory[name] <= 0) delete inventory[name];
    updateUI();
  }
}

const btc = {
  deposit() {
    const amount = parseFloat(document.getElementById("btcAmount").value);
    if (!isNaN(amount) && cash >= amount) {
      cash -= amount;
      btcBalance += amount / 100000; // np. 1 BTC = 100000 zł
      updateUI();
    }
  },
  withdraw() {
    const amount = parseFloat(document.getElementById("btcAmount").value);
    if (!isNaN(amount) && btcBalance >= amount / 100000) {
      btcBalance -= amount / 100000;
      cash += amount;
      updateUI();
    }
  }
};

function saveGame() {
  const saveData = {
    cash, btcBalance, inventory, storageUsed
  };
  localStorage.setItem("ddrugs2Save", JSON.stringify(saveData));
  alert("Gra zapisana!");
}

function loadGame() {
  const data = JSON.parse(localStorage.getItem("ddrugs2Save"));
  if (data) {
    cash = data.cash;
    btcBalance = data.btcBalance;
    inventory = data.inventory;
    storageUsed = data.storageUsed;
    updateUI();
    alert("Gra wczytana!");
  } else {
    alert("Brak zapisu gry.");
  }
}

updateUI();
