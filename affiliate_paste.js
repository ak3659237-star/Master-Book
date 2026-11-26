function openAffiliateDrop() {
  let m = document.getElementById("affPasteModal");
  if (!m) {
    m = document.createElement("div");
    m.id = "affPasteModal";
    m.style.cssText = "position:fixed;inset:0;z-index:10020;background:rgba(2,6,23,0.96);padding:14px;color:#fff;overflow-y:auto;";
    document.body.appendChild(m);
  }
  m.style.display = "block";
  m.innerHTML = `
    <div style="max-width:480px;margin:0 auto;background:#0f172a;border:2px solid #ec4899;border-radius:18px;padding:14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <b style="color:#f472b6;font-size:15px;">🔗 অ্যাফিলিয়েট লিংক পেস্ট ও 3D তাক বিল্ডার</b>
        <button onclick="document.getElementById('affPasteModal').style.display='none'" style="width:auto;padding:5px 10px;background:#e11d48;font-size:11px;">✖ বন্ধ</button>
      </div>
      <div style="display:flex;gap:6px;margin-bottom:6px;">
        <input id="affShopTitle" value="Loot Box India • 3D Deals" placeholder="দোকানের নাম" style="margin:0;">
        <button onclick="pasteFromClipboard()" style="width:auto;background:#0284c7;padding:8px 12px;font-size:11.5px;white-space:nowrap;">📋 পেস্ট করুন</button>
      </div>
      <textarea id="affPasteBox" style="height:120px;font-size:12px;" placeholder="কপি করা অ্যাফিলিয়েট লিংক এখানে পেস্ট করুন (এক বা একাধিক লিংক, প্রতি লাইনে একটি)...&#10;উদাহরণ:&#10;https://ajiio.in/lhI28oX&#10;https://ajiio.in/qm5UVQN | ওয়েফেয়ারার সানগ্লাস | ₹299"></textarea>
      <button onclick="buildAffiliate3DShelf()" style="background:linear-gradient(135deg,#ec4899,#f59e0b);color:#000;margin-top:8px;font-size:13px;">🚀 3D দোকানের তাকে লাইভ বসান</button>
    </div>
  `;
}

async function pasteFromClipboard() {
  try {
    const txt = await navigator.clipboard.readText();
    if (txt) {
      const box = document.getElementById("affPasteBox");
      box.value = box.value ? box.value + "\n" + txt : txt;
    } else alert("ক্লিপবোর্ডে কোনো লিংক পাওয়া যায়নি—বক্সে চেপে ধরে Paste করুন।");
  } catch (e) {
    alert("বক্সের ভেতরে আঙুল দিয়ে চেপে ধরে 'Paste' চাপুন।");
  }
}

function buildAffiliate3DShelf() {
  const title = document.getElementById("affShopTitle").value.trim() || "Loot Box India • 3D Deals";
  const lines = document.getElementById("affPasteBox").value.split("\n").map(x => x.trim()).filter(Boolean);
  if (!lines.length) return alert("আগে অন্তত একটি অ্যাফিলিয়েট লিংক পেস্ট করুন!");

  const colors = ["#ec4899", "#f97316", "#0284c7", "#16a34a", "#7c3aed", "#eab308"];
  const items = lines.map((line, i) => {
    const parts = line.split("|").map(s => s.trim());
    const url = parts[0];
    let name = parts[1];
    if (!name) {
      if (url.includes("ajiio") || url.includes("ajio")) name = "AJIO এক্সক্লুসিভ ডিল #" + (i + 1);
      else if (url.includes("myntra")) name = "Myntra ফ্যাশন অফার #" + (i + 1);
      else if (url.includes("flipkart") || url.includes("fkrt")) name = "Flipkart সুপার ডিল #" + (i + 1);
      else name = "স্পেশাল অফার প্রোডাক্ট #" + (i + 1);
    }
    const priceStr = parts[2] || "অফার প্রাইস ➔";
    const numPrice = Number(priceStr.replace(/[^0-9]/g, "")) || 499;
    return { name, price: priceStr, numPrice, url, icon: "🎁", color: colors[i % colors.length] };
  });

  const affShop = {
    id: Date.now(), name: title, cat: "Official Affiliate 3D Store • 5.0★",
    lat: map.getCenter().lat + (Math.random() - 0.5) * 0.003,
    lng: map.getCenter().lng + (Math.random() - 0.5) * 0.003,
    phone: "919000000000", wall: "#ec4899",
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80",
    items
  };

  shops.push(affShop);
  localStorage.setItem("mb_v3_shops", JSON.stringify(shops));
  addPin(affShop);
  renderBottomCard(affShop);
  document.getElementById("affPasteModal").style.display = "none";
  enter3DRoom(affShop);
}
