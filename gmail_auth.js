function initGmailBadge() {
  const slot = document.getElementById("profileSlot") || document.getElementById("topSearchBar");
  if (!slot || document.getElementById("gmailBadgeBtn")) return;
  const user = JSON.parse(localStorage.getItem("mb_gmail_user") || "null");
  const btn = document.createElement("button");
  btn.id = "gmailBadgeBtn";
  btn.onclick = openGmailAccountModal;
  btn.style.cssText = "width:34px;height:34px;min-width:34px;border-radius:50%;padding:0;border:2px solid #0284c7;font-size:14px;font-weight:900;display:flex;align-items:center;justify-content:center;background:" + (user ? "#16a34a" : "#2563eb") + ";color:#fff;";
  btn.innerText = user ? user.name.charAt(0).toUpperCase() : "G";
  slot.appendChild(btn);
}

function openGmailAccountModal() {
  let m = document.getElementById("gmailModal");
  if (!m) { m = document.createElement("div"); m.id = "gmailModal"; m.style.cssText = "position:fixed;inset:0;z-index:10050;background:rgba(2,6,23,0.96);padding:14px;color:#fff;overflow-y:auto;"; document.body.appendChild(m); }
  m.style.display = "block";
  const user = JSON.parse(localStorage.getItem("mb_gmail_user") || "null");
  const myItems = JSON.parse(localStorage.getItem("mb_my_profile_items") || "[]");

  const listHtml = myItems.map((it) => `
    <div style="background:#1e293b;border:1px solid #38bdf8;border-radius:12px;padding:8px;margin-top:6px;display:flex;justify-content:space-between;align-items:center;text-align:left;">
      <div>
        <b style="font-size:12.5px;color:#fde047;">${it.name}</b>
        <div style="font-size:11px;color:#cbd5e1;">দাম: ${it.price} • ${it.type}</div>
      </div>
      <button onclick="openLiveRoute(${it.lat},${it.lng})" style="width:auto;background:#16a34a;padding:6px 10px;font-size:11px;">🧭 লোকেশনে আসুন</button>
    </div>
  `).join("");

  m.innerHTML = `
    <div style="max-width:450px;margin:10px auto;background:#0f172a;border:2px solid #38bdf8;border-radius:22px;padding:16px;text-align:center;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <b style="color:#7dd3fc;font-size:14px;">👤 আমার বিজনেস প্রোফাইল ও লাইভ স্টোর</b>
        <button onclick="document.getElementById('gmailModal').style.display='none'" style="width:auto;padding:4px 10px;background:#e11d48;font-size:11px;">✖</button>
      </div>
      ${user ? `
        <div style="width:52px;height:52px;border-radius:50%;background:#16a34a;color:#fff;font-size:22px;font-weight:900;display:flex;align-items:center;justify-content:center;margin:4px auto;border:2px solid #fde047;">${user.name.charAt(0).toUpperCase()}</div>
        <b style="font-size:15px;color:#fde047;">${user.name}</b>
        <div style="font-size:11px;color:#94a3b8;margin-bottom:10px;">${user.email} • 🟢 লাইভ লোকেশন অ্যাক্টিভ</div>

        <div style="background:#1e293b;padding:10px;border-radius:14px;text-align:left;margin-bottom:10px;">
          <b style="font-size:12px;color:#38bdf8;">➕ প্রোফাইলে নতুন প্রোডাক্ট / ডিল / ভাড়া যোগ করুন:</b>
          <input id="pItemName" placeholder="পণ্যের নাম (যেমন: স্পেশাল সন্দেশ / কুর্তা / পিকআপ)">
          <input id="pItemPrice" placeholder="দাম (যেমন: ₹250)">
          <input id="pItemLink" placeholder="অ্যাফিলিয়েট বা ছবির লিংক (ঐচ্ছিক)">
          <button onclick="addProductWithLiveGPS()" style="background:linear-gradient(135deg,#16a34a,#0284c7);margin-top:8px;font-size:12px;">📍 আমার লাইভ লোকেশনসহ প্রোডাক্ট সেভ করুন</button>
        </div>

        <div style="text-align:left;">
          <b style="font-size:12.5px;color:#fde047;">📦 আমার প্রোফাইলের প্রোডাক্ট লিস্ট (${myItems.length}টি):</b>
          ${listHtml || '<div style="font-size:11px;color:#94a3b8;margin-top:4px;">এখনো কোনো প্রোডাক্ট যোগ করা হয়নি—উপর থেকে যোগ করলেই ক্রেতারা আপনার লাইভ লোকেশন দেখে চলে আসতে পারবেন!</div>'}
        </div>
        <button onclick="localStorage.removeItem('mb_gmail_user');location.reload()" style="background:#334155;font-size:11px;margin-top:12px;">🚪 সাইন আউট</button>
      ` : `
        <p style="font-size:12px;color:#cbd5e1;">আপনার Gmail দিয়ে প্রোফাইল খুলুন—তারপর যত খুশি প্রোডাক্ট ও লাইভ লোকেশন যোগ করতে পারবেন:</p>
        <input id="gmName" placeholder="আপনার নাম / দোকানের নাম">
        <input id="gmEmail" type="email" placeholder="example@gmail.com">
        <button onclick="saveGmailUser()" style="background:linear-gradient(135deg,#16a34a,#0284c7);margin-top:10px;">✅ প্রোফাইল চালু করুন</button>
      `}
    </div>
  `;
}

