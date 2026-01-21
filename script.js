const STORE_NAME = "Nexacore";
const ADMIN_FEE = 1000;
const WA_NUMBER = "085136498889"; // GANTI NOMOR WA

const gameIcons = {
  "Mobile Legends": "img/mobile_legends.png",
  "Free Fire": "img/free_fire.png",
  "PUBG Mobile": "img/pubg_mobile.png"
};

const nominalData = {
  "Mobile Legends": [
    "12 Diamonds - 3230",
    "19 Diamonds - 5223",
    "28 Diamonds - 7600",
    "44 Diamonds - 11400",
    "59 Diamonds - 15200",
    "85 Diamonds - 32000",
    "170 Diamonds - 43700",
    "240 Diamonds - 61750",
    "296 Diamonds - 76000",
    "408 Diamonds - 115500",
    "568 Diamonds - 157500",
    "875 Diamonds - 328300",
    "2010 Diamonds - 525000",
    "4830 Diamonds - 1260000"
  ],
  "Free Fire": [
    "12 Diamonds - 2000",
    "50 Diamonds - 8000",
    "70 Diamonds - 10000",
    "140 Diamonds - 20000",
    "355 Diamonds - 50000",
    "720 Diamonds - 100000",
    "1450 Diamonds - 200000",
    "2180 Diamonds - 300000",
    "3640 Diamonds - 500000"
  ],
  "PUBG Mobile": [
    "60 UC - 15000"
  ]
};

// =======================
let selectedGame = "", selectedNominal = "", selectedPayment = "QRIS";

const userId = document.getElementById("userId");
const server = document.getElementById("server");
const gameList = document.getElementById("gameList");

// RENDER GAME LIST
Object.keys(gameIcons).forEach(g => {
  const d = document.createElement("div");
  d.className = "card";
  d.innerHTML = `<img src="${gameIcons[g]}" width="64"><br>${g}`;
  d.onclick = () => selectGame(g, d);
  gameList.appendChild(d);
});

function selectGame(game, el) {
  selectedGame = game;
  document.querySelectorAll("#gameList .card").forEach(c => c.classList.remove("active"));
  el.classList.add("active");
  renderNominal();
}

function renderNominal() {
  const n = document.getElementById("nominalList");
  n.innerHTML = "";
  nominalData[selectedGame].forEach(v => {
    const d = document.createElement("div");
    d.className = "card";
    d.innerText = v;
    d.onclick = () => {
      selectedNominal = v;
      document.querySelectorAll("#nominalList .card").forEach(c => c.classList.remove("active"));
      d.classList.add("active");
      document.getElementById("priceText").innerText = "Rp " + v.replace(/[^0-9]/g, "");
    };
    n.appendChild(d);
  });
}

// PAYMENT SELECTION
document.querySelectorAll("#payments div").forEach(p => {
  p.onclick = () => {
    selectedPayment = p.innerText;
    document.querySelectorAll("#payments div").forEach(x => x.classList.remove("active"));
    p.classList.add("active");
  };
});

function checkout() {
  if (!selectedGame || !selectedNominal || !userId.value) {
    alert("Lengkapi data");
    return;
  }
  if (selectedPayment === "QRIS") {
    document.getElementById("qrisPopup").style.display = "flex";
    return;
  }
  kirimWA();
}

function lanjutWA() {
  document.getElementById("qrisPopup").style.display = "none";
  kirimWA();
}

function kirimWA() {
  const price = parseInt(selectedNominal.replace(/[^0-9]/g, ""));
  const total = price + ADMIN_FEE;

  const text = `Halo Admin ${STORE_NAME}
Game: ${selectedGame}
Paket: ${selectedNominal}
Biaya Admin: Rp ${ADMIN_FEE}
Total: Rp ${total}
User ID: ${userId.value}
Server: ${server.value || "-"}
Pembayaran: ${selectedPayment}`;

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
}
