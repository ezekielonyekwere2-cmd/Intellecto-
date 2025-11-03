
document.getElementById("send-btn").onclick = async () => {
  const input = document.getElementById("user-input").value;
  if (!input) return;

  const msgDiv = document.createElement("div");
  msgDiv.textContent = "You: " + input;
  document.getElementById("messages").appendChild(msgDiv);

  const res = await fetch("/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: input })
  });
  const data = await res.json();

  const aiDiv = document.createElement("div");
  aiDiv.textContent = "AI: " + data.answer;
  document.getElementById("messages").appendChild(aiDiv);

  document.getElementById("user-input").value = "";
};
