const defaultShops = [
  { id: 1, name: "Bhartiya Mall • Master 3D Hub", cat: "Shopping Mall • 4.8★ • Open Closes 22:00", lat: 13.0850, lng: 77.6410, phone: "919000000001", wall: "#2563eb",
    img: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=400&q=80",
    subStores: [
      { title: "Sunglass Hut 3D", rating: "4.6★ • Eyewear", thumb: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&q=80" },
      { title: "Loot Box Fashion", rating: "4.9★ • AJIO Deals", thumb: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200&q=80" }
    ],
    items: [
      { name: "Wayfarer UV সানগ্লাস", price: "₹299", numPrice: 299, icon: "🕶️", photo: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80", color: "#0284c7" },
      { name: "Myshka ফ্লোরাল কুর্তা", price: "₹499", numPrice: 499, icon: "👗", photo: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&q=80", color: "#ec4899" },
      { name: "স্মার্ট ওয়াচ প্রো", price: "₹1,299", numPrice: 1299, icon: "⌚", photo: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", color: "#7c3aed" },
      { name: "স্পেশাল ফুড কোর্ট কম্বো", price: "₹199", numPrice: 199, icon: "🍔", color: "#ea580c" }
    ]},
  { id: 2, name: "অমিত মিষ্টান্ন ও স্পেশাল চা ঘর", cat: "Sweet & Tea Shop • 4.9★ • Open", lat: 13.0825, lng: 77.6435, phone: "919000000002", wall: "#f97316",
    img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&q=80",
    subStores: [
      { title: "রসগোল্লা কাউন্টার", rating: "5.0★ • Fresh Sweets", thumb: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=200&q=80" },
      { title: "মশালা চা ও স্ন্যাকস", rating: "4.9★ • Hot Tea", thumb: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&q=80" }
    ],
    items: [
      { name: "স্পেশাল রসগোল্লা বক্স", price: "₹240", numPrice: 240, icon: "🍯", color: "#ea580c" },
      { name: "আদা-এলাচ মশালা চা", price: "₹20", numPrice: 20, icon: "☕", color: "#eab308" },
      { name: "গরম সিঙ্গারা প্লেট", price: "₹30", numPrice: 30, icon: "🥟", color: "#dc2626" },
      { name: "কাজু বরফি প্যাক", price: "₹450", numPrice: 450, icon: "💎", color: "#db2777" }
    ]}
];

let shops = JSON.parse(localStorage.getItem("mb_v4_shops") || "null") || defaultShops;
let activeShop = shops[0], isSat = false;

const street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 });
const sat = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { maxZoom: 19 });
const map = L.map("realSatMap", { zoomControl: false, layers: [street] }).setView([activeShop.lat, activeShop.lng], 15);

function addPin(s) {
  const icon = L.divIcon({
    className: "pin3d",
    html: `<div style="background:#dc2626;color:#fff;padding:4px 9px;border-radius:14px;border:2px solid #fff;font-size:11px;font-weight:800;white-space:nowrap;box-shadow:0 4px 10px rgba(0,0,0,0.4);">🏬 ${s.name.slice(0,16)}</div>`,
    iconSize: [145, 28], iconAnchor: [72, 14]
  });
  L.marker([s.lat, s.lng], { icon }).addTo(map).on("click", () => renderBottomCard(s));
}
shops.forEach(addPin);

function toggleLayer() {
  if (!isSat) { map.removeLayer(street); map.addLayer(sat); }
  else { map.removeLayer(sat); map.addLayer(street); }
  isSat = !isSat;
}

function renderBottomCard(s) {
  activeShop = s;
  const thumb = document.getElementById("thumbImg");
  if (thumb) thumb.src = s.img;
  const subs = (s.subStores || []).map(sub => `
    <div onclick="enter3DRoom(activeShop)" style="min-width:165px;border:1px solid #e2e8f0;border-radius:12px;padding:7px;display:flex;justify-content:space-between;align-items:center;gap:6px;background:#f8fafc;cursor:pointer;">
      <div><b style="font-size:11.5px;color:#0f172a;display:block;">${sub.title}</b><span style="font-size:10px;color:#475569;">${sub.rating}</span></div>
      <img src="${sub.thumb}" style="width:42px;height:42px;border-radius:8px;object-fit:cover;">
    </div>
  `).join("");
  document.getElementById("bottomSheet").innerHTML = `
    <div style="width:36px;height:4px;background:#cbd5e1;border-radius:4px;margin:0 auto 6px auto;"></div>
    <div style="display:flex;justify-content:space-between;align-items:start;">
      <div>
        <b style="font-size:16px;color:#0f172a;display:block;">${s.name}</b>
        <div style="font-size:11.5px;color:#16a34a;font-weight:700;margin:2px 0 6px 0;">${s.cat}</div>
      </div>
      <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination='+activeShop.lat+','+activeShop.lng,'_blank')" style="width:auto;background:#0284c7;padding:6px 10px;border-radius:16px;font-size:11px;">🧭 লোকেশন</button>
    </div>
    ${subs ? `<div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:6px;">${subs}</div>` : ""}
    <button onclick="enter3DRoom(activeShop)" style="background:linear-gradient(135deg,#f97316,#dc2626);margin-top:6px;border-radius:20px;padding:9px;font-size:12.5px;">🎮 মল / দোকানের ভেতরে ঢুকুন (3D শোরুম ও প্রোডাক্ট)</button>
  `;
}

// শেয়ার করা লিংক বা রেফারেল দিয়ে কেউ ঢুকলে অটোমেটিক শনাক্ত করা
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("shop")) {
  const found = shops.find(x => x.name.toLowerCase().includes(urlParams.get("shop").toLowerCase()));
  if (found) activeShop = found;
}
renderBottomCard(activeShop);
