// অরিজিনাল Google Maps স্টাইল ও পরিষ্কার জুম ফিরিয়ে আনা
if (typeof map !== "undefined") {
  map.eachLayer(l => { if (l._url) map.removeLayer(l); });
  const origGoogleStyle = L.tileLayer("https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", { maxZoom: 20 });
  const origSatStyle = L.tileLayer("https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", { maxZoom: 20 });
  origGoogleStyle.addTo(map);
  window.toggleLayer = function() {
    if (map.hasLayer(origGoogleStyle)) { map.removeLayer(origGoogleStyle); origSatStyle.addTo(map); }
    else { map.removeLayer(origSatStyle); origGoogleStyle.addTo(map); }
  };
  map.setView([13.0850, 77.6410], 16);
}
