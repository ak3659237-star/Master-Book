setTimeout(() => {
  map.off("click");
  map.on("click", async e => {
    const { lat, lng } = e.latlng;
    openGoogleStylePlaceCard("লোড হচ্ছে...", "আসল জায়গার তথ্য খোঁজা হচ্ছে...", lat, lng, null);
    try {
      const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=en,bn`);
      const d = await r.json();
      const title = d.name || (d.display_name ? d.display_name.split(",")[0] : "Selected Place");
      const addr = d.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      const type = (d.type || "Landmark").replace(/_/g, " ").toUpperCase();
      openGoogleStylePlaceCard(title, `${type} • Open • ${addr.slice(0, 55)}...`, lat, lng, { name: title, cat: type, lat, lng, items: [{ name: "লাইভ রাইড বুকিং", price: "₹35 থেকে" }, { name: "3D শোরুম / ভিউ", price: "দেখুন" }] });
    } catch {
      openGoogleStylePlaceCard(`Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`, "Open • লাইভ GPS স্পট", lat, lng, null);
    }
  });
}, 1100);
