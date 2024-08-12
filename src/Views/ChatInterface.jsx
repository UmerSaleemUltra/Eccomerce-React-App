import React, { useState, useEffect } from "react";
import { db, auth, storage } from "../Config/Firebase"; // Adjust the import path as necessary
import { collection, addDoc, onSnapshot, query, orderBy, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Box, Paper, Typography, TextField, Button, IconButton, Dialog } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const UserChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const q = query(
        collection(db, "chatRooms", user.uid, "messages"),
        orderBy("timestamp")
      );
      const unsubscribeMessages = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
      });

      return () => unsubscribeMessages();
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to send messages");
      return;
    }

    let fileURL = null;
    if (file) {
      const fileRef = ref(storage, `chat_files/${file.name}`);
      await uploadBytes(fileRef, file);
      fileURL = await getDownloadURL(fileRef);
    }

    if (input.trim() === "" && !fileURL) {
      return;
    }

    await addDoc(collection(db, "chatRooms", user.uid, "messages"), {
      text: input,
      fileURL,
      fileName: file ? file.name : null,
      userId: user.uid,
      userName: user.email,
      timestamp: new Date(),
      sender: "user",
    });

    setInput("");
    setFile(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#1976d2',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
          borderRadius: '50%',
          padding: '15px',
          zIndex: 1000,
        }}
      >
        <ChatIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Box sx={{ display: "flex", flexDirection: "column", height: "80vh" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2, borderBottom: "1px solid #ddd" }}>
            <Typography variant="h6">Chat</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, overflowY: "auto", padding: 2 }}>
            {messages.map(({ id, data }) => (
              <Box
                key={id}
                sx={{
                  display: "flex",
                  justifyContent: data.userId === auth.currentUser?.uid ? "flex-end" : "flex-start",
                  marginBottom: 2,
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: 1.5,
                    backgroundColor: data.sender === "admin" ? "#ffe082" : "#bbdefb",
                    borderRadius: "15px",
                    maxWidth: "70%",
                    wordWrap: "break-word",
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    {data.userName}
                  </Typography>
                  {data.fileURL ? (
                    <a href={data.fileURL} target="_blank" rel="noopener noreferrer">
                      {data.fileName}
                    </a>
                  ) : (
                    <Typography variant="body1">{data.text}</Typography>
                  )}
                </Paper>
              </Box>
            ))}
          </Box>
          <Box
            component="form"
            onSubmit={sendMessage}
            sx={{
              display: "flex",
              padding: 2,
              borderTop: "1px solid #ccc",
              backgroundColor: "#fff",
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{
                marginRight: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              }}
            />
            <input
              accept="image/*,application/pdf"
              style={{ display: 'none' }}
              id="file-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <IconButton component="span" sx={{ marginRight: 2 }}>
                <AttachFileIcon />
              </IconButton>
            </label>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                borderRadius: "15px",
                padding: "8px 16px",
                textTransform: "none",
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
};

export default UserChat;
