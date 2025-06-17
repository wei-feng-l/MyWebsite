//import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


function scrollCarousel(direction) {
  const carousel = document.getElementById("carousel");
  const scrollAmount = carousel.clientWidth * direction;
  carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}
window.scrollCarousel = scrollCarousel;

function openModal(videoSrc) {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("modalVideo");
  modal.style.display = "flex";
  video.src = videoSrc;
  video.play();
}
window.openModal = openModal;

function closeModal() {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("modalVideo");
  modal.style.display = "none";
  video.pause();
  video.currentTime = 0;
  video.src = "";
}
window.closeModal = closeModal;

// Optional: close modal when clicking outside the video
function handleModalClick(event) {
  const modal = document.getElementById("videoModal");
  if (event.target === modal) {
    closeModal();
  }
}

window.handleModalClick = handleModalClick; // ⬅️ Expose it globally


