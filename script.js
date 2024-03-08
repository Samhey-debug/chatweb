document.addEventListener("DOMContentLoaded", function() {
  const chatBox = document.getElementById("chat-box");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-btn");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const usernameForm = document.getElementById("username-form");
  const usernameInput = document.getElementById("username-input");
  const usernameContainer = document.getElementById("username-container");

  let username = localStorage.getItem("chatUsername");
  if (!username) {
    usernameContainer.style.display = "block";
  }

  usernameForm.addEventListener("submit", function(event) {
    event.preventDefault();
    username = usernameInput.value.trim();
    localStorage.setItem("chatUsername", username);
    usernameContainer.style.display = "none";
  });

  let mode = localStorage.getItem("chatMode");
  if (!mode) {
    mode = "light";
  }
  applyMode(mode);

  darkModeToggle.addEventListener("click", function() {
    mode = mode === "light" ? "dark" : "light";
    applyMode(mode);
    localStorage.setItem("chatMode", mode);
  });

  function applyMode(mode) {
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(mode + "-mode");
  }

  sendButton.addEventListener("click", function() {
    const message = messageInput.value.trim();
    if (message !== "") {
      appendMessage(username + ": " + message);
      saveMessage(username + ": " + message);
      messageInput.value = "";
    }
  });

  function appendMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function saveMessage(message) {
    const savedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    savedMessages.push(message);
    localStorage.setItem("chatMessages", JSON.stringify(savedMessages));
  }

  // Load messages from localStorage
  const savedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
  savedMessages.forEach(message => appendMessage(message));
});
