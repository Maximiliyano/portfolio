import { useEffect, useState } from 'react';

function App() {
  // State = data coming from backend
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Runs once when page loads
  useEffect(() => {
    fetch("http://localhost:5212/api/messages")
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  // Add a message
  const addMessage = () => {
    if (!input.trim()) return; // don't allow empty messages

    fetch("http://localhost:5212/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    })
      .then(res => res.json())
      .then(msg => setMessages([...messages, msg]));
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        React + .NET + SQLite Demo
      </h1>

      <div className="flex mb-4">
        <input
          className="border border-gray-300 rounded-l px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="New message"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          onClick={addMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r transition-colors"
        >
          Add
        </button>
      </div>

      <ul className="w-80 bg-white rounded shadow p-4 space-y-2">
        {messages.map(msg => (
          <li
            key={msg.id}
            className="bg-gray-50 border border-gray-200 rounded px-3 py-2"
          >
            {msg.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App

interface Message {
  id: number;
  text: string;
}

interface Response {
  message: string;
  time: string;
}
