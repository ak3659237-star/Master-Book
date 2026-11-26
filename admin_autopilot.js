function openQuickCommandCenter() {
  let m = document.getElementById("quickCmdModal");
  if (!m) { m = document.createElement("div"); m.id = "quickCmdModal"; m.style.cssText = "position:fixed;inset:0;z-index:10060;background:rgba(2,6,23,0.96);padding:14px;color:#fff;overflow-y:auto;"; document.body.appendChild(m); }
  m.style.display = "block";
  m.innerHTML = `
    <div style="max-width:460px;margin:10px auto;background:#0f172a;border:2px solid #fde047;border-radius:20px;padding:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <b style="color:#fde047;font-size:15px;">⚡ ১-ক্লিক অটোপাইলট শর্টকাট (কোনো মেনু খুঁজতে হবে না)</b>
        <button onclick="document.getElementById('quickCmdModal').style.display='none'" style="width:auto;padding:4px 10px;background:#e11d48;font-size:11px;">✖</button>
      </div>
      <div style="display:grid;gap:8px;">
        <button onclick="window.open('https://github.com/ak3659237-star/Master-Book/upload/main','_blank')" style="background:#0284c7;">📤 ১. সরাসরি GitHub ফাইল আপলোড পেজ খুলুন</button>
        <button onclick="window.open('https://github.com/ak3659237-star/Master-Book/settings#danger-zone','_blank')" style="background:#dc2626;">🔓 ২. রিপোজিটরি Public/Private সেটিংস</button>
        <button onclick="window.open('https://ak3659237-star.github.io/Master-Book/','_blank')" style="background:#16a34a;">🌐 ৩. লাইভ ওয়েবসাইট রিফ্রেশ করুন</button>
        <button onclick="document.getElementById('quickCmdModal').style.display='none';openAffiliateDrop()" style="background:#ec4899;">🔗 ৪. অ্যাফিলিয়েট লিংক 3D তাকে ছাড়ুন</button>
        <button onclick="document.getElementById('quickCmdModal').style.display='none';openAutoKhata()" style="background:#059669;">📒 ৫. অটো খাতা + Navi ক্যাশব্যাক ওয়ালেট</button>
      </div>
    </div>
  `;
}
window.addEventListener("load", () => {
  setTimeout(() => {
    const panel = document.querySelector(".box > div:last-child");
    if (panel && !document.getElementById("quickCmdTrigger")) {
      const b = document.createElement("button");
      b.id = "quickCmdTrigger";
      b.innerHTML = "⚡ ১-ক্লিক সব শর্টকাট ও সেটিংস";
      b.style.cssText = "margin-top:8px;background:linear-gradient(135deg,#f59e0b,#dc2626);color:#fff;font-size:12px;";
      b.onclick = openQuickCommandCenter;
      panel.appendChild(b);
    }
  }, 200);
});
