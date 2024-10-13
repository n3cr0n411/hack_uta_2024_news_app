// src/components/MainPage.js
import React from "react";
import { Container } from "@mui/material";
import ArticleCard from "./ArticleCard"; // Import the new ArticleCard component

const MainPage = () => {
  // Sample data for articles
  const sampleArticles = [
    {
      id: 1,
      title: "Ukraine: Angry Zelensky vows to punish Russian atrocities",
      description: "Description: The Ukrainian president says the country will not forgive or forget those who murder its civilians. \n\nGemini Response: President Zelensky vowed to punish Russian troops for atrocities in Ukraine, accusing them of deliberately targeting civilians. Ukrainian officials report attacks on civilian targets, including hospitals and schools, resulting in numerous casualties and hindering evacuations. Although Russia denies these allegations, the UN confirms over 364 civilian deaths. Zelensky condemned the attacks and criticized Western governments for not taking stronger action.\n\nTrust score: 9\nSource: BBC\nSentiment analysis: Negative\nPolitical alignment: Neutral.",
    },
    {
      id: 2,
      title: "Article Title 2",
      description: "This is another sample description \nfor article 2. Here is more text.",
    },
    {
      id: 3,
      title: "Article Title 3",
      description: "This is a multiline description \nfor article 3. It also spans\n multiple lines.",
    },
    {
      id: 4,
      title: "Article Title 4",
      description: "This is another sample description for article 4.",
    },
    {
      id: 5,
      title: "Article Title 5",
      description: "This is another sample description for article 5.",
    },
  ];

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
      }}
    >
      {/* Map over articles and render each one using ArticleCard */}
      {sampleArticles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          renderDescriptionWithNewlines={renderDescriptionWithNewlines}
        />
      ))}
    </Container>
  );
};

export default MainPage;
