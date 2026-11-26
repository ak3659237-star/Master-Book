function openReverseDemand() {
  const need = prompt("📢 উল্টো অফার (Reverse Radar): আপনার এখন কী পণ্য বা সার্ভিস দরকার এবং কত বাজেটে চান লিখুন:");
  if (!need) return;
  const lat = map.getCenter().lat, lng = map.getCenter().lng;
  const demandIcon = L.divIcon({
    className: "rev-pin",
    html: `<div style="background:#16a34a;color:#fff;padding:5px 10px;border-radius:16px;border:2px solid #fde047;font-size:11px;font-weight:900;box-shadow:0 0 15px #22c55e;white-space:nowrap;">🙋 চাই: ${need.slice(0,18)}</div>`,
    iconSize: [150, 30], iconAnchor: [75, 15]
  });
  L.marker([lat, lng], { icon: demandIcon }).addTo(map)
    .bindPopup(`<b>🙋 কাস্টমারের লাইভ চাহিদা:</b><br>${need}<br><button onclick="window.open('https://wa.me/?text='+encodeURIComponent('লাইভ অর্ডার অফার: ${need} - আমি এটি দিতে পারব!'),'_blank')" style="background:#16a34a;color:#fff;border:none;padding:5px 8px;border-radius:8px;margin-top:5px;font-weight:bold;">⚡ আমি সাপ্লাই দেব (Bid)</button>`)
    .openPopup();
  logKhataEntry("Reverse Demand Pin", need, 0, "বিক্রেতারা বিড করছে");
  alert("✅ আপনার চাহিদা ম্যাপে লাইভ পিন হয়ে গেছে! আশেপাশের বিক্রেতারা এখন সরাসরি অফার পাঠাতে পারবেন।");
}

function shareCurrent3DStore() {
  const shareUrl = window.location.origin + window.location.pathname + "?shop=" + encodeURIComponent(activeShop.name);
  const text = `🏬 "${activeShop.name}" এর লাইভ 3D শোরুম ও অফার দেখুন এবং লোকেশন ধরে সরাসরি চলে আসুন:\n${shareUrl}`;
  if (navigator.share) {
    navigator.share({ title: activeShop.name, text, url: shareUrl });
  } else {
    window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");
  }
}

window.addEventListener("load", () => {
  setTimeout(() => {
    const grid = document.querySelector(".grid2");
    if (grid && !document.getElementById("revDemandBtn")) {
      const b1 = document.createElement("button");
      b1.id = "revDemandBtn";
      b1.innerHTML = "🙋 উল্টো অর্ডার (বিক্রেতা খুঁজবে)";
      b1.style.cssText = "background:linear-gradient(135deg,#16a34a,#15803d);font-size:11.5px;";
      b1.onclick = openReverseDemand;

      const b2 = document.createElement("button");
      b2.innerHTML = "📤 3D দোকান শেয়ার (WhatsApp)";
      b2.style.cssText = "background:linear-gradient(135deg,#2563eb,#1d4ed8);font-size:11.5px;";
      b2.onclick = shareCurrent3DStore;

      grid.appendChild(b1);
      grid.appendChild(b2);
    }
  }, 250);
});
