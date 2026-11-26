function askMapAssistant(customText) {
  const q = (customText || document.getElementById("qBox").value || "").trim().toLowerCase();
  if (!q) return alert("আপনার কী দরকার লিখুন (যেমন: গাড়ি চাই, মিষ্টি, কুর্তা, খাতা)!");
  if (q.includes("গাড়ি") || q.includes("বাইক") || q.includes("অটো") || q.includes("ride")) return openShopRideBooking();
  if (q.includes("খাতা") || q.includes("হিসাব") || q.includes("ক্যাশব্যাক") || q.includes("wallet")) return openAutoKhata();
  if (q.includes("দরকার") || q.includes("চাই") || q.includes("need")) return openReverseDemand();
  findAndEnterShopByWord(q);
}
function findAndEnterShopByWord(q) {
  const found = shops.find(s => s.name.toLowerCase().includes(q) || (s.items || []).some(i => i.name.toLowerCase().includes(q)));
  if (found) {
    map.setView([found.lat, found.lng], 17);
    renderBottomCard(found);
    if (typeof enter3DRoom === "function") enter3DRoom(found);
  } else {
    openReverseDemand();
  }
}
function startVoiceCommand() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return alert("আপনার ব্রাউজারে ভয়েস সাপোর্ট নেই, সার্চ বক্সে লিখুন!");
  const rec = new SR(); rec.lang = "bn-IN";
  rec.onresult = e => { const t = e.results[0][0].transcript; document.getElementById("qBox").value = t; askMapAssistant(t); };
  rec.start();
}
window.addEventListener("load", () => {
  const bar = document.getElementById("topSearchBar");
  if (bar && !document.getElementById("micBtn")) {
    const m = document.createElement("button"); m.id = "micBtn"; m.innerHTML = "🎙️";
    m.style.cssText = "width:auto;background:transparent;color:#dc2626;padding:4px 6px;font-size:15px;";
    m.onclick = startVoiceCommand; bar.insertBefore(m, document.getElementById("profileSlot"));
  }
});
