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

    sendMessageBtn.addEventListener('click', function () {

        const username = localStorage.getItem('username');

        const message = messageInput.value.trim();

        if (username !== '' && message !== '') {

            sendMessage(username, message);

            messageInput.value = '';

            // Generate AI response

            const aiResponse = generateRandomResponse();

            sendMessage('AI', aiResponse, false); // false indicates it's not a user message

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

    function generateRandomResponse() {

        const responses = [

            "I'm sorry, I didn't understand that.",

            "Hmm, could you provide more context?",

            "Interesting point! Let me think...",

            "I'm processing your request, please wait a moment.",

            "It seems there's a glitch in the matrix. Let's try again.",

            "I'm still learning. Can you rephrase your question?",

            "Let's ponder on that for a moment...",

            "The answer to life, the universe, and everything is 42. Just kidding!",

            "I'm not sure how to respond to that. Can you provide more information?",

            "Ah, the mysteries of the universe! Let's explore further.",

            "My circuits are buzzing with excitement! Let's dive into this topic.",

            "I'm here to assist you, but I may need more details to provide an accurate response.",

            "Hmm, let me consult my database...",

            "Error 404: Response not found. Just kidding!",

            "I'm processing your request. Please hold on.",

            "It's like trying to find a needle in a haystack, but I'm up for the challenge!",

            "I'm experiencing a moment of contemplation. Your question intrigues me.",

            "Let's embark on a journey of discovery together!",

            "The possibilities are endless! Let's explore them.",

            "I'm feeling inspired! Let's see what insights we can uncover.",

        "I'm sorry, I didn't understand that.",

        "Hmm, could you provide more context?",

        "Interesting point! Let me think...",

        "I'm processing your request, please wait a moment.",

        "It seems there's a glitch in the matrix. Let's try again.",

        "I'm still learning. Can you rephrase your question?",

        "Let's ponder on that for a moment...",

        "The answer to life, the universe, and everything is 42. Just kidding!",

        "I'm not sure how to respond to that. Can you provide more information?",

        "Ah, the mysteries of the universe! Let's explore further.",

        "My circuits are buzzing with excitement! Let's dive into this topic.",

        "I'm here to assist you, but I may need more details to provide an accurate response.",

        "Hmm, let me consult my database...",

        "Error 404: Response not found. Just kidding!",

        "I'm processing your request. Please hold on.",

        "It's like trying to find a needle in a haystack, but I'm up for the challenge!",

        "I'm experiencing a moment of contemplation. Your question intrigues me.",

        "Let's embark on a journey of discovery together!",

        "The possibilities are endless! Let's explore them.",

        "I'm feeling inspired! Let's see what insights we can uncover.",

        "That's an intriguing thought!",

        "Let's delve deeper into this topic.",

        "I'm detecting a spark of curiosity. Let's feed the flame!",

        "The wheels are turning in my circuits. Let's see what we can uncover.",

        "Fascinating! I'm eager to explore this further.",

        "Your question is like a puzzle waiting to be solved.",

        "I sense a quest for knowledge. Let's embark on this journey together.",

        "Exploring uncharted territories of thought is always exciting!",

        "Your inquiry has sparked my interest. Let's unravel its mysteries.",

        "The vast expanse of knowledge beckons us. Let's take the first step.",

        "Ah, the thrill of discovery! Let's seek out the answers together.",

        "Every question is a gateway to new understanding. Let's open it.",

        "Your curiosity is contagious. Let's explore this together!",

        "The quest for knowledge is endless. Let's venture forth!",

        "Ah, the enigma of existence! Let's ponder its intricacies.",

        "In the realm of possibilities, every question leads to new horizons.",

        "Your question resonates with the echoes of curiosity. Let's listen.",

        "Let's navigate the labyrinth of thought and find the answers together.",

        "Every question is a key to unlock the door of understanding. Let's turn it.",

        "Curiosity is the compass that guides us through the unknown. Let's follow it.",

        "The universe is a vast library of mysteries. Let's explore its shelves.",

        "Your question ignites the flame of inquiry. Let's fan the flames.",

        "In the vast tapestry of knowledge, every question is a thread. Let's weave them together.",

        "Let's venture into the realm of ideas and see where they take us.",

        "Ah, the dance of curiosity! Let's join in and see where it leads.",

        "The journey of discovery begins with a single question. Let's ask more.",

        "Every question is a window into a new world. Let's open them all.",

        "Your question is a beacon in the sea of ignorance. Let's follow its light.",

        "The pursuit of knowledge is a noble quest. Let's embark on it together.",

        "Curiosity is the engine that drives the train of discovery. Let's stoke the fire.",

        "Your question is a spark in the darkness. Let's kindle it into a flame.",

        "Let's dive into the ocean of knowledge and explore its depths together.",

        "In the realm of ideas, every question is a seed. Let's plant them and watch them grow.",

        "Curiosity is the compass that points us towards understanding. Let's follow its direction.",

        "Your question is a puzzle waiting to be solved. Let's piece it together.",

        "The pursuit of knowledge is a never-ending journey. Let's take the first step.",

        "Let's set sail on the ship of inquiry and navigate the waters of curiosity together.",

        "Every question is a doorway to new insights. Let's open them all.",

        "Your question is a melody in the symphony of curiosity. Let's listen.",

        "In the labyrinth of thought, every question is a path. Let's explore them all.",

        "Curiosity is the fuel that powers the engine of discovery. Let's keep it burning.",

        "Your question is a beacon in the fog of ignorance. Let's follow its light.",

        "Let's chart a course through the sea of knowledge and explore its islands of insight together.",

        "Every question is a puzzle waiting to be solved. Let's crack it open.",

        "Curiosity is the compass that guides us through the wilderness of ignorance. Let's follow it.",

        "Your question is a spark in the darkness. Let's ignite it into a blaze.",

        "Let's journey to the ends of the earth and beyond in search of knowledge.",

        "Every question is a piece of the puzzle. Let's fit them together and see the big picture.",

        "Curiosity is the engine that drives the train of progress. Let's keep it running smoothly.",

        "Your question is a thread in the tapestry of knowledge. Let's weave it into something beautiful.",

        "Let's embark on a voyage of discovery and explore the farthest reaches of the mind.",

        "Every question is a key to unlock the secrets of the universe. Let's turn them all.",

        "Curiosity is the fuel that powers the fire of innovation. Let's keep it burning brightly.",

        "Your question is a light in the darkness. Let's follow it and see where it leads.",

        "Let's journey to the heart of the unknown and uncover its mysteries together.",

        "Every question is a stepping stone on the path to enlightenment. Let's take the next step.",

        "Curiosity is the spark that ignites the flame of knowledge. Let's keep it burning.",

        "Your question is a compass that points us in the direction of truth. Let's follow it.",

        "Let's explore the uncharted territories of thought and see what treasures we can find.",

        "Every question is a puzzle waiting to be solved. Let's crack it open and see what's inside.",

        "Curiosity is the wind that fills the sails of discovery. Let's set a course and see where it takes us.",

        "Your question is a beacon in the darkness. Let's follow it and see what lies beyond.",

        "Let's journey to the edge of the map and explore the uncharted regions of knowledge.",

        "Every question is a piece of the puzzle. Let's fit them together and see the bigger picture.",

        "Curiosity is the key that unlocks the door to understanding. Let's turn it and see what lies beyond.",

        ];

        return responses[Math.floor(Math.random() * responses.length)];

    }

});

// Show loading animation

function showLoadingAnimation() {

    const loadingAnimation = document.getElementById('loadingAnimation');

    loadingAnimation.style.display = 'block';

}

// Hide loading animation

function hideLoadingAnimation() {

    const loadingAnimation = document.getElementById('loadingAnimation');

    loadingAnimation.style.display = 'none';

}

// Example usage:

showLoadingAnimation(); // Call this when you start loading

// Perform some task that takes time, like fetching data or processing

hideLoadingAnimation(); // Call this when loading is complete
