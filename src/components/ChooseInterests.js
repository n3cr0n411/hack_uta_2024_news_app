import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // Your Firebase configuration

const topics = [
  "Technology", "Health", "Science", "Business", "Sports",
  "Education", "Politics", "Entertainment", "Environment", "Travel"
];

const ChooseInterests = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleTopicClick = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else if (selectedTopics.length < 5) {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSubmit = async () => {
    if (selectedTopics.length === 0) {
      alert("Please select at least one topic.");
    } else {
      try {
        const user = auth.currentUser;

        if (user) {
          // Save selected topics to Firestore
          const userRef = doc(db, "users", user.uid);
          await setDoc(userRef, { interests: selectedTopics }, { merge: true });

          console.log("Interests saved successfully");
          navigate("/main");  // Navigate to the main page after submission
        } else {
          alert("No user is signed in");
        }
      } catch (error) {
        console.error("Error saving interests: ", error);
      }
    }
  };

  return (
    <Box sx={{ padding: 3, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Choose up to 5 Interests
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2 }}>
        {topics.map((topic) => (
          <Button
            key={topic}
            variant={selectedTopics.includes(topic) ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleTopicClick(topic)}
            disabled={!selectedTopics.includes(topic) && selectedTopics.length >= 5}
          >
            {topic}
          </Button>
        ))}
      </Box>
      <Button
        variant="contained"
        color="secondary"
        sx={{ marginTop: 3 }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ChooseInterests;
