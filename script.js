document.addEventListener("DOMContentLoaded", function() {
  const chatBox = document.getElementById("chat-box");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-btn");
  const resetButton = document.getElementById("reset-btn");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const usernameForm = document.getElementById("username-form");
  const usernameInput = document.getElementById("username-input");
  const usernameContainer = document.getElementById("username-container");
  const changeUsernameButton = document.getElementById("change-username-btn");

  let username = localStorage.getItem("chatUsername");
  if (!username) {
    usernameContainer.style.display = "block";
  }

  usernameForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const newUsername = usernameInput.value.trim();
    if (newUsername !== username) {
      sendUsernameChangeWebhook(username, newUsername);
      username = newUsername;
      localStorage.setItem("chatUsername", username);
    }
    usernameContainer.style.display = "none";
  });

  changeUsernameButton.addEventListener("click", function() {
    localStorage.removeItem("chatUsername");
    usernameContainer.style.display = "block";
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
      messageInput.value = "";
    }
  });

  resetButton.addEventListener("click", function() {
    localStorage.removeItem("chatUsername");
    location.reload(); // Refresh the page to reset the UI
  });

  function appendMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  async function sendUsernameChangeWebhook(oldUsername, newUsername) {
    const webhookMessage = `User "${oldUsername}" changed their username to "${newUsername}"`;
    try {
      const response = await fetch("https://discord.com/api/webhooks/1215577346950701117/xPMTDhlhv8NYZmDTt1iVBaOqT_qp8Ij2M0rG3YCF-yyFmJwYaEEFAf-dnLVZFq4u7B0i", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: webhookMessage
        })
      });
      if (response.ok) {
        console.log("Username change webhook sent successfully!");
      } else {
        console.error("Failed to send username change webhook:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending username change webhook:", error);
    }
  }
});
