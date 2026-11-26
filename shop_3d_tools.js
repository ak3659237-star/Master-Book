function enter3DRoom(s) {
  let m = document.getElementById("room3dModal");
  if (!m) { m = document.createElement("div"); m.id = "room3dModal"; m.style.cssText = "position:fixed;inset:0;z-index:9999;background:radial-gradient(circle at top,#1e293b,#020617);overflow-y:auto;padding:12px;color:#fff;"; document.body.appendChild(m); }
  m.style.display = "block";
  const cards = s.items.map(it => `
    <div style="background:linear-gradient(160deg,${it.color},#0f172a);border:2px solid #fde047;border-radius:16px;padding:12px;box-shadow:0 10px 20px rgba(0,0,0,0.6),inset 0 -6px 0 rgba(0,0,0,0.4);transform:perspective(450px) rotateX(6deg);text-align:center;">
      <div style="font-size:30px;margin-bottom:4px;">${it.icon}</div>
      <b style="font-size:12.5px;display:block;">${it.name}</b>
      <div style="color:#fde047;font-weight:900;font-size:13px;margin:4px 0;">${it.price}</div>
      <button onclick="placeOrderAndLog('${s.name}','${s.phone}','${it.name}',${it.numPrice||100},'${it.url||""}')" style="background:#16a34a;padding:7px;font-size:11.5px;border-radius:10px;margin-top:4px;">🛒 ${it.url ? 'ডিল কিনুন' : 'অর্ডার দিন'}</button>
    </div>
  `).join("");
  m.innerHTML = `
    <div style="max-width:500px;margin:0 auto;border:2.5px solid #facc15;border-radius:22px;padding:14px;background:linear-gradient(180deg,${s.wall}33,#0f172a 40%);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <div><span style="background:#16a34a;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:800;">🎮 Free Fire স্টাইল 3D তাক</span><h3 style="margin:4px 0 0 0;color:#fde047;font-size:16px;">🏬 ${s.name}</h3></div>
        <button onclick="document.getElementById('room3dModal').style.display='none'" style="width:auto;padding:7px 12px;background:#e11d48;font-size:12px;">🚪 ম্যাপে ফিরুন</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:10px;background:rgba(255,255,255,0.05);border-radius:16px;border-bottom:8px solid #78350f;">${cards}</div>
    </div>
  `;
}

function openAffiliateDrop() {
  const raw = prompt("কপি করা Ajio / Myntra / Flipkart অ্যাফিলিয়েট লিংক দিন (যেমন: https://ajiio.in/lhI28oX | কুর্তা | ₹499):", "https://ajiio.in/lhI28oX | Myshka Floral Kurta | ₹499");
  if (!raw) return;
  const p = raw.split("|").map(x => x.trim());
  const numP = Number((p[2] || "499").replace(/[^0-9]/g, "")) || 499;
  const affShop = {
    id: Date.now(), name: "Loot Box India • 3D Affiliate Store", cat: "Official Deals • 5.0★",
    lat: map.getCenter().lat + 0.002, lng: map.getCenter().lng + 0.002, phone: "919000000000", wall: "#ec4899",
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80",
    items: [{ name: p[1] || "AJIO এক্সক্লুসিভ ডিল", price: p[2] || "₹499", numPrice: numP, url: p[0], icon: "🎁", color: "#ec4899" }]
  };
  shops.push(affShop); localStorage.setItem("mb_v3_shops", JSON.stringify(shops)); addPin(affShop); renderBottomCard(affShop); enter3DRoom(affShop);
}

function openOwnerCreator() {
  const name = prompt("দোকানদারের নাম / দোকানের নাম লিখুন:");
  if (!name) return;
  const itemStr = prompt("পণ্যের নাম ও দাম লিখুন (যেমন: স্পেশাল সন্দেশ | ₹300):", "স্পেশাল আইটেম | ₹150");
  const p = (itemStr || "স্পেশাল আইটেম | ₹150").split("|");
  const numP = Number((p[1] || "150").replace(/[^0-9]/g, "")) || 150;
  const newShop = {
    id: Date.now(), name, cat: "Verified Owner Store • 5.0★",
    lat: map.getCenter().lat - 0.002, lng: map.getCenter().lng - 0.002, phone: "919000000000", wall: "#16a34a",
    img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&q=80",
    items: [{ name: p[0].trim(), price: "₹" + numP, numPrice: numP, icon: "🛍️", color: "#0284c7" }]
  };
  shops.push(newShop); localStorage.setItem("mb_v3_shops", JSON.stringify(shops)); addPin(newShop); renderBottomCard(newShop);
}

function openOpenDemand() {
  const need = prompt("কোনো ফিক্স দোকান ছাড়াই পৃথিবীর যেকোনো প্রান্ত থেকে কী অর্ডার করতে চান লিখুন:");
  if (need) {
    logKhataEntry("Open Radar Order", need, 0, "খোঁজা হচ্ছে");
    alert(`📡 সারা নেটওয়ার্কে অর্ডার ছড়িয়ে দেওয়া হয়েছে এবং খাতা-বুকে নোট করা হয়েছে:\n"${need}"`);
  }
}
