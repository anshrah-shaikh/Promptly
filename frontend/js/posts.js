/* =========================
   CATEGORY FILTER
========================= */

let CURRENT_FILTER = "all";

function filterCategory(cat) {
  CURRENT_FILTER = cat;
  loadPosts();
}

/* =========================
   TRENDING
========================= */

function showTrending(posts) {
  const box = document.getElementById("trending");
  if (!box) return;

  const sorted = [...posts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5);

  box.innerHTML = "";

  sorted.forEach(p => {
    const div = document.createElement("div");
    div.className = "trendCard";

    div.innerHTML = `
      <div class="userRow">
        ${renderFeedAvatar(p)}
        <h4>@${p.username || p.author}</h4>
      </div>

      <div class="postText">${p.text}</div>

      <div class="trendFooter">
        ❤️ ${p.likes}
      </div>
    `;

    box.appendChild(div);
  });
}

/* =========================
   AVATAR RENDER (FIXED)
========================= */

function renderFeedAvatar(post){

  if (!post) return `<div class="avatar">?</div>`;

  const value = post.avatar || "";
  const username = post.author || "?";

  // nothing saved
  if (!value) {
    return `<div class="avatar">${username[0]}</div>`;
  }

  // split safely
  const parts = value.split("|");
  const gradient = parts[0] || "";
  const emoji = parts[1] || "";

  // gradient + emoji
  if (gradient.startsWith("#") && emoji) {
    return `
      <div class="avatar"
        style="background:linear-gradient(135deg, ${gradient}, #000)">
        ${emoji}
      </div>
    `;
  }

  // gradient only
  if (gradient.startsWith("#")) {
    return `
      <div class="avatar"
        style="background:linear-gradient(135deg, ${gradient}, #000)">
        ${username[0]}
      </div>
    `;
  }

  // emoji only
  if (value) {
    return `<div class="avatar">${value}</div>`;
  }

  return `<div class="avatar">${username[0]}</div>`;
}

/* =========================
   LOAD POSTS
========================= */

async function loadPosts() {

  const res = await fetch(`${API}/posts`);
  const posts = await res.json();

  showTrending(posts);

  const feed = document.getElementById("feed");
  if (!feed) return;

  feed.innerHTML = "";

  posts
    .filter(p =>
      CURRENT_FILTER === "all" ||
      (p.category || "").toLowerCase() === CURRENT_FILTER
    )
    .forEach(p => {

      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <div class="userRow">
          ${renderFeedAvatar(p)}
          <h4>@${p.username || p.author}</h4>
        </div>

        <div class="postText">${p.text}</div>

        <button onclick="likePost(event,'${p._id}')">
          ❤️ ${p.likes}
        </button>

        <button onclick="toggleComments('${p._id}')">
          💬
        </button>

        <div class="commentBox" id="comments-${p._id}"></div>

        <input 
          type="text"
          placeholder="Write comment..."
          id="input-${p._id}"
          class="commentInput"
        />

        <button 
          onclick="addComment('${p._id}')"
          class="commentSubmit"
        >
          Send
        </button>
      `;

      feed.appendChild(div);
    });
}

/* =========================
   CREATE POST (FIXED)
========================= */
async function createPost() {

  const content = document.getElementById("editor").innerHTML; // ✅ FIXED
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !content.trim()) return;

  await fetch(`${API}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token")
    },
    body: JSON.stringify({
      text: content,   // ✅ HTML preserved
      author: user.username,
    })
  });

  window.location.href = "index.html"; // ✅ better UX
}

/* =========================
   LIKE
========================= */

async function likePost(e, id) {

  const btn = e.target;

  await fetch(`${API}/posts/${id}/like`, {
    method: "POST"
  });

  const count = parseInt(btn.innerText.replace("❤️", "")) || 0;
  btn.innerText = "❤️ " + (count + 1);
}

/* =========================
   COMMENTS
========================= */

async function toggleComments(postId) {

  const box = document.getElementById(`comments-${postId}`);
  const input = document.getElementById(`input-${postId}`);
  const submit = input.nextElementSibling;

  box.classList.toggle("open");
  input.classList.toggle("open");
  submit.classList.toggle("open");

  if (!box.classList.contains("open")) return;

  const res = await fetch(`${API}/comments/${postId}`);
  const comments = await res.json();

  box.innerHTML = "";

  comments.forEach(c => {
    const p = document.createElement("p");
    p.className = "commentItem";
    p.innerText = "💬 " + c.text;
    box.appendChild(p);
  });
}

async function addComment(postId) {

  const input = document.getElementById(`input-${postId}`);
  const text = input.value.trim();
  if (!text) return;

  await fetch(`${API}/comments/${postId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  input.value = "";
  toggleComments(postId);
}