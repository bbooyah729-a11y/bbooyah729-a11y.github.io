const STORE_NAME = "NEXACORE";
const ADMIN_FEE = 1000;
const WA_NUMBER = "6285136498889"; // 085136498889

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

const nominalData={
  "Mobile Legends":[
    {name:"5 Diamonds",price:5000,type:"diamond"},
    {name:"14 Diamonds",price:12000,type:"diamond"},
    {name:"86 Diamonds",price:19500,type:"diamond"},
    {name:"172 Diamonds",price:38500,type:"diamond"},
    {name:"257 Diamonds",price:57500,type:"diamond"},
    {name:"514 Diamonds",price:110000,type:"diamond"},
    {name:"878 Diamonds",price:190000,type:"diamond"},
    {name:"Weekly Diamond Pass",price:28000,type:"pass"}
  ],
  "Free Fire":[
    {name:"50 Diamonds",price:6500,type:"diamond"},
    {name:"140 Diamonds",price:20000,type:"diamond"},
    {name:"355 Diamonds",price:42000,type:"diamond"},
    {name:"720 Diamonds",price:85000,type:"diamond"},
    {name:"Membership Mingguan",price:28000,type:"pass"}
  ],
  "PUBG Mobile":[
    {name:"30 UC",price:14000,type:"diamond"},
    {name:"60 UC",price:29000,type:"diamond"},
    {name:"120 UC",price:57000,type:"diamond"},
    {name:"660 UC",price:148000,type:"diamond"},
    {name:"Royale Pass",price:156000,type:"pass"}
  ],
  "Genshin Impact":[
    {name:"Blessing Welkin Moon",price:58000,type:"pass"},
    {name:"300+30 Genesis",price:60000,type:"diamond"},
    {name:"980+110 Genesis",price:174000,type:"diamond"},
    {name:"1980+260 Genesis",price:355000,type:"diamond"}
  ],
  "eFootball":[
    {name:"130 Coins",price:20000,type:"diamond"},
    {name:"300 Coins",price:45000,type:"diamond"},
    {name:"550 Coins",price:80000,type:"diamond"},
    {name:"Match Pass",price:75000,type:"pass"}
  ],
  "Honor of Kings":[
    {name:"80 Tokens",price:12100,type:"diamond"},
    {name:"240 Tokens",price:36900,type:"diamond"},
    {name:"400 Tokens",price:60800,type:"diamond"},
    {name:"Monthly Card",price:75000,type:"pass"}
  ],
  "Roblox":[
    {name:"80 Robux",price:15000,type:"diamond"},
    {name:"160 Robux",price:30000,type:"diamond"},
    {name:"400 Robux",price:75000,type:"diamond"},
    {name:"Premium Monthly",price:85000,type:"pass"}
  ]
};

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

function renderNominal(){
  const list=document.getElementById("nominalList");
  list.innerHTML="";
  if(!selectedGame) return;

  let items=[...nominalData[selectedGame]];
  let diamonds=items.filter(i=>i.type==="diamond" && /\d+/.test(i.name));
  let best=null;

  diamonds.forEach(i=>{
    const qty=parseInt(i.name);
    i.val=i.price/qty;
    if(!best||i.val<best.val) best=i;
  });

  items.forEach((i,idx)=>{
    if(filterMode!=="all"&&i.type!==filterMode) return;
    const d=document.createElement("div");
    d.className="card";
    d.innerHTML=`${i.name}<br>Rp ${i.price.toLocaleString()}`;

    if(i===best) d.innerHTML+=`<span class="label">BEST VALUE</span>`;
    else if(idx===Math.floor(items.length/2)) d.innerHTML+=`<span class="label hemat">POPULER</span>`;
    else if(i.type==="pass") d.innerHTML+=`<span class="label pass">PASS</span>`;

    d.onclick=()=>{
      selectedNominal=i;
      document.querySelectorAll("#nominalList .card").forEach(c=>c.classList.remove("active"));
      d.classList.add("active");
      priceText.innerText="Rp "+i.price.toLocaleString();
    };
    list.appendChild(d);
  });
}

document.querySelectorAll("#payments div").forEach(p=>{
  p.onclick=()=>{
    selectedPayment=p.innerText;
    document.querySelectorAll("#payments div").forEach(x=>x.classList.remove("active"));
    p.classList.add("active");
  };
});

function checkout(){
  if(!selectedGame||!selectedNominal||!userId.value){
    alert("Lengkapi data");
    return;
  }
  if(selectedPayment==="QRIS"){
    qrisPopup.style.display="flex";
    return;
  }
  kirimWA();
}

function lanjutWA(){
  qrisPopup.style.display="none";
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
