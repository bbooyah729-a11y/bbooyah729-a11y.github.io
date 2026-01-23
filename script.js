const STORE_NAME = "NEXACORE";
const ADMIN_FEE = 1000;
const WA_NUMBER = "6287748100556";

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
    {name:"Weekly Diamond Pass",price:28000,type:"pass",best:true},
    {name:"Twilight Pass",price:149000,type:"pass"},
    {name:"86 Diamonds",price:19500,type:"diamond"},
    {name:"172 Diamonds",price:38500,type:"diamond",hemat:true},
    {name:"514 Diamonds",price:110000,type:"diamond"},
    {name:"1028 Diamonds",price:220000,type:"diamond"}
  ],
  "Free Fire":[
    {name:"Membership Mingguan",price:30000,type:"pass",best:true},
    {name:"Membership Bulanan",price:90000,type:"pass"},
    {name:"50 Diamonds",price:8000,type:"diamond"},
    {name:"140 Diamonds",price:20000,type:"diamond",hemat:true},
    {name:"720 Diamonds",price:100000,type:"diamond"}
  ],
  "PUBG Mobile":[
    {name:"60 UC",price:26000,type:"diamond",best:true},
    {name:"120 UC",price:50000,type:"diamond"},
    {name:"660 UC",price:172000,type:"diamond",hemat:true}
  ],
  "Genshin Impact":[
    {name:"Blessing Welkin",price:60000,type:"pass",best:true},
    {name:"300+30 Genesis",price:60000,type:"diamond"},
    {name:"980+110 Genesis",price:185000,type:"diamond"}
  ],
  "eFootball":[
    {name:"130 Coins",price:20000,type:"diamond"},
    {name:"550 Coins",price:80000,type:"diamond",best:true}
  ],
  "Honor of Kings":[
    {name:"80+8 Tokens",price:11000,type:"diamond"},
    {name:"400+32 Tokens",price:63000,type:"diamond",best:true}
  ],
  "Roblox":[
    {name:"80 Robux",price:15000,type:"diamond"},
    {name:"400 Robux",price:75000,type:"diamond",best:true}
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
  items.sort((a,b)=>(b.type==="pass")-(a.type==="pass"));

  items.forEach(i=>{
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
Pembayaran: ${selectedPayment}`;

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`,"_blank");
                                                              }
