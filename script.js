
const API_URL = "https://jarvis-telugu-ai.machhalakshmiprasanna-58a.workers.dev/chat";

const chat = document.getElementById("chat");
const input = document.getElementById("msg");
const network = document.getElementById("network");
const form = document.getElementById("chat-form");

function add(text, who) {
  const d = document.createElement("div");
  d.className = "msg " + who;
  d.textContent = text;
  chat.appendChild(d);
  chat.scrollTop = chat.scrollHeight;
  return d;
}

let processing = false;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (processing) return;

  const message = input.value.trim();
  if (!message) return;

  add("YOU: " + message, "user");
  input.value = "";

  const pending = add(
    "J.A.R.V.I.S: Processing...",
    "ai"
  );

  processing = true;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.reason || data.error || "AI request failed"
      );
    }

    pending.textContent =
      "J.A.R.V.I.S: " +
      (data.reply || "సమాధానం అందలేదు.");

  } catch (error) {
    console.error("JARVIS error:", error);

    pending.textContent =
      "J.A.R.V.I.S: కనెక్షన్ సమస్య వచ్చింది. " +
      "దయచేసి మళ్లీ ప్రయత్నించండి.";
  } finally {
    processing = false;
    chat.scrollTop = chat.scrollHeight;
  }
});

function updateNetwork() {
  const online = navigator.onLine;

  network.textContent = online
    ? "● ONLINE"
    : "● OFFLINE";

  network.className = online ? "on" : "off";
}

window.addEventListener("online", updateNetwork);
window.addEventListener("offline", updateNetwork);

updateNetwork();
