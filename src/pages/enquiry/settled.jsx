import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Col, Row, Container, Card, Form } from "react-bootstrap";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Header from "../../components/Header";
import AuthContext from "../../components/shared/authContext";
import jwtInterceoptor from "../../components/shared/jwtInterceptor";
import { keys } from "../../components/shared/variables";
import Popup from "reactjs-popup";
import EnquiryDialog from "./popups";
import Bounce from "react-activity/dist/Bounce";


const Settled = () => {
  const [data, setData] = useState(null)
  const [enquiries, setEnquiries] = useState(null)
  const [subject, setSubject] = useState(null)
  const [message, setMessage] = useState(null)
  const [notenquiries, setNotUsers] = useState({})
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const handleClickOpen = (scrollType, data) => () => {
    setOpen(true);
    setScroll(scrollType);
    const jsonValue = JSON.parse(data)
    setData(jsonValue)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "Id" },
    { field: "email", headerName: "Email", width: 200 },
    { field: "subject", headerName: "Subject", width: 200 },
    { field: "message", headerName: "Message", width: 200 },
    { field: "status", headerName: "Status", width: 200 },

  ];

  useEffect(() => {
    // enquiries(columns)
    jwtInterceoptor
      .get(keys.API_URL+'/enquiry/settled')
      .then((response) => {
        setEnquiries(response.data)
        // console.log(Object.keys(response.data).length)

      }).catch(err => {
        console.log(err)
      })
  }, []);
  const handleChangeSubject = (text) => {
    setSubject(text.target.value)
    // console.log(email)
  }
  const handleChangeMessage = (text) => {
    setMessage(text.target.value)
    // console.log(email)
  }
 

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="SETTLED ENQUIRIES" subtitle="Settled Enquiries from users" />
      </Box>
      <Box>
      </Box>
      <Box
        m="8px 0 0 0"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {/* {enquiries ? (

          <DataGrid rows={enquiries} columns={columns} />
        ):(
          <></>
        )} */}
        {enquiries ? (

          <DataGrid rows={enquiries} columns={columns} />
        ):(
          <DataGrid rows={notenquiries} columns={columns} />
        )}
      </Box>
    </Box>
  );
};

export default Settled;
