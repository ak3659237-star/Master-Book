setTimeout(() => {
  map.setView([13.0850, 77.6410], 16);
  const s = activeShop;
  document.getElementById("bottomSheet").innerHTML = `
    <div style="width:36px;height:4px;background:#cbd5e1;border-radius:4px;margin:0 auto 6px auto;"></div>
    <div style="display:flex;justify-content:space-between;align-items:start;">
      <div><b style="font-size:15px;color:#0f172a;">${s.name}</b><div style="font-size:11px;color:#16a34a;font-weight:700;">${s.cat}</div></div>
      <div style="display:flex;gap:4px;">
        <button onclick="openShopRideBooking()" style="width:auto;background:#f59e0b;color:#000;padding:5px 8px;border-radius:14px;font-size:10.5px;">🚕 গাড়ি</button>
        <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination='+s.lat+','+s.lng,'_blank')" style="width:auto;background:#0284c7;padding:5px 8px;border-radius:14px;font-size:10.5px;">🧭 রুট</button>
      </div>
    </div>
    <button onclick="enter3DRoom(activeShop)" style="background:linear-gradient(135deg,#f97316,#dc2626);margin-top:8px;border-radius:20px;padding:9px;font-size:12.5px;">🎮 মল / দোকানের ভেতরে ঢুকুন (3D শোরুম ও প্রোডাক্ট)</button>
  `;
}, 600);
