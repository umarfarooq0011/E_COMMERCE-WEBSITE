// chatbot.js
import products from './api/products.json';

document.addEventListener('DOMContentLoaded', () => {
    const chatbotSendBtn = document.getElementById('chatbot-send');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.querySelector('.chatbot-messages');

    const addMessage = (message, sender = 'bot') => {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.style.alignSelf = sender === 'user' ? 'flex-end' : 'flex-start';
        messageElement.style.backgroundColor = sender === 'user' ? '#dcf8c6' : '#f1f0f0';
        messageElement.style.padding = '10px';
        messageElement.style.borderRadius = '10px';
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    const handleUserInput = () => {
        const userInput = chatbotInput.value.trim().toLowerCase();
        if (!userInput) return;

        addMessage(userInput, 'user');
        chatbotInput.value = '';

        let botResponse = "I'm sorry, I don't have information about that. Please ask me about our products!";

        const foundProduct = products.find(product => userInput.includes(product.name.toLowerCase()));

        if (foundProduct) {
            botResponse = `Yes, we have the ${foundProduct.name}! It costs ₨${foundProduct.price} and we have ${foundProduct.stock} in stock. You can find it on our products page!`;
        }

        setTimeout(() => {
            addMessage(botResponse);
        }, 500);
    };

    chatbotSendBtn.addEventListener('click', handleUserInput);
    chatbotInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            handleUserInput();
        }
    });

    addMessage("Hello! How can I help you with our products today?");
});
