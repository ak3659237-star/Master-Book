function openShopRideBooking() {
  const s = activeShop ? activeShop.name : "নির্বাচিত দোকান";
  const choice = prompt(`🚕 ${s} এর জন্য গাড়ি বেছে নিন:\n1 = 🏍️ বাইক (₹35)\n2 = 🛺 অটো/টোটো (₹65)\n3 = 🚚 মিনি পিকআপ (₹180)`, "1");
  if (!choice) return;
  const mapList = { "1": ["🏍️ বাইক রাইড", 35], "2": ["🛺 অটো/টোটো", 65], "3": ["🚚 মিনি পিকআপ", 180] };
  const [vType, fare] = mapList[choice] || mapList["1"];
  confirmShopRide(vType, fare);
}
function confirmShopRide(vType, fare) {
  const s = activeShop ? activeShop.name : "দোকান";
  const lat = activeShop ? activeShop.lat : map.getCenter().lat;
  const lng = activeShop ? activeShop.lng : map.getCenter().lng;
  if (typeof logKhataEntry === "function") logKhataEntry("Ride", `${vType} ➔ ${s}`, fare, "বুক হয়েছে");
  L.marker([lat + 0.001, lng + 0.001]).addTo(map).bindPopup(`🚕 ${vType} আসছে (₹${fare})`).openPopup();
  window.open("https://wa.me/?text=" + encodeURIComponent(`🚕 রাইড বুক: ${vType} | দোকান: ${s} | ভাড়া: ₹${fare} | https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`), "_blank");
}
window.addEventListener("load", () => {
  setTimeout(() => {
    const g = document.querySelector(".grid2");
    if (g && !document.getElementById("rideBtn")) {
      const b = document.createElement("button");
      b.id = "rideBtn"; b.innerHTML = "🚕 দোকান থেকেই গাড়ি বুক";
      b.style.cssText = "background:#f59e0b;color:#000;font-size:12px;";
      b.onclick = openShopRideBooking; g.appendChild(b);
    }
  }, 300);
});
