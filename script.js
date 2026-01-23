const STORE_NAME = "NEXACORE";
const ADMIN_FEE = 1000;
const WA_NUMBER = "085136498889"; // nomor yang digunakan untuk WA

document.getElementById("storeName").innerText = STORE_NAME;

let selectedGame="", selectedNominal="", selectedPayment="QRIS";
let filterMode="all";

const gameIcons={
  "Mobile Legends":"img/mobile_legends.png",
  "Free Fire":"img/free_fire.png",
  "PUBG Mobile":"img/pubg_mobile.png",
  "Genshin Impact":"img/genshin.png",
  "eFootball":"img/efootball.png",
  "Honor of Kings":"img/hok.png",
  "Roblox":"img/roblox.png"
};

// -------------------------
// NominalData versi banyak + best seller
// -------------------------
const nominalData = {
  "Mobile Legends":[
    {name:"3 Diamonds",price:3000,type:"diamond"},
    {name:"5 Diamonds",price:5000,type:"diamond"},
    {name:"10 Diamonds",price:9000,type:"diamond"},
    {name:"14 Diamonds",price:12000,type:"diamond"},
    {name:"28 Diamonds",price:23000,type:"diamond"},
    {name:"36 Diamonds",price:30000,type:"diamond"},
    {name:"42 Diamonds",price:36000,type:"diamond"},
    {name:"70 Diamonds",price:59000,type:"diamond"},
    {name:"86 Diamonds",price:19500,type:"diamond",best:true},
    {name:"100 Diamonds",price:75000,type:"diamond"},
    {name:"172 Diamonds",price:38500,type:"diamond"},
    {name:"257 Diamonds",price:57500,type:"diamond"},
    {name:"344 Diamonds",price:77500,type:"diamond"},
    {name:"514 Diamonds",price:110000,type:"diamond"},
    {name:"706 Diamonds",price:150000,type:"diamond"},
    {name:"878 Diamonds",price:190000,type:"diamond"},
    {name:"1050 Diamonds",price:220000,type:"diamond"},
    {name:"1412 Diamonds",price:295000,type:"diamond"},
    {name:"2195 Diamonds",price:450000,type:"diamond"},
    {name:"3688 Diamonds",price:750000,type:"diamond"},
    {name:"Weekly Diamond Pass",price:28000,type:"pass",best:true},
    {name:"Twilight Pass",price:149000,type:"pass"}
  ],

  "Free Fire":[
    {name:"5 Diamonds",price:1700,type:"diamond"},
    {name:"12 Diamonds",price:3200,type:"diamond"},
    {name:"20 Diamonds",price:5000,type:"diamond"},
    {name:"50 Diamonds",price:6500,type:"diamond"},
    {name:"70 Diamonds",price:10000,type:"diamond"},
    {name:"100 Diamonds",price:14500,type:"diamond"},
    {name:"140 Diamonds",price:20000,type:"diamond",best:true},
    {name:"210 Diamonds",price:30000,type:"diamond"},
    {name:"355 Diamonds",price:42000,type:"diamond"},
    {name:"500 Diamonds",price:59000,type:"diamond"},
    {name:"720 Diamonds",price:85000,type:"diamond"},
    {name:"1000 Diamonds",price:118000,type:"diamond"},
    {name:"1450 Diamonds",price:170000,type:"diamond"},
    {name:"2180 Diamonds",price:255000,type:"diamond"},
    {name:"3640 Diamonds",price:420000,type:"diamond"},
    {name:"Membership Mingguan",price:28000,type:"pass",best:true},
    {name:"Membership Bulanan",price:78000,type:"pass"}
  ],

  "PUBG Mobile":[
    {name:"15 UC",price:8000,type:"diamond"},
    {name:"30 UC",price:14000,type:"diamond"},
    {name:"50 UC",price:23000,type:"diamond"},
    {name:"60 UC",price:29000,type:"diamond",best:true},
    {name:"120 UC",price:57000,type:"diamond"},
    {name:"180 UC",price:85000,type:"diamond"},
    {name:"325 UC",price:72000,type:"diamond"},
    {name:"660 UC",price:148000,type:"diamond"},
    {name:"1200 UC",price:260000,type:"diamond"},
    {name:"1800 UC",price:360000,type:"diamond"},
    {name:"3850 UC",price:720000,type:"diamond"},
    {name:"8100 UC",price:1450000,type:"diamond"},
    {name:"Royale Pass",price:156000,type:"pass",best:true}
  ],

  "Genshin Impact":[
    {name:"60 Genesis",price:12000,type:"diamond"},
    {name:"120 Genesis",price:24000,type:"diamond"},
    {name:"300+30 Genesis",price:60000,type:"diamond",best:true},
    {name:"680 Genesis",price:118000,type:"diamond"},
    {name:"980+110 Genesis",price:174000,type:"diamond"},
    {name:"1980+260 Genesis",price:355000,type:"diamond"},
    {name:"3280+600 Genesis",price:579000,type:"diamond"},
    {name:"6480+1600 Genesis",price:1165000,type:"diamond"},
    {name:"Blessing Welkin Moon",price:58000,type:"pass",best:true}
  ],

  "eFootball":[
    {name:"100 Coins",price:16000,type:"diamond"},
    {name:"130 Coins",price:20000,type:"diamond"},
    {name:"250 Coins",price:38000,type:"diamond"},
    {name:"300 Coins",price:45000,type:"diamond"},
    {name:"550 Coins",price:80000,type:"diamond",best:true},
    {name:"750 Coins",price:110000,type:"diamond"},
    {name:"1040 Coins",price:150000,type:"diamond"},
    {name:"2130 Coins",price:295000,type:"diamond"},
    {name:"3250 Coins",price:445000,type:"diamond"},
    {name:"Match Pass",price:75000,type:"pass",best:true}
  ],

  "Honor of Kings":[
    {name:"8 Tokens",price:2000,type:"diamond"},
    {name:"16 Tokens",price:3300,type:"diamond"},
    {name:"40 Tokens",price:6100,type:"diamond"},
    {name:"80 Tokens",price:12100,type:"diamond",best:true},
    {name:"120 Tokens",price:18500,type:"diamond"},
    {name:"240 Tokens",price:36900,type:"diamond"},
    {name:"400 Tokens",price:60800,type:"diamond"},
    {name:"560 Tokens",price:85400,type:"diamond"},
    {name:"800 Tokens",price:120000,type:"diamond"},
    {name:"1200 Tokens",price:178000,type:"diamond"},
    {name:"Weekly Card",price:12000,type:"pass"},
    {name:"Monthly Card",price:75000,type:"pass",best:true}
  ],

  "Roblox":[
    {name:"40 Robux",price:8000,type:"diamond"},
    {name:"80 Robux",price:15000,type:"diamond",best:true},
    {name:"160 Robux",price:30000,type:"diamond"},
    {name:"240 Robux",price:45000,type:"diamond"},
    {name:"400 Robux",price:75000,type:"diamond"},
    {name:"800 Robux",price:145000,type:"diamond"},
    {name:"1700 Robux",price:295000,type:"diamond"},
    {name:"2700 Robux",price:445000,type:"diamond"},
    {name:"4500 Robux",price:750000,type:"diamond"},
    {name:"10000 Robux",price:1600000,type:"diamond"},
    {name:"Premium Monthly",price:85000,type:"pass",best:true}
  ]
};

