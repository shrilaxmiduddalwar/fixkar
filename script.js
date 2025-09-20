document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  toggle.addEventListener("click", () => {
    links.style.display = links.style.display === "flex" ? "none" : "flex";
  });

  // Download popup
  const downloadBtn = document.getElementById("downloadBtn");
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");
  downloadBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });
  window.addEventListener("click", e => {
    if (e.target === popup) popup.style.display = "none";
  });

  // Feature box hover effect JS (pulse animation)
  const features = document.querySelectorAll(".feature");
  features.forEach(f => {
    f.addEventListener("mouseenter", () => {
      f.style.transform = "scale(1.1) rotate(2deg)";
      f.style.boxShadow = "0 12px 30px rgba(0,0,0,.3)";
    });
    f.addEventListener("mouseleave", () => {
      f.style.transform = "scale(1)";
      f.style.boxShadow = "0 4px 12px rgba(0,0,0,.1)";
    });
  });
});
