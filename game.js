let wallet = 1000;
let tokens = 100;
let level = 1;
let drugs = {
    "Kokaina": { amount: 0, price: 120 },
    "LSD": { amount: 0, price: 60 },
    "Ekstaza": { amount: 0, price: 50 },
    "Amfetamina": { amount: 0, price: 40 },
    "Heroina": { amount: 0, price: 100 },
    "Grzyby": { amount: 0, price: 30 },
    "Ketamina": { amount: 0, price: 80 },
    "Crack": { amount: 0, price: 90 },
    "GHB": { amount: 0, price: 55 },
    "Opium": { amount: 0, price: 70 }
};

let protections = {
    vpn: false,
    encryption: false,
    courier: false
};

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    updateUI();
}

function updateUI() {
    document.getElementById('wallet_balance').textContent = wallet.toFixed(2);
    document.getElementById('tokens').textContent = tokens;
    document.getElementById('level').textContent = level;

    let warehouseHTML = '';
    for (let drug in drugs) {
        warehouseHTML += `<p>${drug}: ${drugs[drug].amount}g (${drugs[drug].price}$/g)</p>`;
    }
    document.getElementById('warehouse_list').innerHTML = warehouseHTML;

    let suppliersHTML = '';
    for (let drug in drugs) {
        let cost = Math.floor(drugs[drug].price * 0.6);
        suppliersHTML += `<p>${drug}: ${cost}$/g 
            <button onclick="buyDrug('${drug}', ${cost})">Kup 10g</button></p>`;
    }
    document.getElementById('suppliers_list').innerHTML = suppliersHTML;
}

function buyDrug(name, price) {
    if (wallet >= price * 10) {
        wallet -= price * 10;
        drugs[name].amount += 10;
        saveGame();
        updateUI();
    }
}

function simulateClientBuy() {
    let names = Object.keys(drugs);
    let rand = names[Math.floor(Math.random() * names.length)];
    if (drugs[rand].amount >= 5) {
        let sellPrice = drugs[rand].price + Math.floor(Math.random() * 20);
        wallet += sellPrice * 5 - (protections.courier ? 5 : 10);
        drugs[rand].amount -= 5;
        tokens += 1;
        if (tokens % 100 === 0) level++;
        checkPoliceRisk();
        saveGame();
        updateUI();
        alert(`Klient kupił 5g ${rand} za ${sellPrice * 5}$`);
    } else {
        alert("Za mało towaru!");
    }
}

function checkPoliceRisk() {
    if (Math.random() < 0.05 && !protections.vpn) {
        alert("Nalot policyjny! Straciłeś cały towar!");
        for (let drug in drugs) drugs[drug].amount = 0;
    }
}

function enterModMenu() {
    let code = prompt("Podaj kod dostępu:");
    if (code === "7432") showSection("modmenu");
    else alert("Zły kod.");
}

// MOD MENU FUNCTIONS
function modAddCash() {
    wallet += 1000;
    saveGame();
    updateUI();
}

function modAddTokens() {
    tokens += 100;
    saveGame();
    updateUI();
}

function modAddAllDrugs() {
    for (let drug in drugs) drugs[drug].amount += 100;
    saveGame();
    updateUI();
}

function modMaxLevel() {
    level = 3;
    saveGame();
    updateUI();
}

function modProtection() {
    protections.vpn = true;
    protections.encryption = true;
    protections.courier = true;
    alert("Dodano pełną ochronę!");
    saveGame();
}

// SAVE & LOAD
function saveGame() {
    const state = { wallet, tokens, level, drugs, protections };
    localStorage.setItem("DDrugsSave", JSON.stringify(state));
}

function loadGame() {
    const data = JSON.parse(localStorage.getItem("DDrugsSave"));
    if (data) {
        wallet = data.wallet;
        tokens = data.tokens;
        level = data.level;
        drugs = data.drugs;
        protections = data.protections;
    }
}

window.onload = () => {
    loadGame();
    updateUI();
};
