import React, { useState } from "react";
import axios from "axios";

// 📌 Course Data (Dummy ASU Course Registration Data)
const courseData = {
    "SER 501": { days: "Tues & Thurs", time: "9:00am - 10:15am", campus: "Poly Campus", professor: "Dr. Bansal" },
    "SER 502": { days: "Tues & Thurs", time: "10:30am - 11:45am", campus: "Poly Campus", professor: "Dr. Bansal" },
    "SER 515": { days: "Tues & Thurs", time: "12:00pm - 1:15pm", campus: "Poly Campus", professor: "Dr. Gary" },
    "SER 531": { days: "Tues & Thurs", time: "1:30pm - 2:45pm", campus: "Poly Campus", professor: "Dr. Yu" },
    "SER 565": { days: "Thursday", time: "3:00pm - 4:15pm", campus: "Tempe Campus", professor: "Dr. Tuzman" },
    "SER 566": { days: "Wednesday", time: "9:00am - 10:15am", campus: "Tempe Campus", professor: "Dr. Colofello" }
};

function Chatbot() {
    const [input, setInput] = useState("");  
    const [messages, setMessages] = useState([]);  

    // Function to send user query to Gemini API with course context
    const sendMessage = async () => {
        if (!input.trim()) return;
    
        const userMessage = { user: "You", text: input };
        setMessages([...messages, userMessage]);
    
        try {
            const courseInfo = Object.entries(courseData)
                .map(([course, details]) => 
                    `${course}: ${details.days} at ${details.time}, ${details.campus}, taught by ${details.professor}`
                )
                .join("\n");
    
            // Corrected API Request
            const response = await axios.post(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite-preview:generateContent?key=<key>",
                {
                    contents: [
                        { parts: [{ text: `Here is the ASU course schedule:\n${courseInfo}\n\nUser query: ${input}` }] }
                    ]
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
    
            const botText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "❌ No response from AI.";
            const botMessage = { user: "Bot", text: botText };
    
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            console.error("Gemini API Error:", error.response ? error.response.data : error.message);
            setMessages([...messages, userMessage, { user: "Bot", text: "❌ Error: Cannot connect to AI." }]);
        }
    
        setInput("");
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>📚 ASU Course Chatbot (Powered by Gemini 2.0)</h2>

            <div style={styles.chatbox}>
                {messages.map((msg, index) => (
                    <div key={index} style={msg.user === "You" ? styles.userMessageContainer : styles.botMessageContainer}>
                        <strong style={msg.user === "You" ? styles.userLabelRight : styles.userLabelLeft}>
                            {msg.user}:
                        </strong>
                        <span style={msg.user === "You" ? styles.userMessage : styles.botMessage}>
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>

            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about courses, professors, or campuses..."
                    style={styles.input}
                />
                <button onClick={sendMessage} style={styles.button}>Send</button>
            </div>
        </div>
    );
}

// Styling remains the same
const styles = { 
    container: { width: "500px", margin: "auto", textAlign: "center", fontFamily: "Arial, sans-serif" },
    header: { backgroundColor: "#4B0082", color: "white", padding: "10px", borderRadius: "5px" },
    chatbox: { height: "350px", overflowY: "scroll", border: "2px solid #4B0082", padding: "10px", marginBottom: "10px", backgroundColor: "#f9f9f9" },

    userMessageContainer: { display: "flex", flexDirection: "column", alignItems: "flex-end", marginBottom: "8px" },
    botMessageContainer: { display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "8px" },

    userLabelRight: { color: "#4B0082", fontWeight: "bold", textAlign: "right", marginBottom: "3px" },
    userLabelLeft: { color: "#008000", fontWeight: "bold", textAlign: "left", marginBottom: "3px" },

    userMessage: { backgroundColor: "#E6E6FA", padding: "8px", borderRadius: "8px", display: "inline-block", maxWidth: "70%", textAlign: "left" },
    botMessage: { backgroundColor: "#DFF2BF", padding: "8px", borderRadius: "8px", display: "inline-block", maxWidth: "70%", textAlign: "left" },

    inputContainer: { display: "flex", justifyContent: "space-between" },
    input: { width: "75%", padding: "8px", borderRadius: "5px", border: "1px solid #4B0082" },
    button: { width: "20%", backgroundColor: "#4B0082", color: "white", border: "none", cursor: "pointer", padding: "8px", borderRadius: "5px" }
};

export default Chatbot;
