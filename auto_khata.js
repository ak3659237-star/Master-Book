// অটোমেটিক ডিজিটাল খাতা-বুক ও অষ্টাবক্র ম্যাপ অ্যাসিস্ট্যান্ট
function logKhataEntry(shop, item, amount, mode) {
  const list = JSON.parse(localStorage.getItem("mb_auto_khata") || "[]");
  list.unshift({ time: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}), shop, item, amount: Number(amount), mode });
  localStorage.setItem("mb_auto_khata", JSON.stringify(list));
}

function placeOrderAndLog(shopName, phone, itemName, numPrice, url) {
  logKhataEntry(shopName, itemName, numPrice, url ? "Affiliate ডিল" : "নগদ/অনলাইন অর্ডার");
  if (url) window.open(url, "_blank");
  else window.open(`https://wa.me/${phone}?text=${encodeURIComponent(`অর্ডার: ${itemName} (₹${numPrice})`)}`, "_blank");
}

function openAutoKhata() {
  let m = document.getElementById("khataModal");
  if (!m) { m = document.createElement("div"); m.id = "khataModal"; m.style.cssText = "position:fixed;inset:0;z-index:10010;background:rgba(2,6,23,0.96);padding:14px;color:#fff;overflow-y:auto;"; document.body.appendChild(m); }
  m.style.display = "block";
  const list = JSON.parse(localStorage.getItem("mb_auto_khata") || "[]");
  const total = list.reduce((s, x) => s + (x.amount || 0), 0);
  const rows = list.map(x => `<div style="background:#1e293b;border-left:4px solid #22c55e;padding:8px 10px;border-radius:10px;margin-top:6px;font-size:12px;"><div style="display:flex;justify-content:space-between;"><b>🛍️ ${x.item}</b><b style="color:#4ade80;">₹${x.amount}</b></div><small style="color:#94a3b8;">🕒 ${x.time} • 🏪 ${x.shop} (${x.mode})</small></div>`).join("");
  m.innerHTML = `<div style="max-width:480px;margin:0 auto;background:#0f172a;border:2px solid #22c55e;border-radius:18px;padding:14px;"><div style="display:flex;justify-content:space-between;align-items:center;"><b style="color:#4ade80;font-size:15px;">📒 অটোমেটিক ডিজিটাল খাতা-বুক</b><button onclick="document.getElementById('khataModal').style.display='none'" style="width:auto;padding:5px 10px;background:#e11d48;font-size:11px;">✖ বন্ধ</button></div><div style="background:#064e3b;padding:10px;border-radius:12px;margin:10px 0;font-size:13px;">আজকের মোট অটো-হিসাব: <b style="color:#fde047;font-size:16px;">₹${total}</b> (${list.length}টি এন্ট্রি)</div>${rows || '<small style="color:#94a3b8;">3D ঘর থেকে যেকোনো অর্ডার দিলেই এখানে অটোমেটিক হিসাব জমা হবে!</small>'}</div>`;
}

function askMapAssistant() {
  const q = document.getElementById("qBox").value.trim().toLowerCase();
  if (!q) return;
  const found = shops.find(s => s.name.toLowerCase().includes(q) || s.items.some(i => i.name.toLowerCase().includes(q)));
  if (found) {
    map.setView([found.lat, found.lng], 16);
    renderBottomCard(found);
    alert(`🤖 অষ্টাবক্র ম্যাপ অ্যাসিস্ট্যান্ট:\n"${q}" পাওয়া গেছে '${found.name}' দোকানে! নিচের কার্ড থেকে ভেতরে ঢুকুন।`);
  } else {
    openOpenDemand();
  }
}