function addProductWithLiveGPS() {
  const name = document.getElementById("pItemName").value.trim();
  const price = document.getElementById("pItemPrice").value.trim() || "₹199";
  const link = document.getElementById("pItemLink").value.trim();
  if (!name) return alert("পণ্যের নাম লিখুন!");

  const saveItem = (lat, lng) => {
    const user = JSON.parse(localStorage.getItem("mb_gmail_user"));
    const myItems = JSON.parse(localStorage.getItem("mb_my_profile_items") || "[]");
    const numPrice = Number(price.replace(/[^0-9]/g, "")) || 199;
    const itemObj = { name, price, numPrice, url: link.startsWith("http") ? link : "", type: link ? "Affiliate / Online" : "Direct Live Pickup", lat, lng };
    myItems.unshift(itemObj);
    localStorage.setItem("mb_my_profile_items", JSON.stringify(myItems));

    let myShop = shops.find(s => s.ownerEmail === user.email);
    if (!myShop) {
      myShop = { id: Date.now(), ownerEmail: user.email, name: user.name + " • Live Store", cat: "Verified Live Profile • 5.0★", lat, lng, phone: "919000000000", wall: "#16a34a", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80", items: [] };
      shops.push(myShop);
      addPin(myShop);
    }
    myShop.lat = lat; myShop.lng = lng;
    myShop.items.unshift({ name, price, numPrice, url: itemObj.url, icon: "🛍️", color: "#16a34a" });
    localStorage.setItem("mb_v4_shops", JSON.stringify(shops));
    map.setView([lat, lng], 16);
    renderBottomCard(myShop);
    openGmailAccountModal();
    alert("✅ প্রোডাক্ট ও আপনার লাইভ GPS লোকেশন ম্যাপে সেভ হয়েছে!");
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      p => saveItem(p.coords.latitude, p.coords.longitude),
      () => saveItem(map.getCenter().lat, map.getCenter().lng)
    );
  } else {
    saveItem(map.getCenter().lat, map.getCenter().lng);
  }
}

function openLiveRoute(lat, lng) {
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, "_blank");
}

function saveGmailUser() {
  const name = document.getElementById("gmName").value.trim(), email = document.getElementById("gmEmail").value.trim();
  if (!name || !email.includes("@")) return alert("সঠিক নাম ও Gmail দিন!");
  localStorage.setItem("mb_gmail_user", JSON.stringify({ name, email }));
  document.getElementById("gmailModal").style.display = "none";
  const old = document.getElementById("gmailBadgeBtn"); if (old) old.remove(); initGmailBadge();
  openGmailAccountModal();
}
window.addEventListener("load", () => setTimeout(initGmailBadge, 100));
