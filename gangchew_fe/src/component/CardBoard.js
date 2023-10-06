import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import '../component/css/CardBoard.css'
function CardBoard() {
  const image = "/carousel001.jpg";
  
  return (
    <div id="card-container">
    <Card sx={{ maxWidth: 270, maxHeight: 330 }} className="cardBoard">
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt="image"
            style={{objectFit: 'contain'}}
          />
          <CardContent>
            <Typography variant="h6" component="div">
              Liz
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {/* content */}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            button
          </Button>
        </CardActions>
      </Card>
      </div>
  );
}

export default CardBoard;