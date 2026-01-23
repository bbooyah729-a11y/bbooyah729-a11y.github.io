/* ================= CONFIG ================= */
const STORE_NAME = "NEXACORE";
const STORE_PREFIX = "NXC";
const ADMIN_PIN = "1234";
const WA_TARGET = "6285136498889"; // tujuan WA admin

let invoiceHistory = JSON.parse(localStorage.getItem("invoiceHistory")) || [];
let adminUnlocked = false;

/* ================= GAME + NOMINAL ================= */
const gamePrices = {

  "Mobile Legends": [
    {name:"Weekly Diamond Pass",price:28000},
    {name:"Twilight Pass",price:149000},
    {name:"86 Diamonds",price:20000},
    {name:"172 Diamonds",price:39000},
    {name:"257 Diamonds",price:58000},
    {name:"344 Diamonds",price:77000},
    {name:"429 Diamonds",price:96000},
    {name:"514 Diamonds",price:115000},
    {name:"706 Diamonds",price:154000},
    {name:"878 Diamonds",price:190000},
    {name:"1050 Diamonds",price:229000}
  ],

  "Free Fire": [
    {name:"Membership Mingguan",price:30000},
    {name:"Membership Bulanan",price:90000},
    {name:"70 Diamonds",price:10000},
    {name:"140 Diamonds",price:20000},
    {name:"210 Diamonds",price:30000},
    {name:"355 Diamonds",price:50000},
    {name:"720 Diamonds",price:100000},
    {name:"1450 Diamonds",price:200000}
  ],

  "PUBG Mobile": [
    {name:"60 UC",price:15000},
    {name:"120 UC",price:30000},
    {name:"180 UC",price:45000},
    {name:"325 UC",price:72000},
    {name:"660 UC",price:148000},
    {name:"1800 UC",price:395000},
    {name:"Royale Pass",price:180000}
  ],

  "Honor of Kings": [
    {name:"16 Tokens",price:3300},
    {name:"80 Tokens",price:16500},
    {name:"240 Tokens",price:51000},
    {name:"400 Tokens",price:82000},
    {name:"560 Tokens",price:115000},
    {name:"Weekly Card",price:40000},
    {name:"Monthly Card",price:75000}
  ],

  "Roblox": [
    {name:"80 Robux",price:15000},
    {name:"160 Robux",price:30000},
    {name:"240 Robux",price:45000},
    {name:"400 Robux",price:75000},
    {name:"800 Robux",price:145000},
    {name:"1700 Robux",price:295000},
    {name:"Premium Monthly",price:85000}
  ],

  "eFootball": [
    {name:"130 Coins",price:20000},
    {name:"300 Coins",price:45000},
    {name:"550 Coins",price:80000},
    {name:"1040 Coins",price:150000},
    {name:"Match Pass",price:75000}
  ],

  "Genshin Impact": [
    {name:"Blessing Welkin Moon",price:58000},
    {name:"60 Genesis Crystals",price:12000},
    {name:"300+30 Genesis",price:60000},
    {name:"980+110 Genesis",price:174000},
    {name:"1980+260 Genesis",price:355000},
    {name:"3280+600 Genesis",price:579000},
    {name:"Battle Pass",price:150000}
  ]
};

/* ================= INIT ================= */
const gameSelect = document.getElementById("gameSelect");
const nominalSelect = document.getElementById("nominalSelect");
const invoiceBox = document.getElementById("invoiceBox");

Object.keys(gamePrices).forEach(g=>{
  gameSelect.innerHTML += `<option>${g}</option>`;
});
gameSelect.onchange = loadNominal;
loadNominal();

function loadNominal(){
  nominalSelect.innerHTML = "";
  gamePrices[gameSelect.value].forEach(n=>{
    nominalSelect.innerHTML += `
      <option value="${n.price}">
        ${n.name} - Rp ${n.price.toLocaleString("id-ID")}
      </option>`;
  });
}

