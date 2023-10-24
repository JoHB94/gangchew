import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
export default function BestRankingList(props) {
  
  const infoHandle = (itemId) => {
    window.location.href = `/fundinginfo/${itemId}`;
  }

  return (
    <div style={{ border: "1px solid lightgray", borderRadius: "10px" }}>
      <List sx={{ width: "100%" }}>
        {/* ListItem : list의 게시물 */}
        {props.dataArray.map((item, index) => (
          <>
            <ListItem alignItems="flex-start" key={index} onClick={() => infoHandle(item.id)}>
              <ListItemAvatar>
                {/* <Avatar alt="Remy Sharp" src="" /> */}
                <h2
                  style={{
                    transform: "scale(1.4) translateX(25%) translateY(-15%)",
                  }}
                >
                  {index + 1}
                </h2>
              </ListItemAvatar>
              <ListItemText
                primary={item.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.writer.nickname}
                    </Typography> {/* subtitle 글자 개수 40자 제한 */}
                    {" — " + (item.subtitle.length > 40
                      ? item.subtitle.substring(0, 40) + "..."
                      : item.subtitle)}
                    {/* content */}
                  </React.Fragment>
                }
              />
            </ListItem>
            {index === 4 ? "" : <Divider variant="inset" component="li"/>} {/* 구분선 */}
          </>
        ))}
      </List>
    </div>
  );
}
