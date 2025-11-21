async function loadTracking(orderId) {
  try {
    const res = await fetch(`/data/track-${orderId || 'sample'}.json`);
    if (!res.ok) throw new Error("Tracking data not found");

    const data = await res.json();

    // ETA
    if (data.eta) {
      document.getElementById("eta").textContent = data.eta;
    }

    // Show partner card
    const partnerCard = document.getElementById("delivery-partner");
    partnerCard.style.display = "flex";

    // Photo
    if (data.partner?.photo) {
      const photoEl = document.getElementById("partner-photo");
      photoEl.src = data.partner.photo;
      photoEl.style.display = "block";
    }

    // Name
    if (data.partner?.name) {
      document.getElementById("partner-name").textContent = data.partner.name;
    }

    // Rating (simple placeholder, later we add partial stars)
    if (data.partner?.rating) {
      document.getElementById("partner-rating").textContent = `⭐ ${data.partner.rating}`;
    }

    // Meta
    if (data.partner?.meta) {
      document.getElementById("partner-meta").textContent = data.partner.meta;
    }

  } catch (err) {
    console.error("Tracking load error:", err);
  }
}
// Smooth Page Slide Transition (ultra smooth)