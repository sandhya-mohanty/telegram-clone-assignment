import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Drawer,
  Typography,
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DrawerList from './DrawerList';
import '../assets/css/ChatList.css';

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchChats();
  }, [currentPage]);

  const fetchChats = async () => {
    try {
      const response = await axios.get(`https://devapi.beyondchats.com/api/get_all_chats?page=${currentPage}`);
      const { data, last_page } = response.data.data;
      setChats(data);
      setTotalPages(last_page);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
    onSelectChat(chatId);
  };

  const filteredChats = chats.filter(chat =>
    chat.creator.name && chat.creator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlePaginationClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="chat-list">
      <AppBar position="sticky" className="appbar">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
          <div className="search">
            <SearchIcon />
            <InputBase
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={isMenuOpen} onClose={toggleMenu}>
        <DrawerList />
      </Drawer>

      <List>
        {filteredChats.map((chat) => (
          <ListItem
            button
            key={chat.id}
            className={`chat-list-item ${chat.id === selectedChatId ? 'selected' : ''}`}
            onClick={() => handleChatSelect(chat.id)}
          >
            <ListItemText
              primary={chat.creator.name ? chat.creator.name : 'Unknown User'}
              secondary={new Date(chat.created_at).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>

      <div className="pagination">
        <Button
          onClick={() => handlePaginationClick(currentPage - 1)}
          disabled={currentPage === 1}
          startIcon={<ChevronLeftIcon />}
        />
        <Typography variant="caption">
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          onClick={() => handlePaginationClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          endIcon={<ChevronRightIcon />}
        />
      </div>
    </div>
  );
};

export default ChatList;
