import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import '../assets/css/MessageList.css';

const MessageList = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`);
        setMessages(response.data.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [chatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
   
  };

  return (
    <Box className="message-container">
      <List className="message-list">
        {messages.map((message) => (
          <ListItem key={message.id} className={message.sender_id === 1 ? 'message-item beyondchat' : 'message-item user'}>
            <ListItemText 
              primary={message.message} 
              secondary={
                <Typography variant="caption" className="message-details">
                  {message.sender.name} • {new Date(message.updated_at).toLocaleString()}
                </Typography>
              } 
            />
          </ListItem>
        ))}
      </List>
      <Box className="message-input-container">
        <form onSubmit={handleSendMessage} className="message-input">
          <TextField 
            fullWidth 
            label="Type a message" 
            variant="outlined" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            <SendIcon />
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default MessageList;
