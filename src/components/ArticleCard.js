// src/components/ArticleCard.js
import React from "react";
import { Card, CardContent, Typography, Box, Link } from "@mui/material";

// ArticleCard component to render individual articles
const ArticleCard = ({ title, description, trustscore, source, sentimentanalysis, politicalalignment, articlelink, article, renderDescriptionWithNewlines }) => {
  return (
    <Box
      sx={{
        height: "100vh", // Full viewport height for each article
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        scrollSnapAlign: "start", // Snap each article to the top of the viewport
        padding: { xs: 2, md: 4 }, // Responsive padding
        boxSizing: "border-box",
      }}
    >
      <Card sx={{ width: "90%", maxWidth: "1000px", boxShadow: 4 }}> {/* Improved responsiveness */}
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {article.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {renderDescriptionWithNewlines(article.description)}
          </Typography>
          <Typography variant="subtitle2">
              <strong>Political Alignment: </strong>
              {renderDescriptionWithNewlines(article.politicalalignment)}
          </Typography>
          <Typography variant="subtitle2">
              <strong>Trust Score: </strong>
              {renderDescriptionWithNewlines(article.trustscore)}
          </Typography>
          <Typography variant="subtitle2">
              <strong>Sentiment Analysis: </strong>
              {renderDescriptionWithNewlines(article.sentimentanalysis)}
          </Typography>
          <Typography variant="subtitle2">
              <strong>Article Link: </strong>
              <Link href={article.articlelink} target="_blank" rel="noopener noreferrer" underline="always" color="primary">
                {renderDescriptionWithNewlines(article.articlelink)}
              </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ArticleCard;
