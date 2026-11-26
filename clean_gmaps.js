window.addEventListener("load", () => {
  const mDiv = document.getElementById("realSatMap");
  const sheet = document.getElementById("bottomSheet");
  const thumb = document.getElementById("thumbImg")?.parentElement;
  if (mDiv) mDiv.style.height = "100%";
  if (sheet) { sheet.style.display = "none"; sheet.style.height = "46%"; }
  if (thumb) thumb.style.display = "none";
  setTimeout(() => map.invalidateSize(), 200);
});

function closeGMapSheet() {
  document.getElementById("bottomSheet").style.display = "none";
  const thumb = document.getElementById("thumbImg")?.parentElement;
  if (thumb) thumb.style.display = "none";
}
function openGoogleStylePlaceCard(title, sub, lat, lng, shopObj) {
  if (shopObj) activeShop = shopObj;
  const sheet = document.getElementById("bottomSheet");
  const thumb = document.getElementById("thumbImg")?.parentElement;
  if (thumb) { thumb.style.display = "block"; thumb.style.bottom = "48%"; thumb.style.top = "auto"; }
  sheet.style.display = "block";
  sheet.innerHTML = `
    <div style="width:36px;height:4px;background:#cbd5e1;border-radius:4px;margin:0 auto 6px auto;"></div>
    <div style="display:flex;justify-content:space-between;align-items:start;">
      <div>
        <b style="font-size:17px;color:#0f172a;line-height:1.2;">${title}</b>
        <div style="font-size:12px;color:#eab308;margin-top:2px;">4.8 ★★★★★ <span style="color:#64748b;">(Verified)</span></div>
        <div style="font-size:11.5px;color:#16a34a;font-weight:700;margin-top:2px;">${sub}</div>
      </div>
      <button onclick="closeGMapSheet()" style="width:30px;height:30px;border-radius:50%;background:#f1f5f9;color:#0f172a;padding:0;font-size:13px;">✕</button>
    </div>
    <div style="display:flex;gap:6px;margin-top:10px;overflow-x:auto;">
      <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination='+${lat}+','+${lng},'_blank')" style="width:auto;background:#0f766e;border-radius:20px;padding:7px 12px;font-size:11.5px;">🧭 Directions</button>
      <button onclick="openShopRideBooking()" style="width:auto;background:#e0f2fe;color:#0369a1;border-radius:20px;padding:7px 12px;font-size:11.5px;">▲ Start / 🚕 গাড়ি</button>
      <button onclick="enter3DRoom(activeShop)" style="width:auto;background:#ffedd5;color:#c2410c;border-radius:20px;padding:7px 12px;font-size:11.5px;">🎮 3D ভেতর</button>
    </div>
  `;
}

setTimeout(() => {
  window.renderBottomCard = s => openGoogleStylePlaceCard(s.name, s.cat, s.lat, s.lng, s);
  window.showOriginalPlaceDetails = p => openGoogleStylePlaceCard(p.name, p.cat, p.lat, p.lng, p);
  map.on("click", e => {
    const { lat, lng } = e.latlng;
    openGoogleStylePlaceCard(`Selected Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`, "Open • লাইভ GPS স্পট ও রাইড জোন", lat, lng, null);
  });
}, 950);
