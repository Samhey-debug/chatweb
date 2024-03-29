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
            try {
                const aiResponse = await getResponseFromBrainShopAPI(message);
                sendMessage('AI', aiResponse, false); // false indicates it's not a user message
            } catch (error) {
                console.error('Error fetching AI response:', error);
                const predefinedResponses = [
                    'Hello!',
                    'How can I assist you?',
                    'Nice to meet you!',
                    'What can I do for you today?',
                    'Greetings!',
                    'I am here to help.',
                    'Hello there!',
                    'How may I be of service?',
                    'Welcome!',
                    'Good day!',
                    'Howdy!',
                    'What brings you here?',
                    'Hi there!',
                    'Pleasure to meet you!',
                    'Hey!',
                    'How are you doing?',
                    'Salutations!',
                    'Greetings and salutations!',
                    'Good to see you!',
                    'Hey there!',
                    'Nice to see you!',
                    'How’s it going?',
                    'Yo!',
                    'Hey, what’s up?',
                    'Hey, how’s everything?',
                    'What’s new?',
                    'What’s happening?',
                    'How’s life?',
                    'How’s your day?',
                    'How’s everything going?',
                    'How’s your day going?',
                    'How’s everything been?',
                    'How have you been?',
                    'What’s good?',
                    'What’s happening?',
                    'What’s going on?',
                    'How’s everything?',
                    'How’s your day?',
                    'How are things?',
                    'How’s it going?',
                    'How are you doing?',
                    'How’s life?',
                    'How have you been?',
                    'What’s new?',
                    'What’s happening?',
                    'What’s going on?',
                    'How’s everything?',
                    'How’s your day?',
                    'How are things?',
                    'How are you doing?',
                    'How’s life?',
                    'How have you been?',
                    'What’s new?',
                    'What’s happening?',
                    'What’s going on?',
                    'How’s everything?',
                    'How’s your day?',
                    'How are things?',
                    'How are you doing?',
                    'How’s life?',
                    'How have you been?',
                    'What’s new?',
                    'What’s happening?',
                    'What’s going on?',
                    'How’s everything?',
                    'How’s your day?',
                    'How are things?',
                    'How are you doing?',
                    'How’s life?',
                    'How have you been?',
                    'What’s new?',
                    'What’s happening?',
                    'What’s going on?',
                    'How’s everything?',
                    'How’s your day?',
                    'How are things?',
                    'How are you doing?',
                    'How’s life?',
                    'How have you been?',
                    'What’s new?',
                    'What’s happening?',
                    'What’s going on?',
                    'How’s everything?',
                    'How’s your day?',
                    'How are things?',
                    'How are you doing?',
                    'How’s life?',
                    'How have you been?',
                    'What’s new?',
                    'What’s happening?',
                    'What’s going on?',
                    'How’s everything?',
                    'How’s your day?',
                    'How are things?'
                ];
                const randomIndex = Math.floor(Math.random() * predefinedResponses.length);
                const predefinedResponse = predefinedResponses[randomIndex];
                sendMessage('AI', predefinedResponse, false);
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
        const response = await fetch(brainShopURL);
        if (!response.ok) {
            throw new Error('Failed to fetch response from BrainShop API');
        }
        const data = await response.json();
        return data.cnt;
    }

});