/* ================= INVOICE ================= */
function buatInvoice(){
  const user = userId.value.trim();
  if(!user) return alert("User ID wajib diisi");

  const game = gameSelect.value;
  const nominalText = nominalSelect.options[nominalSelect.selectedIndex].text;
  const total = Number(nominalSelect.value);

  const d = new Date();
  const tgl = d.toISOString().slice(0,10).replace(/-/g,"");
  const urut = String(invoiceHistory.length+1).padStart(4,"0");
  const invoiceId = `${STORE_PREFIX}-${tgl}-${urut}`;

  const invoice = {
    invoiceId,game,nominalText,user,total,
    status:"UNPAID",
    date:d.toISOString().slice(0,10)
  };

  invoiceHistory.push(invoice);
  localStorage.setItem("invoiceHistory",JSON.stringify(invoiceHistory));

  invoiceBox.innerHTML = `
    <b>${invoiceId}</b><br>
    ${game}<br>
    ${nominalText}<br>
    User: ${user}<br>
    <b>Total: Rp ${total.toLocaleString("id-ID")}</b><br><br>

    <button onclick='buatInvoiceGambar(${JSON.stringify(invoice)})'>
      🧾 Kirim Invoice Gambar
    </button>
  `;
}

/* ================= INVOICE GAMBAR ================= */
function buatInvoiceGambar(invoice){
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 720;
  canvas.height = 900;

  ctx.fillStyle="#020617";
  ctx.fillRect(0,0,720,900);

  ctx.strokeStyle="#22c55e";
  ctx.lineWidth=6;
  ctx.strokeRect(20,20,680,860);

  const logo = new Image();
  logo.src="img/logo.png";

  logo.onload=()=>{
    ctx.drawImage(logo,290,40,140,140);
    ctx.fillStyle="#fff";
    ctx.textAlign="center";
    ctx.font="bold 26px Arial";
    ctx.fillText("INVOICE PEMBAYARAN",360,220);
    ctx.font="16px Arial";
    ctx.fillText(invoice.invoiceId,360,250);

    ctx.textAlign="left";
    ctx.font="18px Arial";
    let y=320;

    const line=(l,v)=>{
      ctx.fillStyle="#94a3b8";
      ctx.fillText(l,80,y);
      ctx.fillStyle="#fff";
      ctx.fillText(v,260,y);
      y+=42;
    };

    line("Toko",STORE_NAME);
    line("Game",invoice.game);
    line("Paket",invoice.nominalText);
    line("User ID",invoice.user);
    line("Status",invoice.status);

    ctx.fillStyle="#22c55e";
    ctx.font="bold 22px Arial";
    ctx.fillText(
      "TOTAL : Rp "+invoice.total.toLocaleString("id-ID"),
      260,y+30
    );

    const img = canvas.toDataURL("image/png");
    kirimInvoiceWA(invoice,img);
  };
}

function kirimInvoiceWA(invoice,img){
  const text=`INVOICE ${invoice.invoiceId}
${invoice.game}
${invoice.nominalText}
User: ${invoice.user}
Total: Rp ${invoice.total.toLocaleString("id-ID")}`;

  window.open(
    `https://wa.me/${WA_TARGET}?text=${encodeURIComponent(text)}`,
    "_blank"
  );

  const a=document.createElement("a");
  a.href=img;
  a.download=invoice.invoiceId+".png";
  a.click();
}

/* ================= DASHBOARD ================= */
function openDashboard(){
  if(!adminUnlocked){
    const pin=prompt("PIN Admin:");
    if(pin!==ADMIN_PIN) return;
    adminUnlocked=true;
  }
  dashboard.classList.remove("hidden");
  renderDashboard(invoiceHistory);
}

function closeDashboard(){
  dashboard.classList.add("hidden");
}

function applyFilter(){
  const d=filterDate.value;
  renderDashboard(invoiceHistory.filter(i=>i.date===d));
}

function renderDashboard(data){
  const omzet=data.filter(i=>i.status==="PAID")
    .reduce((s,i)=>s+i.total,0);

  dashboardContent.innerHTML=`
    <b>Total Order:</b> ${data.length}<br>
    <b>Omzet (PAID):</b> Rp ${omzet.toLocaleString("id-ID")}
    <hr>
    ${data.map(i=>`
      <div style="border:1px solid #334155;padding:8px;border-radius:8px;margin-bottom:8px">
        <b>${i.invoiceId}</b><br>
        ${i.game}<br>
        Rp ${i.total.toLocaleString("id-ID")}<br>
        Status: <b>${i.status}</b><br>
        <button onclick="togglePaid('${i.invoiceId}')">
          ${i.status==="PAID"?"UNPAID":"PAID"}
        </button>
      </div>
    `).join("")}
  `;
}

function togglePaid(id){
  const inv=invoiceHistory.find(i=>i.invoiceId===id);
  inv.status=inv.status==="PAID"?"UNPAID":"PAID";
  localStorage.setItem("invoiceHistory",JSON.stringify(invoiceHistory));
  renderDashboard(invoiceHistory);
      }
