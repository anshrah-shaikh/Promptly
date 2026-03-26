/* =========================
   LOAD PROFILE
========================= */

function renderAvatar(value, username) {

  if (!value) {
    return `<div class="avatarBig">${username[0]}</div>`;
  }

  // SPLIT gradient + emoji
  const parts = value.split("|");
  const gradient = parts[0];
  const emoji = parts[1];

  // BOTH gradient + emoji
  if (gradient.startsWith("#") && emoji) {
    return `
      <div class="avatarBig"
        style="background:linear-gradient(135deg, ${gradient}, #000)">
        ${emoji}
      </div>
    `;
  }

  // ONLY gradient
  if (gradient.startsWith("#")) {
    return `
      <div class="avatarBig"
        style="background:linear-gradient(135deg, ${gradient}, #000)">
        ${username[0]}
      </div>
    `;
  }

  // ONLY emoji
  return `<div class="avatarBig">${gradient}</div>`;
}

function loadProfile() {

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  const info = document.getElementById("profileInfo");
  if (!info) return;

  info.innerHTML = `
    ${renderAvatar(user.avatar, user.username)}
    <h3>@${user.username}</h3>
    <p>${user.bio || ""}</p>
  `;

  loadMyPosts();
}

/* =========================
   SAVE PROFILE
========================= */

async function saveProfile() {

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const bio = document.getElementById("bioInput").value;
  const gradient = document.getElementById("avatarInput").value;
const emoji = document.getElementById("emojiInput")?.value || "";

const avatar = emoji 
  ? `${gradient}|${emoji}` 
  : gradient;

  const res = await fetch(`${API}/users/me`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: currentUser.username,
      bio,
      avatar
    })
  });

  const updated = await res.json();

  localStorage.setItem("user", JSON.stringify(updated));

loadProfile();

// ADD THIS:
if (window.opener || document.getElementById("feed")) {
  loadPosts();
}
  
}

/* =========================
   MY POSTS
========================= */

async function loadMyPosts() {

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  const res = await fetch(`${API}/posts`);
  const posts = await res.json();

  const container = document.getElementById("myPosts");
  if (!container) return;

  container.innerHTML = "<h2>My Prompts</h2>";

  posts
    .filter(p => p.author === user.username)
    .forEach(p => {

      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <p>${p.text}</p>
        <button onclick="deletePost('${p._id}')">
          Delete
        </button>
      `;

      container.appendChild(div);
    });
}

async function deletePost(id) {

  await fetch(`${API}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": localStorage.getItem("token")
    }
  });

  loadMyPosts();
}





const gradients = [
  "#7f5cff",
  "#ff7fd4",
  "#00c6ff",
  "#f7971e",
  "#00ff87",
  "#ff4e50",
  "#8e2de2",
  "#43cea2",
  "#ff9966",
  "#c8a96a" // your premium gold
];

function loadAvatarPicker() {
  const picker = document.getElementById("avatarPicker");
  if (!picker) return;

  picker.innerHTML = "";

  gradients.forEach(color => {
    const div = document.createElement("div");
    div.className = "avatarOption";

    div.style.background = `linear-gradient(135deg, ${color}, #000)`;

    div.onclick = () => {
      document.getElementById("avatarInput").value = color;
    };

    picker.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", loadAvatarPicker);