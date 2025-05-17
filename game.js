let game = {
  cash: 1000,
  btc: 0.000,
  storageLimit: 50,
  inventory: {},
};

function updateStats() {
  document.getElementById("cash").innerText = game.cash.toFixed(2);
  document.getElementById("btc").innerText = game.btc.toFixed(3);
  const used = Object.values(game.inventory).reduce((a, b) => a + b, 0);
  document.getElementById("storageUsed").innerText = used;
  document.getElementById("storageLimit").innerText = game.storageLimit;
  updateInventory();
}

function updateInventory() {
  const inv = document.getElementById("inventory");
  inv.innerHTML = "";
  for (let drug in game.inventory) {
    inv.innerHTML += `<p>${drug}: ${game.inventory[drug]}g</p>`;
  }
}

function manualBuy() {
  const name = document.getElementById("buyDrug").value;
  const amount = parseFloat(document.getElementById("buyAmount").value);
  const price = parseFloat(document.getElementById("buyPrice").value);
  const cost = amount * price;

  if (cost <= game.cash && (getStorageUsed() + amount <= game.storageLimit)) {
    game.cash -= cost;
    game.inventory[name] = (game.inventory[name] || 0) + amount;
    updateStats();
  } else {
    alert("Za mało kasy lub miejsca!");
  }
}

function manualSell() {
  const name = document.getElementById("sellDrug").value;
  const amount = parseFloat(document.getElementById("sellAmount").value);
  const price = parseFloat(document.getElementById("sellPrice").value);
  const profit = amount * price;

  if ((game.inventory[name] || 0) >= amount) {
    game.inventory[name] -= amount;
    game.cash += profit;
    if (game.inventory[name] <= 0) delete game.inventory[name];
    updateStats();
  } else {
    alert("Nie masz tyle towaru!");
  }
}

function getStorageUsed() {
  return Object.values(game.inventory).reduce((a, b) => a + b, 0);
}

// DFF – losowy zakup/sprzedaż
function generateDFFOffer() {
  const buy = +(Math.random() * 12 + 3).toFixed(2); // 3–15 zł
  const sell = +(Math.random() * 20 + 5).toFixed(2); // 5–25 zł
  const offers = document.getElementById("supplierOffers");
  offers.innerHTML = `<p>DFF – Kup za ${buy} zł/g <button onclick="buyDFF(${buy})">Kup 1g</button></p>`;
  const clients = document.getElementById("clients");
  clients.innerHTML = `<p>DFF – Sprzedaj za ${sell} zł/g <button onclick="sellDFF(${sell})">Sprzedaj 1g</button></p>`;
}

function buyDFF(price) {
  if (game.cash >= price && getStorageUsed() + 1 <= game.storageLimit) {
    game.cash -= price;
    game.inventory["DFF"] = (game.inventory["DFF"] || 0) + 1;
    updateStats();
  } else {
    alert("Za mało kasy lub miejsca!");
  }
}

function sellDFF(price) {
  if ((game.inventory["DFF"] || 0) >= 1) {
    game.inventory["DFF"] -= 1;
    game.cash += price;
    if (game.inventory["DFF"] <= 0) delete game.inventory["DFF"];
    updateStats();
  } else {
    alert("Nie masz DFF!");
  }
}

function saveGame() {
  localStorage.setItem("ddrugs_save", JSON.stringify(game));
  alert("Gra zapisana!");
}

function loadGame() {
  const data = localStorage.getItem("ddrugs_save");
  if (data) {
    game = JSON.parse(data);
    updateStats();
    alert("Gra wczytana!");
  } else {
    alert("Brak zapisu gry.");
  }
}

setInterval(() => {
  generateDFFOffer();
}, 10000); // Odświeżanie ofert DFF co 10s

updateStats();
generateDFFOffer();

// Można tu dodać kod dla btc, pracowników, podróży itd.