// -------------------------
// RENDER GAME
// -------------------------
const gameList=document.getElementById("gameList");
Object.keys(gameIcons).forEach(g=>{
  const d=document.createElement("div");
  d.className="card";
  d.innerHTML=`<img src="${gameIcons[g]}" width="64"><br>${g}`;
  d.onclick=()=>selectGame(g,d);
  gameList.appendChild(d);
});

function selectGame(g,el){
  selectedGame=g;
  document.querySelectorAll("#gameList .card").forEach(c=>c.classList.remove("active"));
  el.classList.add("active");
  renderNominal();
}

function setFilter(f){filterMode=f;renderNominal();}

// -------------------------
// RENDER NOMINAL (BEST SELLER DI ATAS)
// -------------------------
function renderNominal(){
  const list = document.getElementById("nominalList");
  list.innerHTML = "";
  if(!selectedGame) return;

  let items = [...nominalData[selectedGame]];

  // AUTO SORT BEST DI ATAS, sisanya harga naik
  items.sort((a,b)=>{
    if(a.best && !b.best) return -1;
    if(!a.best && b.best) return 1;
    return a.price - b.price;
  });

  items.forEach(i=>{
    if(filterMode!=="all" && i.type!==filterMode) return;

    const d = document.createElement("div");
    d.className = "card";
    d.innerHTML = `${i.name}<br>Rp ${i.price.toLocaleString()}`;
    if(i.best) d.innerHTML += `<span class="label">PALING LAKU</span>`;
    if(i.type==="pass") d.innerHTML += `<span class="label pass">PASS</span>`;

    d.onclick = ()=>{
      selectedNominal = i;
      document.querySelectorAll("#nominalList .card")
        .forEach(c=>c.classList.remove("active"));
      d.classList.add("active");
      document.getElementById("priceText").innerText =
        "Rp " + i.price.toLocaleString();
    };

    list.appendChild(d);
  });
}

// -------------------------
// PAYMENT SELECT
// -------------------------
document.querySelectorAll("#payments div").forEach(p=>{
  p.onclick=()=>{
    selectedPayment=p.innerText;
    document.querySelectorAll("#payments div").forEach(x=>x.classList.remove("active"));
    p.classList.add("active");
  };
});

// -------------------------
// CHECKOUT
// -------------------------
function checkout(){
  if(!selectedGame||!selectedNominal||!userId.value){
    alert("Lengkapi data");
    return;
  }
  if(selectedPayment==="QRIS"){
    document.getElementById("qrisPopup").style.display="flex";
    return;
  }
  kirimWA();
}

function lanjutWA(){
  document.getElementById("qrisPopup").style.display="none";
  kirimWA();
}

function kirimWA(){
  const total=selectedNominal.price+ADMIN_FEE;
  const text=`Halo Admin ${STORE_NAME}
Game: ${selectedGame}
Paket: ${selectedNominal.name}
Harga: Rp ${selectedNominal.price}
Admin: Rp ${ADMIN_FEE}
Total: Rp ${total}
User ID: ${userId.value}
Server: ${server.value||"-"}
Pembayaran: ${selectedPayment}`;

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`,"_blank");
     }
