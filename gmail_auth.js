function initGmailBadge() {
  const topBar = document.querySelector("#mapStage > div");
  if (!topBar || document.getElementById("gmailBadgeBtn")) return;
  const user = JSON.parse(localStorage.getItem("mb_gmail_user") || "null");
  const btn = document.createElement("button");
  btn.id = "gmailBadgeBtn";
  btn.onclick = openGmailAccountModal;
  btn.style.cssText = "width:36px;height:36px;min-width:36px;border-radius:50%;padding:0;border:2px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,0.4);font-size:14px;font-weight:900;display:flex;align-items:center;justify-content:center;background:" + (user ? "#16a34a" : "#2563eb") + ";";
  btn.innerText = user ? user.name.charAt(0).toUpperCase() : "G";
  topBar.appendChild(btn);
}
function openGmailAccountModal() {
  let m = document.getElementById("gmailModal");
  if (!m) { m = document.createElement("div"); m.id = "gmailModal"; m.style.cssText = "position:fixed;inset:0;z-index:10050;background:rgba(2,6,23,0.95);padding:16px;color:#fff;overflow-y:auto;"; document.body.appendChild(m); }
  m.style.display = "block";
  const user = JSON.parse(localStorage.getItem("mb_gmail_user") || "null");
  m.innerHTML = `<div style="max-width:440px;margin:20px auto;background:#0f172a;border:2px solid #38bdf8;border-radius:22px;padding:18px;text-align:center;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;"><b style="color:#7dd3fc;font-size:14px;">🔐 Master Book • Gmail সিঙ্ক</b><button onclick="document.getElementById('gmailModal').style.display='none'" style="width:auto;padding:4px 10px;background:#e11d48;font-size:11px;">✖</button></div>${user ? `<div style="width:60px;height:60px;border-radius:50%;background:#16a34a;color:#fff;font-size:26px;font-weight:900;display:flex;align-items:center;justify-content:center;margin:8px auto;border:3px solid #fde047;">${user.name.charAt(0).toUpperCase()}</div><h3 style="margin:4px 0;color:#fde047;">${user.name}</h3><div style="font-size:12px;color:#94a3b8;margin-bottom:12px;">${user.email} • 🟢 অটোপাইলট চালু</div><button onclick="localStorage.removeItem('mb_gmail_user');location.reload()" style="background:#e11d48;font-size:12px;">🚪 সাইন আউট</button>` : `<p style="font-size:12px;color:#cbd5e1;">আপনার Gmail ও নাম যুক্ত করুন:</p><input id="gmName" placeholder="আপনার নাম"><input id="gmEmail" type="email" placeholder="example@gmail.com"><button onclick="saveGmailUser()" style="background:linear-gradient(135deg,#16a34a,#0284c7);margin-top:10px;">✅ কানেক্ট করুন</button>`}</div>`;
}
function saveGmailUser() {
  const name = document.getElementById("gmName").value.trim(), email = document.getElementById("gmEmail").value.trim();
  if (!name || !email.includes("@")) return alert("সঠিক নাম ও Gmail দিন!");
  localStorage.setItem("mb_gmail_user", JSON.stringify({ name, email }));
  document.getElementById("gmailModal").style.display = "none";
  const old = document.getElementById("gmailBadgeBtn"); if (old) old.remove(); initGmailBadge();
}
window.addEventListener("load", () => setTimeout(initGmailBadge, 150));
