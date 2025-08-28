
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const closeBtn = document.querySelector(".close");
  const carousel = document.getElementById("carousel");

  // Open modal when a video item is clicked
  document.querySelectorAll(".carousel-item").forEach(item => {
    item.addEventListener("click", () => {
      const videoSrc = item.dataset.video;
      modalVideo.src = videoSrc;
      modal.style.display = "flex";
      modalVideo.play();
    });
  });

  // Close modal when clicking the close button
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    modalVideo.pause();
    modalVideo.currentTime = 0;
  });

  // Close modal when clicking outside the video
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      modalVideo.pause();
      modalVideo.currentTime = 0;
    }
  });

  // Carousel navigation buttons
  document.getElementById("prevBtn").addEventListener("click", () => {
    carousel.scrollBy({ left: -300, behavior: "smooth" });
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    carousel.scrollBy({ left: 300, behavior: "smooth" });
  });
});
