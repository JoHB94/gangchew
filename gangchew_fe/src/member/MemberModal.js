import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import SelectRegistration from "./SelectRegistration";
const style = {
  display: "inline",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "4px",
  border: "1px solid black",
  boxShadow: 24,
  p: 4,
};

const btnStyle = {
  fontSize: "12px",
  padding: "0px",
  display: "inline",
  marginBottom: "1px",
  color: "rgb(178, 8, 204)",
};

export default function MemberModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true); //열린 상태
  const handleClose = () => setOpen(false); // 닫힌 상태

  return (
    <div style={{ display: "inline" }}>
      <Button onClick={handleOpen} sx={btnStyle}>
        회원가입
      </Button>
      <Modal
        open={open}
        onClose={handleClose} // modal 이외 영역 클릭시 닫힘
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <SelectRegistration socialUrl={props.socialUrlArray}/>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
