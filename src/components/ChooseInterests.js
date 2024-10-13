import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // Firebase config & Firestore

const topics = [
  "Humanitarian", "Feminism", "Visas", "Statistics", "Disaster",
  "Issues", "Motherhood", "Terrorism", "Events", "Law"
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
        const user = auth.currentUser;  // Get the currently authenticated user

        if (user) {
          // Save selected topics to Firestore using the user's UID
          const userRef = doc(db, "users", user.uid);  // Use the user's UID as the document ID
          await setDoc(userRef, {
            interests: selectedTopics,  // Save the selected interests
            updatedAt: new Date(),      // Optionally, add an update timestamp
          }, { merge: true });          // Merge this data with existing data

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
