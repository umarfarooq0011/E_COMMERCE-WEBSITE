// chatbot.js (with debugging)

async function getProducts() {
  try {
    console.log("Attempting to fetch products...");
    const response = await fetch('/api/products.json');
    if (!response.ok) {
      console.error(`Error fetching products.json: ${response.status} ${response.statusText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products = await response.json();
    console.log("Successfully fetched products:", products);
    return products;
  } catch (error) {
    console.error("Could not fetch products:", error);
    return null;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log("Chatbot script loaded and DOM is ready.");

  const chatbotContainer = document.querySelector('.chatbot-container');
  const chatbotHeader = document.querySelector('.chatbot-header');
  const chatbotCloseBtn = document.querySelector('.chatbot-close-btn');
  const chatbotSendBtn = document.getElementById('chatbot-send');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotMessages = document.querySelector('.chatbot-messages');

  const addMessage = (message, sender = 'bot') => {
    // ... (rest of your addMessage function)
    const typingIndicator = chatbotMessages.querySelector('.typing');
    if (typingIndicator) typingIndicator.remove();
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.alignSelf = sender === 'user' ? 'flex-end' : 'flex-start';
    messageElement.style.backgroundColor = sender === 'user' ? '#dcf8c6' : '#f1f0f0';
    messageElement.style.padding = '10px';
    messageElement.style.borderRadius = '10px';
    messageElement.style.maxWidth = '80%';
    messageElement.style.wordWrap = 'break-word';
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  };

  // --- Debugging Checks ---
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  console.log("VITE_GEMINI_API_KEY:", apiKey ? "Loaded successfully." : "ERROR: API Key is not loaded or undefined.");
  if (!apiKey) {
      addMessage("I'm having a configuration issue. My API key is missing. Please notify the site administrator.", 'bot');
  }
  // -------------------------

  const products = await getProducts();
  if (!products) {
    addMessage("I'm sorry, but I'm unable to access the product catalog at the moment.", 'bot');
    return;
  }

  // ... (the rest of your chatbot logic from your original chatbot.js)
  const showTypingIndicator = () => {
    const typingIndicator = document.createElement('div');
    typingIndicator.textContent = '...';
    typingIndicator.className = 'typing';
    typingIndicator.style.alignSelf = 'flex-start';
    typingIndicator.style.backgroundColor = '#f1f0f0';
    typingIndicator.style.padding = '10px';
    typingIndicator.style.borderRadius = '10px';
    chatbotMessages.appendChild(typingIndicator);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return typingIndicator;
  };

  async function callGeminiAPI(userInput, productContext) {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const prompt = `You are a friendly sales assistant for KK Computers. Product list: ${JSON.stringify(productContext, null, 2)}. User asks: "${userInput}". Reply concisely in PKR currency.`;

    try {
      const apiResponse = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }),
      });

      if (!apiResponse.ok) {
        throw new Error(`API returned an error: ${apiResponse.statusText}`);
      }

      const result = await apiResponse.json();
      
      if (result && result.candidates && result.candidates[0] && 
          result.candidates[0].content && result.candidates[0].content.parts && 
          result.candidates[0].content.parts[0]) {
        return result.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Unexpected API response structure');
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Sorry, I'm having trouble right now. Please try again later.";
    }
  }

  const handleUserInput = async () => {
    const userInput = chatbotInput.value.trim();
    if (!userInput) return;

    addMessage(userInput, 'user');
    chatbotInput.value = '';
    const typingIndicator = showTypingIndicator();

    try {
      const botResponse = await callGeminiAPI(userInput, products);
      typingIndicator.remove();
      addMessage(botResponse);
    } catch (error) {
      console.error("Error handling user input:", error);
      typingIndicator.remove();
      addMessage("I apologize, but I'm having trouble processing your request. Please try again.");
    }
  };

  chatbotHeader.addEventListener('click', () => chatbotContainer.classList.toggle('open'));
  chatbotCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    chatbotContainer.classList.remove('open');
  });

  chatbotSendBtn.addEventListener('click', handleUserInput);
  chatbotInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') handleUserInput();
  });

  addMessage("Hello! How can I help you with our products today?");
});