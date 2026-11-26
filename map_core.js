const defaultShops = [
  { id: 1, name: "অমিত মিষ্টান্ন ও স্পেশাল চা ঘর", cat: "Sweet & Tea Shop • 4.9★", lat: 12.9716, lng: 77.5946, phone: "919000000001", wall: "#f97316",
    img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&q=80",
    items: [
      { name: "স্পেশাল রসগোল্লা বক্স", price: "₹240", numPrice: 240, icon: "🍯", color: "#ea580c" },
      { name: "আদা-এলাচ মশালা চা", price: "₹20", numPrice: 20, icon: "☕", color: "#eab308" },
      { name: "গরম সিঙ্গারা প্লেট", price: "₹30", numPrice: 30, icon: "🥟", color: "#dc2626" },
      { name: "কাজু বরফি প্যাক", price: "₹450", numPrice: 450, icon: "💎", color: "#db2777" }
    ]},
  { id: 2, name: "অষ্টাবক্র রেন্টাল ও কনস্ট্রাকশন হাব", cat: "Construction & Vehicle • 4.8★", lat: 12.9745, lng: 77.5975, phone: "919000000002", wall: "#2563eb",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
    items: [
      { name: "মাহিন্দ্রা পিকআপ বুকিং", price: "₹850", numPrice: 850, icon: "🚚", color: "#0284c7" },
      { name: "সেন্টারিং প্লেট (৫০টি)", price: "₹2500", numPrice: 2500, icon: "🏗️", color: "#7c3aed" },
      { name: "কংক্রিট মিক্সচার মেশিন", price: "₹900", numPrice: 900, icon: "⚙️", color: "#059669" },
      { name: "রড কাটিং ব্লেড সেট", price: "₹350", numPrice: 350, icon: "🪚", color: "#d97706" }
    ]}
];

let shops = JSON.parse(localStorage.getItem("mb_v3_shops") || "null") || defaultShops;
let activeShop = shops[0], isSat = false;

const street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 });
const sat = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { maxZoom: 19 });
const map = L.map("realSatMap", { zoomControl: false, layers: [street] }).setView([activeShop.lat, activeShop.lng], 15);

function addPin(s) {
  const icon = L.divIcon({
    className: "pin3d",
    html: `<div style="background:#dc2626;color:#fff;padding:4px 9px;border-radius:14px;border:2px solid #fff;font-size:11px;font-weight:800;white-space:nowrap;box-shadow:0 4px 10px rgba(0,0,0,0.4);">📍 ${s.name.slice(0,15)}</div>`,
    iconSize: [140, 28], iconAnchor: [70, 14]
  });
  L.marker([s.lat, s.lng], { icon }).addTo(map).on("click", () => renderBottomCard(s));
}
shops.forEach(addPin);

function toggleLayer() {
  if (!isSat) { map.removeLayer(street); map.addLayer(sat); document.getElementById("satBtn").innerText = "🗺️"; }
  else { map.removeLayer(sat); map.addLayer(street); document.getElementById("satBtn").innerText = "🛰️"; }
  isSat = !isSat;
}

function renderBottomCard(s) {
  activeShop = s;
  document.getElementById("bottomSheet").innerHTML = `
    <div style="width:36px;height:4px;background:#cbd5e1;border-radius:4px;margin:0 auto 8px auto;"></div>
    <div style="display:flex;justify-content:space-between;align-items:start;">
      <div>
        <b style="font-size:16px;color:#0f172a;">${s.name}</b>
        <div style="font-size:12px;color:#475569;margin-top:2px;">${s.cat}</div>
        <div style="font-size:12px;color:#16a34a;font-weight:800;margin-top:2px;">● Open এখন খোলা • অটো খাতা-বুক যুক্ত</div>
      </div>
      <img src="${s.img}" onclick="enter3DRoom(activeShop)" style="width:74px;height:56px;border-radius:12px;object-fit:cover;border:2px solid #f97316;cursor:pointer;">
    </div>
    <button onclick="enter3DRoom(activeShop)" style="background:linear-gradient(135deg,#f97316,#dc2626);margin-top:10px;border-radius:20px;">🎮 দোকানের ভেতরে ঢুকুন (Free Fire 3D ঘর)</button>
  `;
}
renderBottomCard(activeShop);
