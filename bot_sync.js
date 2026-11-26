fetch("deals.json?t=" + Date.now()).then(r => r.json()).then(list => {
  if (Array.isArray(list) && list.length && typeof shops !== "undefined") {
    list.forEach(d => shops[0].items.unshift({ name: d.name, price: d.price, numPrice: 299, url: d.url, icon: "🤖", color: "#2563eb" }));
    if (typeof renderBottomCard === "function") renderBottomCard(activeShop);
  }
}).catch(() => {});
