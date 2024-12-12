// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import { BsChatDotsFill } from "react-icons/bs";

// const DashboardPage = () => {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [chatMessages, setChatMessages] = useState([]);
//   const [currentMessage, setCurrentMessage] = useState("");

//   const toggleChat = () => {
//     setIsChatOpen((prev) => !prev);
//   };

//   const sendMessage = async () => {
//     if (!currentMessage.trim()) return;

//     const userMessage = { sender: "user", text: currentMessage };
//     setChatMessages((prev) => [...prev, userMessage]);

//     try {
//       const response = await fetch("http://localhost:5000/query", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query: currentMessage }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         const botMessage = { sender: "bot", text: data.answer };
//         setChatMessages((prev) => [...prev, botMessage]);
//       } else {
//         const errorMessage = { sender: "bot", text: "Error: Unable to fetch response." };
//         setChatMessages((prev) => [...prev, errorMessage]);
//       }
//     } catch (error) {
//       const errorMessage = { sender: "bot", text: "Error: Unable to connect to the server." };
//       setChatMessages((prev) => [...prev, errorMessage]);
//     }

//     setCurrentMessage(""); // Clear the input field
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {/* Navbar */}
//       <Navbar />

//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <Sidebar />

//         {/* Main Content */}
//         <div className="ml-64 p-8 w-full flex justify-center items-center">
//           {/* Centered Box */}
//           <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
//             <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
//             <p className="text-xl text-gray-700 mb-6">
//               Welcome back! Here's a summary of your recent activities and procurement benchmarks.
//             </p>

//             {/* Quick Stats Section */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
//               <div className="bg-blue-100 p-6 rounded-lg shadow-md">
//                 <h2 className="text-lg font-semibold text-blue-800">Total Products</h2>
//                 <p className="text-2xl text-blue-700">120</p>
//               </div>
//               <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
//                 <h2 className="text-lg font-semibold text-yellow-800">Pending Requests</h2>
//                 <p className="text-2xl text-yellow-700">8</p>
//               </div>
//               <div className="bg-green-100 p-6 rounded-lg shadow-md">
//                 <h2 className="text-lg font-semibold text-green-800">Completed Tasks</h2>
//                 <p className="text-2xl text-green-700">45</p>
//               </div>
//             </div>

//             {/* Call to Action */}
//             <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 mt-6 w-full sm:w-auto">
//               View Benchmarking Data
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Chatbot Floating Icon */}
//       <button
//         className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
//         onClick={toggleChat}
//         aria-label="Chat with us"
//       >
//         <BsChatDotsFill size={24} />
//       </button>

//       {/* Chatbot Modal */}
//       {isChatOpen && (
//         <div className="fixed bottom-20 right-6 bg-white shadow-lg rounded-lg w-96 h-96 z-50 flex flex-col">
//           {/* Chat Header */}
//           <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2 rounded-t-lg">
//             <h2 className="text-lg font-semibold">Chat with Us</h2>
//             <button
//               className="text-white hover:text-gray-200"
//               onClick={toggleChat}
//               aria-label="Close chatbot"
//             >
//               ✖
//             </button>
//           </div>

//           {/* Chat Content */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-4">
//             {chatMessages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`p-2 rounded-lg ${
//                   message.sender === "user"
//                     ? "bg-blue-100 text-blue-900 self-end"
//                     : "bg-gray-100 text-gray-900 self-start"
//                 }`}
//               >
//                 {message.text}
//               </div>
//             ))}
//           </div>

//           {/* Input Field */}
//           <div className="p-4">
//             <input
//               type="text"
//               placeholder="Type your message..."
//               value={currentMessage}
//               onChange={(e) => setCurrentMessage(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
//             />
//             <button
//               onClick={sendMessage}
//               className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DashboardPage;

















































import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { BsChatDotsFill } from "react-icons/bs";

const DashboardPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [prompt, setPrompt] = useState(""); // State for the prompt
  const [promptResult, setPromptResult] = useState(""); // State for the API response

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage = { sender: "user", text: currentMessage };
    setChatMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: currentMessage }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage = { sender: "bot", text: data.answer };
        setChatMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage = { sender: "bot", text: "Error: Unable to fetch response." };
        setChatMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage = { sender: "bot", text: "Error: Unable to connect to the server." };
      setChatMessages((prev) => [...prev, errorMessage]);
    }

    setCurrentMessage(""); // Clear the input field
  };

  const handlePromptSubmit = async () => {
    if (!prompt.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ parse_description: prompt, dom_content: "sample content" }), // Replace with actual DOM content if needed
      });

      const data = await response.json();

      if (response.ok) {
        setPromptResult(data.parsed_result);
      } else {
        setPromptResult("Error: Unable to process the prompt.");
      }
    } catch (error) {
      setPromptResult("Error: Unable to connect to the server.");
    }

    setPrompt(""); // Clear the input field
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="ml-64 p-8 w-full flex flex-col items-center">
          {/* Centered Box */}
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl mb-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
            <p className="text-xl text-gray-700 mb-6">
              Welcome back! Here's a summary of your recent activities and procurement benchmarks.
            </p>

            {/* Quick Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-blue-800">Total Products</h2>
                <p className="text-2xl text-blue-700">120</p>
              </div>
              <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-yellow-800">Pending Requests</h2>
                <p className="text-2xl text-yellow-700">8</p>
              </div>
              <div className="bg-green-100 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-green-800">Completed Tasks</h2>
                <p className="text-2xl text-green-700">45</p>
              </div>
            </div>

            {/* Call to Action */}
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 mt-6 w-full sm:w-auto">
              View Benchmarking Data
            </button>
          </div>

          {/* Prompt Input Section */}
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Custom Prompt</h2>
            <input
              type="text"
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 mb-4"
            />
            <button
              onClick={handlePromptSubmit}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
            >
              Submit Prompt
            </button>

            {/* Display Prompt Result */}
            {promptResult && (
              console.log(promptResult),
              <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md overflow-auto">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Result:</h3>
                <pre className="text-sm text-gray-700 font-mono whitespace-pre-wrap">
                  {promptResult}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chatbot Floating Icon */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
        onClick={toggleChat}
        aria-label="Chat with us"
      >
        <BsChatDotsFill size={24} />
      </button>

      {/* Chatbot Modal */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-6 bg-white shadow-lg rounded-lg w-96 h-96 z-50 flex flex-col">
          {/* Chat Header */}
          <div className="flex justify-between items-center bg-blue-600 text-white px-4 py-2 rounded-t-lg">
            <h2 className="text-lg font-semibold">Chat with Us</h2>
            <button
              className="text-white hover:text-gray-200"
              onClick={toggleChat}
              aria-label="Close chatbot"
            >
              ✖
            </button>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-100 text-blue-900 self-end"
                    : "bg-gray-100 text-gray-900 self-start"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="p-4">
            <input
              type="text"
              placeholder="Type your message..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
