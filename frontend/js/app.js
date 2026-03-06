console.log("APP INITIALIZED");

/* =========================
   GLOBAL CONFIG
========================= */
const API = "http://localhost:5000/api";

/* =========================
   PAGE PROTECTION
========================= */
function protectPage() {
  const token = localStorage.getItem("token");

  if (
    window.location.pathname.includes("index.html") &&
    !token
  ) {
    window.location.href = "login.html";
  }
}

/* =========================
   INITIAL LOAD
========================= */
document.addEventListener("DOMContentLoaded", () => {

  protectPage();

  // Load feed only if feed exists
  if (document.getElementById("feed")) {
    loadPosts();
  }

  // Load profile only if profile page
  if (window.location.pathname.includes("profile.html")) {
    loadProfile();
  }

});