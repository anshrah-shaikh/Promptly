/* =========================
   CATEGORY FILTER
========================= */

let CURRENT_FILTER = "all";

function filterCategory(cat) {
  CURRENT_FILTER = cat;
  loadPosts();
}

/* =========================
   TRENDING SECTION
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
      <p>${p.text}</p>
      <small>❤️ ${p.likes}</small>
    `;
    box.appendChild(div);
  });
}

/* =========================
   LOAD POSTS
========================= */

function renderFeedAvatar(author){

  const currentUser = JSON.parse(localStorage.getItem("user"));

  if(currentUser && currentUser.username === author){

    if(!currentUser.avatar){
      return `<div class="avatar">${author[0]}</div>`;
    }

    if(currentUser.avatar.startsWith("#")){
      return `
        <div class="avatar"
          style="background:linear-gradient(135deg, ${currentUser.avatar}, #000)">
          ${author[0]}
        </div>
      `;
    }

    return `<div class="avatar">${currentUser.avatar}</div>`;
  }

  return `<div class="avatar">${author[0]}</div>`;
}



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
          ${renderFeedAvatar(p.author)}
          <h4>@${p.author || "anonymous"}</h4>
        </div>

        <p>${p.text}</p>

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
   CREATE POST
========================= */

async function createPost() {

  const text = document.getElementById("promptText").value;
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return;

  await fetch(`${API}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token")
    },
    body: JSON.stringify({
      text,
      author: user.username
    })
  });

  document.getElementById("promptText").value = "";
  loadPosts();
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