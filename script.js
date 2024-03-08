document.addEventListener('DOMContentLoaded', function () {

    const modeSwitch = document.getElementById('modeSwitch');
    const chatContainer = document.getElementById('chatContainer');
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    const resetChatBtn = document.getElementById('resetChat');
    const usernameModal = document.getElementById('usernameModal');
    const setUsernameBtn = document.getElementById('setUsername');
    const usernameInputModal = document.getElementById('usernameInputModal');
    const resetChatConfirmModal = document.getElementById('resetChatConfirmModal');
    const resetChatConfirmBtn = document.getElementById('resetChatConfirm');
    const cancelResetChatBtn = document.getElementById('cancelResetChat');

    // Load messages from localStorage when the page loads
    const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    savedMessages.forEach(message => {
        appendMessage(message);
    });

    modeSwitch.addEventListener('change', function () {
        document.body.classList.toggle('dark-mode');
        chatContainer.classList.toggle('dark-mode'); // Apply dark mode to chat container as well
    });

    // Show username modal when the page loads if username is not set
    if (!localStorage.getItem('username')) {
        usernameModal.style.display = 'block';
    }

    setUsernameBtn.addEventListener('click', function () {
        const username = usernameInputModal.value.trim();
        if (username !== '') {
            localStorage.setItem('username', username);
            usernameModal.style.display = 'none';
        }
    });

    sendMessageBtn.addEventListener('click', async function () {
        const username = localStorage.getItem('username');
        const message = messageInput.value.trim();
        if (username !== '' && message !== '') {
            sendMessage(username, message);
            messageInput.value = '';
            // Fetch response from BrainShop API
            try {
                const aiResponse = await getResponseFromBrainShopAPI(message);
                sendMessage('AI', aiResponse, false); // false indicates it's not a user message
            } catch (error) {
                console.error('Error fetching AI response:', error);
                sendMessage('AI', 'Error fetching AI response. Please try again later.', false);
            }
        }
    });

    resetChatBtn.addEventListener('click', function () {
        // Show reset chat confirmation modal
        resetChatConfirmModal.style.display = 'block';
    });

    resetChatConfirmBtn.addEventListener('click', function () {
        // Reset chat
        chatMessages.innerHTML = '';
        // Clear messages from localStorage
        localStorage.removeItem('chatMessages');
        // Close reset chat confirmation modal
        resetChatConfirmModal.style.display = 'none';
    });

    cancelResetChatBtn.addEventListener('click', function () {
        // Close reset chat confirmation modal
        resetChatConfirmModal.style.display = 'none';
    });

    function sendMessage(username, message, isUser = true) {
        const formattedMessage = isUser ? `${username}: ${message}` : `AI: ${message}`;
        appendMessage(formattedMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        // Save message locally
        saveMessage(formattedMessage);
    }

    function appendMessage(message) {
        const newMessage = document.createElement('div');
        newMessage.classList.add('message');
        newMessage.textContent = message;
        chatMessages.appendChild(newMessage);
    }

    function saveMessage(message) {
        const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        savedMessages.push(message);
        localStorage.setItem('chatMessages', JSON.stringify(savedMessages));
    }

    async function getResponseFromBrainShopAPI(message) {
        const apiKey = 'GEzYwPY6O4mUv2Vw';
        const brainShopURL = `http://api.brainshop.ai/get?bid=180030&key=${apiKey}&uid=0&msg=${encodeURIComponent(message)}`;
        try {
            const response = await fetch(brainShopURL);
            const data = await response.json();
            return data.cnt;
        } catch (error) {
            throw new Error('Error fetching data from BrainShop API: ' + error.message);
        }
    }

});
