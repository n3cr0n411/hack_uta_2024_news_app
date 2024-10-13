// src/components/MainPage.js
import React, { useState, useEffect } from "react";
import { Container, AppBar, Toolbar, Button, Box } from "@mui/material";
import { getAuth } from "firebase/auth";
import { doc, collection, getDoc, getDocs } from "firebase/firestore"; // Corrected imports
import { db } from "../firebase"; // Firestore configuration
import ArticleCard from "./ArticleCard"; // Import the ArticleCard component

const MainPage = () => {
  const [interests, setInterests] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [articles, setArticles] = useState([]);
  const auth = getAuth();

  // Fetch user interests from Firestore
  useEffect(() => {
    const fetchInterests = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef); // getDoc is now properly imported
        if (docSnap.exists()) {
          const userInterests = docSnap.data().interests || [];
          setInterests(userInterests);
          if (userInterests.length > 0) {
            // Set the first interest as the default selected interest
            setSelectedInterest(userInterests[0]);
          }
        }
      }
    };

    fetchInterests();
  }, [auth]);

  // Fetch articles based on the selected interest
  useEffect(() => {
    if (selectedInterest) {
      const fetchArticles = async () => {
        const articlesRef = collection(db, "interests", selectedInterest, "articles");
        const articlesSnapshot = await getDocs(articlesRef);
        const articlesList = articlesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArticles(articlesList);
      };

      fetchArticles();
    }
  }, [selectedInterest]);

  // Function to handle interest selection from the navbar
  const handleInterestSelect = (interest) => {
    setSelectedInterest(interest);
  };

  // Function to handle rendering newlines as <br /> in JSX
  const renderDescriptionWithNewlines = (text) => {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <Box>
      {/* Static navbar at the top */}
      <AppBar position="fixed" sx={{ backgroundColor: "#333" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            {interests.length > 0 ? (
              interests.map((interest, index) => (
                <Button
                  key={index}
                  color="inherit"
                  sx={{ margin: 1 }}
                  onClick={() => handleInterestSelect(interest)}
                >
                  {interest}
                </Button>
              ))
            ) : (
              <Button color="inherit" disabled>
                Loading interests...
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main content with articles */}
      <Container
        sx={{
          display: "block", // Ensure articles stack vertically
          height: "100vh", // Full viewport height for scrolling
          overflowY: "auto", // Enable vertical scrolling
          scrollSnapType: "y mandatory", // Snap scrolling on y-axis
          padding: 0,
          margin: 0,
          width: "100%", // Full-width container
          backgroundColor: "#f5f5f5", // Background for better readability
          paddingTop: 8, // Offset content to avoid overlap with the fixed navbar
        }}
      >
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              renderDescriptionWithNewlines={renderDescriptionWithNewlines}
            />
          ))
        ) : (
          <Box sx={{ padding: 2 }}>No articles available for this interest.</Box>
        )}
      </Container>
    </Box>
  );
};

export default MainPage;
