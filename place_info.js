const realPlaces = [
  { name: "Bhartiya Mall Of Bengaluru", cat: "Shopping Mall • 4.8★ • Open till 10 PM", lat: 13.0846, lng: 77.6422, addr: "Thanisandra Main Rd, Bengaluru", phone: "+91 80 6191 4000", info: "৫ তলা বিশিষ্ট প্রিমিয়াম মল • PVR সিনেমা, ফুড কোর্ট, ফ্যাশন ও ইলেকট্রনিক্স স্টোর", img: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=400&q=80", items: [{ name: "Sunglass Hut 3D", price: "Ground Floor • 4.6★" }, { name: "Loot Box Fashion", price: "1st Floor • AJIO Deals" }] },
  { name: "IBM Bhartiya City", cat: "IT Park & Corporate Hub • 4.7★", lat: 13.0858, lng: 77.6405, addr: "Block 4, Bhartiya City, Bengaluru", phone: "+91 80 4011 0000", info: "প্রযুক্তি ও কর্পোরেট অফিস কমপ্লেক্স • ২৪ ঘণ্টা সিকিউরিটি ও ক্যাব পিকআপ জোন", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80", items: [{ name: "কর্পোরেট লাঞ্চ ডিল", price: "₹149" }, { name: "Rapido অফিস রাইড", price: "₹35" }] },
  { name: "অমিত মিষ্টান্ন ও স্পেশাল চা ঘর", cat: "Sweet & Tea Shop • 4.9★ • Open", lat: 13.0835, lng: 77.6425, addr: "Bhartiya Mall Gate 2, Bengaluru", phone: "+91 90000 00002", info: "তাজা ছানার রসগোল্লা, সন্দেশ ও আদা-এলাচ স্পেশাল চা • হোম ডেলিভারি চালু", img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&q=80", items: [{ name: "স্পেশাল রসগোল্লা বক্স", price: "₹240" }, { name: "আদা-এলাচ মশালা চা", price: "₹20" }] }
];

function showOriginalPlaceDetails(p) {
  activeShop = p;
  const thumb = document.getElementById("thumbImg"); if (thumb) thumb.src = p.img;
  const dirHtml = (p.items || []).map(x => `<div style="background:#f1f5f9;padding:6px 8px;border-radius:10px;border:1px solid #cbd5e1;"><b style="font-size:11px;color:#0f172a;">${x.name}</b><div style="font-size:10px;color:#0284c7;">${x.price}</div></div>`).join("");
  document.getElementById("bottomSheet").innerHTML = `
    <div style="width:36px;height:4px;background:#cbd5e1;border-radius:4px;margin:0 auto 5px auto;"></div>
    <div style="display:flex;justify-content:space-between;align-items:start;">
      <div><b style="font-size:14.5px;color:#0f172a;">${p.name}</b><div style="font-size:11px;color:#16a34a;font-weight:700;">${p.cat}</div></div>
      <div style="display:flex;gap:4px;">
        <button onclick="openShopRideBooking()" style="width:auto;background:#facc15;color:#000;padding:5px 8px;border-radius:14px;font-size:10.5px;">🚕 গাড়ি</button>
        <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination='+p.lat+','+p.lng,'_blank')" style="width:auto;background:#0284c7;padding:5px 8px;border-radius:14px;font-size:10.5px;">🧭 রুট</button>
      </div>
    </div>
    <div style="font-size:11px;color:#334155;margin-top:5px;line-height:1.4;background:#f8fafc;padding:6px 8px;border-radius:10px;border:1px solid #e2e8f0;">
      📍 <b>ঠিকানা:</b> ${p.addr}<br>📞 <b>ফোন:</b> ${p.phone}<br>ℹ️ ${p.info}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px;">${dirHtml}</div>
    <button onclick="enter3DRoom(activeShop)" style="background:linear-gradient(135deg,#f97316,#dc2626);margin-top:7px;border-radius:20px;padding:8px;font-size:12px;">🎮 ভেতরের 3D ভিউ ও ডকুমেন্ট দেখুন</button>
  `;
}

setTimeout(() => {
  realPlaces.forEach(p => {
    const ic = L.divIcon({ className: "g-pin", html: `<div style="background:#2563eb;color:#fff;padding:3px 7px;border-radius:12px;border:2px solid #fff;font-size:10px;font-weight:800;box-shadow:0 3px 8px rgba(0,0,0,0.35);white-space:nowrap;">🛍️ ${p.name.slice(0,15)}</div>`, iconSize: [125, 24] });
    L.marker([p.lat, p.lng], { icon: ic }).addTo(map).on("click", () => showOriginalPlaceDetails(p));
  });
  showOriginalPlaceDetails(realPlaces[0]);
}, 850);
