const STORE_NAME = "NEXACORE";
const ADMIN_FEE = 1000;

// NOMOR TUJUAN WA (ORDER MASUK)
const WA_ORDER = "6285136498889";

// NOMOR CS DITAMPILKAN (HANYA DISPLAY)
const CS_NUMBER = "087748100556";

document.getElementById("storeName").innerText = STORE_NAME;

let selectedGame="", selectedNominal="", selectedPayment="QRIS";
let filterMode="all";

/* FLASH SALE TIMER */
let time = 900;
setInterval(()=>{
  const m = Math.floor(time/60);
  const s = time%60;
  document.getElementById("timer").innerText =
    `${m}:${s.toString().padStart(2,"0")}`;
  if(time>0) time--;
},1000);

/* GAME ICON */
const gameIcons={
  "Mobile Legends":"img/mobile_legends.png",
  "Free Fire":"img/free_fire.png",
  "PUBG Mobile":"img/pubg_mobile.png",
  "Genshin Impact":"img/genshin.png",
  "eFootball":"img/efootball.png",
  "Honor of Kings":"img/hok.png",
  "Roblox":"img/roblox.png"
};

/* DATA NOMINAL */
const nominalData={
  "Mobile Legends":[
    {name:"Weekly Diamond Pass",price:28000,type:"pass",best:true},
    {name:"86 Diamonds",price:19500,type:"diamond"},
    {name:"172 Diamonds",price:38500,type:"diamond",hemat:true}
  ],
  "Free Fire":[
    {name:"Membership Mingguan",price:30000,type:"pass",best:true},
    {name:"140 Diamonds",price:20000,type:"diamond",hemat:true}
  ],
  "PUBG Mobile":[
    {name:"60 UC",price:26000,type:"diamond",best:true}
  ],
  "Genshin Impact":[
    {name:"Blessing Welkin",price:60000,type:"pass",best:true}
  ]
};

/* RENDER GAME */
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

  nominalData[selectedGame].forEach(i=>{
    if(filterMode!=="all" && i.type!==filterMode) return;
    const d=document.createElement("div");
    d.className="card";
    d.innerHTML=`${i.name}<br>Rp ${i.price.toLocaleString()}`;
    if(i.best) d.innerHTML+=`<span class="label">BEST</span>`;
    if(i.hemat) d.innerHTML+=`<span class="label hemat">HEMAT</span>`;
    if(i.type==="pass") d.innerHTML+=`<span class="label pass">PASS</span>`;
    d.onclick=()=>{
      selectedNominal=i;
      document.querySelectorAll("#nominalList .card").forEach(c=>c.classList.remove("active"));
      d.classList.add("active");
      document.getElementById("priceText").innerText="Rp "+i.price.toLocaleString();
    };
    list.appendChild(d);
  });
}

/* PAYMENT */
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
Pembayaran: ${selectedPayment}

Mohon kirim bukti transfer (screenshot)`;

  window.open(`https://wa.me/${WA_ORDER}?text=${encodeURIComponent(text)}`,"_blank");
    }
