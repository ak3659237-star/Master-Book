const knownLandmarks = [
  { name: "Haj Bhavan (हज भवन)", cat: "Public Building & Cultural Center • 4.6★", lat: 13.0908, lng: 77.6366, addr: "Bellahalli Main Rd, Kogilu, Bengaluru" },
  { name: "CMA Palace Convention Hall", cat: "Convention Center • 4.5★", lat: 13.0938, lng: 77.6365, addr: "Bellahalli Rd, M.S. Nagar, Bengaluru" },
  { name: "KNS Institute of Technology", cat: "Engineering College • 4.3★", lat: 13.0894, lng: 77.6367, addr: "Hegde Nagar, Kogilu, Bengaluru" },
  { name: "Aarambha Residency", cat: "Residential Complex • 4.4★", lat: 13.0962, lng: 77.6388, addr: "Bellahalli, Bengaluru" },
  { name: "Bhartiya Mall Of Bengaluru", cat: "Shopping Mall • 4.8★", lat: 13.0846, lng: 77.6422, addr: "Thanisandra Main Rd, Bengaluru" }
];

function openRealGoogleView(lat, lng, title) {
  window.open(`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`, "_blank");
}

setTimeout(() => {
  const sheet = document.getElementById("bottomSheet");
  if (sheet) sheet.style.cssText = "display:none;position:absolute;bottom:0;left:0;right:0;height:auto;background:#fff;color:#0f172a;border-radius:20px 20px 0 0;padding:12px 14px 16px 14px;z-index:600;box-shadow:0 -6px 20px rgba(0,0,0,0.25);";

  const thumbBox = document.getElementById("thumbImg")?.parentElement;
  if (thumbBox) {
    thumbBox.onclick = () => openRealGoogleView(activeShop?.lat || map.getCenter().lat, activeShop?.lng || map.getCenter().lng, activeShop?.name);
  }

  window.enter3DRoom = function(s) {
    const isMyShop = shops.some(x => x.name === s?.name && x.items?.length);
    if (isMyShop) {
      document.getElementById("bottomSheet").innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <b style="font-size:15px;">🏬 ${s.name} (প্রোডাক্ট লিস্ট)</b>
          <button onclick="closeGMapSheet()" style="width:28px;height:28px;border-radius:50%;background:#f1f5f9;color:#000;padding:0;">✕</button>
        </div>
        <div style="display:grid;gap:6px;">
          ${s.items.map(i => `<div style="display:flex;justify-content:space-between;padding:7px 10px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;"><b>${i.icon || "📦"} ${i.name}</b><b style="color:#16a34a;">${i.price}</b></div>`).join("")}
        </div>`;
      return;
    }
    openRealGoogleView(s?.lat || map.getCenter().lat, s?.lng || map.getCenter().lng, s?.name);
  };

  map.off("click");
  map.on("click", async e => {
    const { lat, lng } = e.latlng;
    const near = knownLandmarks.find(p => Math.abs(p.lat - lat) < 0.0014 && Math.abs(p.lng - lng) < 0.0014);
    if (near) {
      openGoogleStylePlaceCard(near.name, `${near.cat} • ${near.addr}`, near.lat, near.lng, near);
      if (thumbBox) { thumbBox.style.display = "block"; thumbBox.style.bottom = "175px"; thumbBox.style.top = "auto"; }
      return;
    }
    openGoogleStylePlaceCard("লোড হচ্ছে...", "আসল জায়গার তথ্য খোঁজা হচ্ছে...", lat, lng, { lat, lng });
    try {
      const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&accept-language=en`);
      const d = await r.json();
      const title = d.name || (d.address?.road ? `${d.address.road} Spot` : d.display_name.split(",")[0]);
      const addr = d.display_name.split(",").slice(0, 3).join(", ");
      openGoogleStylePlaceCard(title, `Open • ${addr}`, lat, lng, { name: title, lat, lng });
      if (thumbBox) { thumbBox.style.display = "block"; thumbBox.style.bottom = "175px"; thumbBox.style.top = "auto"; }
    } catch {
      openGoogleStylePlaceCard(`Map Pin (${lat.toFixed(4)}, ${lng.toFixed(4)})`, "Open • লাইভ GPS স্পট", lat, lng, { lat, lng });
    }
  });
}, 1350);
setTimeout(() => {
  const thumbImg = document.getElementById("thumbImg");
  const thumbBox = thumbImg?.parentElement;
  const origOpenCard = window.openGoogleStylePlaceCard;
  window.openGoogleStylePlaceCard = function(title, sub, lat, lng, shopObj) {
    origOpenCard(title, sub, lat, lng, shopObj);
    if (!thumbImg || !thumbBox) return;
    const isMyShop = shops.some(x => x.name === title && x.img);
    thumbImg.src = isMyShop ? shopObj.img : "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=300&q=80";
    const badge = thumbBox.querySelector("span");
    if (badge) badge.innerHTML = isMyShop ? "🔄 3D দোকান" : "🔄 Street View";
  };
}, 1450);
