const apiKey = "......; // Your OpenRouter API key

async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");

  const userMessage = input.value;
  if (!userMessage) return;

  // Show user message
  chatLog.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
  input.value = "";

  // API call using OpenRouter
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": "https://areeba-chatbot.com", // any placeholder domain
      "X-Title": "Areeba's GPT Chatbot"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo", // You can also try "mistralai/mistral-7b-instruct"
      messages: [{ role: "user", content: userMessage }]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;

  // Show bot reply
  chatLog.innerHTML += `<p><strong>Bot:</strong> ${reply}</p>`;
  chatLog.scrollTop = chatLog.scrollHeight;
}

