const defaultShops = [
  { id: 1, name: "Bhartiya Mall • Master 3D Hub", cat: "Shopping Mall • 4.8★ • Open", lat: 13.0850, lng: 77.6410, phone: "919000000001", wall: "#2563eb",
    img: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=400&q=80",
    subStores: [
      { title: "Sunglass Hut 3D", rating: "4.6★ • Eyewear", thumb: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&q=80" },
      { title: "Loot Box Fashion", rating: "4.9★ • AJIO Deals", thumb: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=200&q=80" }
    ],
    items: [
      { name: "Wayfarer UV সানগ্লাস", price: "₹299", numPrice: 299, icon: "🕶️", color: "#0284c7" },
      { name: "Myshka ফ্লোরাল কুর্তা", price: "₹499", numPrice: 499, icon: "👗", color: "#ec4899" }
    ]},
  { id: 2, name: "অমিত মিষ্টান্ন ও স্পেশাল চা ঘর", cat: "Sweet & Tea Shop • 4.9★ • Open", lat: 13.0835, lng: 77.6425, phone: "919000000002", wall: "#f97316",
    img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&q=80",
    items: [
      { name: "স্পেশাল রসগোল্লা বক্স", price: "₹240", numPrice: 240, icon: "🍯", color: "#ea580c" },
      { name: "আদা-এলাচ মশালা চা", price: "₹20", numPrice: 20, icon: "☕", color: "#eab308" }
    ]}
];
let shops = JSON.parse(localStorage.getItem("mb_v4_shops") || "null") || defaultShops;
let activeShop = shops[0], isSat = false;
const street = L.tileLayer("https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", { maxZoom: 20 });
const sat = L.tileLayer("https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", { maxZoom: 20 });
const map = L.map("realSatMap", { zoomControl: false, layers: [street] }).setView([activeShop.lat, activeShop.lng], 16);

function addPin(s) {
  const icon = L.divIcon({ className: "pin3d", html: `<div style="background:#dc2626;color:#fff;padding:4px 9px;border-radius:14px;border:2px solid #fff;font-size:11px;font-weight:800;white-space:nowrap;box-shadow:0 4px 10px rgba(0,0,0,0.4);">🏬 ${s.name.slice(0,16)}</div>`, iconSize: [145, 28], iconAnchor: [72, 14] });
  L.marker([s.lat, s.lng], { icon }).addTo(map).on("click", () => renderBottomCard(s));
}
shops.forEach(addPin);
function toggleLayer() { isSat ? (map.removeLayer(sat), map.addLayer(street)) : (map.removeLayer(street), map.addLayer(sat)); isSat = !isSat; }
function renderBottomCard(s) {
  activeShop = s;
  const thumb = document.getElementById("thumbImg"); if (thumb) thumb.src = s.img;
  document.getElementById("bottomSheet").innerHTML = `
    <div style="width:36px;height:4px;background:#cbd5e1;border-radius:4px;margin:0 auto 6px auto;"></div>
    <div style="display:flex;justify-content:space-between;align-items:start;">
      <div><b style="font-size:15px;color:#0f172a;">${s.name}</b><div style="font-size:11px;color:#16a34a;font-weight:700;">${s.cat}</div></div>
      <div style="display:flex;gap:4px;">
        <button onclick="openShopRideBooking()" style="width:auto;background:#f59e0b;color:#000;padding:5px 8px;border-radius:14px;font-size:10.5px;">🚕 গাড়ি</button>
        <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination='+activeShop.lat+','+activeShop.lng,'_blank')" style="width:auto;background:#0284c7;padding:5px 8px;border-radius:14px;font-size:10.5px;">🧭 রুট</button>
      </div>
    </div>
    <button onclick="enter3DRoom(activeShop)" style="background:linear-gradient(135deg,#f97316,#dc2626);margin-top:8px;border-radius:20px;padding:9px;font-size:12.5px;">🎮 মল / দোকানের ভেতরে ঢুকুন (3D শোরুম ও প্রোডাক্ট)</button>
  `;
}
renderBottomCard(activeShop);
