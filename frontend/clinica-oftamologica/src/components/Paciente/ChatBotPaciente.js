import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";

const ChatbotPaciente = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://localhost:8081/api/chat", {
        message: input,
      });

      const botMessage = { role: "assistant", content: response.data };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Erro ao se comunicar com a IA", error);
    }
    setInput("");
  };

  return (
    <Paper sx={{ p: 2, width: 400 }}>
      <Typography variant="h6">Chat com o Assistente</Typography>
      <Box sx={{ maxHeight: 300, overflowY: "auto", my: 2 }}>
        {messages.map((msg, index) => (
          <Typography key={index} align={msg.role === "user" ? "right" : "left"}>
            {msg.content}
          </Typography>
        ))}
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Digite sua dúvida..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button fullWidth onClick={sendMessage} variant="contained" sx={{ mt: 1 }}>
        Enviar
      </Button>
    </Paper>
  );
};

export default ChatbotPaciente;
