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
