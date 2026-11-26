const vehIcons = [
  { name: "🏍️ Rapido বাইক #1", dLat: 0.0018, dLng: 0.0012 },
  { name: "🏍️ Rapido বাইক #2", dLat: -0.0015, dLng: 0.0020 },
  { name: "🛺 অটো শেয়ারিং", dLat: 0.0012, dLng: -0.0018 },
  { name: "🚚 মিনি পিকআপ", dLat: -0.0020, dLng: -0.0012 }
];

function spawnRapidoVehicles() {
  const c = map.getCenter();
  vehIcons.forEach(v => {
    const ic = L.divIcon({ className: "v-pin", html: `<div style="background:#facc15;color:#000;padding:2px 6px;border-radius:10px;border:1.5px solid #000;font-size:10px;font-weight:900;white-space:nowrap;">${v.name}</div>`, iconSize: [110, 22] });
    L.marker([c.lat + v.dLat, c.lng + v.dLng], { icon: ic }).addTo(map).on("click", () => openShopRideBooking());
  });
}
setTimeout(spawnRapidoVehicles, 700);
let rideRouteLine = null;
window.openShopRideBooking = function() {
  const s = activeShop, pLat = s.lat - 0.004, pLng = s.lng - 0.004;
  if (rideRouteLine) map.removeLayer(rideRouteLine);
  rideRouteLine = L.polyline([[pLat, pLng], [s.lat, s.lng]], { color: "#2563eb", weight: 5 }).addTo(map);
  map.fitBounds(rideRouteLine.getBounds(), { padding: [40, 40] });
  document.getElementById("bottomSheet").innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
      <b style="font-size:13.5px;color:#0f172a;">🚕 Rapido রাইড ➔ ${s.name.slice(0,18)}</b>
      <button onclick="renderFullShopCard(activeShop)" style="width:auto;background:#e2e8f0;color:#0f172a;padding:3px 8px;font-size:11px;">✖</button>
    </div>
    <div style="display:grid;gap:6px;">
      <div onclick="confirmShopRide('🏍️ Rapido বাইক',35)" style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;border:2px solid #facc15;background:#fefce8;border-radius:12px;cursor:pointer;">
        <div><b>🏍️ বাইক রাইড</b><div style="font-size:10px;color:#475569;">⏱️ ৩ মিনিট দূরে • দ্রুত পিকআপ</div></div><b style="font-size:14px;">₹35</b>
      </div>
      <div onclick="confirmShopRide('🛺 অটো / টোটো',65)" style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;border:1.5px solid #cbd5e1;border-radius:12px;cursor:pointer;">
        <div><b>🛺 অটো / টোটো</b><div style="font-size:10px;color:#475569;">⏱️ ৫ মিনিট দূরে • শপিং ব্যাগসহ</div></div><b style="font-size:14px;">₹65</b>
      </div>
      <div onclick="confirmShopRide('🚚 মিনি পিকআপ',180)" style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;border:1.5px solid #cbd5e1;border-radius:12px;cursor:pointer;">
        <div><b>🚚 মিনি পিকআপ ভ্যান</b><div style="font-size:10px;color:#475569;">⏱️ ১০ মিনিট দূরে • ভারী মাল ডেলিভারি</div></div><b style="font-size:14px;">₹180</b>
      </div>
    </div>`;
};

function renderFullShopCard(s) {
  activeShop = s;
  const subs = (s.subStores || s.items || []).slice(0, 2).map(x => `
    <div onclick="enter3DRoom(activeShop)" style="border:1px solid #e2e8f0;border-radius:12px;padding:7px;background:#f8fafc;cursor:pointer;">
      <b style="font-size:11.5px;color:#0f172a;">${x.title || x.name}</b>
      <div style="font-size:10px;color:#64748b;">${x.rating || x.price}</div>
    </div>`).join("");
  document.getElementById("bottomSheet").innerHTML = `
    <div style="width:36px;height:4px;background:#cbd5e1;border-radius:4px;margin:0 auto 5px auto;"></div>
    <div style="display:flex;justify-content:space-between;align-items:start;">
      <div><b style="font-size:14.5px;color:#0f172a;">${s.name}</b><div style="font-size:11px;color:#16a34a;font-weight:700;">${s.cat}</div></div>
      <div style="display:flex;gap:4px;">
        <button onclick="openShopRideBooking()" style="width:auto;background:#facc15;color:#000;padding:5px 8px;border-radius:14px;font-size:10.5px;">🚕 গাড়ি</button>
        <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination='+s.lat+','+s.lng,'_blank')" style="width:auto;background:#0284c7;padding:5px 8px;border-radius:14px;font-size:10.5px;">🧭 রুট</button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:7px;">${subs}</div>
    <button onclick="enter3DRoom(activeShop)" style="background:linear-gradient(135deg,#f97316,#dc2626);margin-top:8px;border-radius:20px;padding:9px;font-size:12px;">🎮 মল / দোকানের ভেতরে ঢুকুন (3D শোরুম ও প্রোডাক্ট)</button>`;
}
setTimeout(() => renderFullShopCard(activeShop), 750);
