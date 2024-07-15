import React, { useState } from 'react';
import { Container, Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import ChatList from './components/ChatList';
import MessageList from './components/MessageList';
import './App.css';

function App() {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
  };

  const handleBackToChatList = () => {
    setSelectedChatId(null);
  };

  return (
    <Container maxWidth="xl" className="app-container">
      <Grid container className="app-grid">
        {isMobile && selectedChatId !== null && (
          <Box className="back-to-chat-list" onClick={handleBackToChatList}>
            &larr; Back
          </Box>
        )}
        {(!isMobile || (isMobile && selectedChatId === null)) && (
          <Grid item xs={12} md={4} lg={3} className="chat-list">
            <ChatList onSelectChat={handleChatSelect} />
          </Grid>
        )}
        {(!isMobile || (isMobile && selectedChatId !== null)) && (
          <Grid item xs={12} md={8} lg={9} className="message-list">
            {selectedChatId ? (
              <MessageList chatId={selectedChatId} />
            ) : (
              <Box px={5} textAlign="center" className="select-chat-message">
                Select a chat to view messages
              </Box>
            )}
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default App;
