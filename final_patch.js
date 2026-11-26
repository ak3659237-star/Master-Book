setTimeout(() => {
  shops.forEach(addPin);
  if (typeof renderBottomCard === "function") renderBottomCard(activeShop);
  const satBtn = document.getElementById("satBtn");
  if (satBtn) satBtn.click(), setTimeout(() => satBtn.click(), 100);
}, 500);
