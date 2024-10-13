// src/components/MainPage.js
import React from "react";
import { Card, CardContent, Typography, Box, Container } from "@mui/material";

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
      }}
    >
      {/* Map over articles and render each one */}
      {sampleArticles.map((article) => (
        <Box
          key={article.id}
          sx={{
            height: "100vh", // Full viewport height per article
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scrollSnapAlign: "start", // Snap each article to the top of the viewport
            padding: 3,
          }}
        >
          <Card sx={{ width: "80%", boxShadow: 3 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {renderDescriptionWithNewlines(article.description)}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Container>
  );
};

export default MainPage;
