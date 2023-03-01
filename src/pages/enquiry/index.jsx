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


const Enquiry = () => {
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
    {
        field: "action", 
        headerName: "Action", 
        width: 200, 
        sortable: false, 
        disableClickEventBubbling: true,
        renderCell: (params) => {
            const onClick = (e) => {
              // setVisble(true)
              // e.stopPropagation(); // don't select this row after clicking
              const currentRow = params.row;
              // console.log(visible)
              return JSON.stringify(currentRow, null, 4);

            };
      
            // return <Button onClick={onClick}><ForwardToInboxIcon style={{color:'#fff'}} /></Button>;
            // <EnquiryDialog>
            //   <Button onClick={setVisble(false)}>Cancel</Button>
            //   <Button onClick={setVisble(true)}>Subscribe</Button>
            // </EnquiryDialog>
            // return <Popup trigger={<Button onClick={onClick}><ForwardToInboxIcon style={{color:'#fff'}} /></Button>} position="right center">    <div style={{color: '#000'}}>{onClick()}</div>  </Popup>
            return <Button onClick={handleClickOpen('paper', onClick())}><ForwardToInboxIcon style={{color:'#fff'}} /></Button>
          }
    },
  ];

  useEffect(() => {
    // enquiries(columns)
    jwtInterceoptor
      .get(keys.API_URL+'/enquiry/getEnquiries')
      .then((response) => {
        // setMovies(response.data);
        setEnquiries(response.data)
        // console.log(Object.keys(response.data).length)

      });
  }, []);
  const handleChangeSubject = (text) => {
    setSubject(text.target.value)
    // console.log(email)
  }
  const handleChangeMessage = (text) => {
    setMessage(text.target.value)
    // console.log(email)
  }
  const handleSubmit = () =>{
    const payload = {
      email: data?.email,
      subject: subject,
      message: message,
      userSubject: data?.subject
    }
    jwtInterceoptor
      .post(keys.API_URL+'/enquiry/response', payload )
      .then((response) => {
        setLoading(true)
        // setMovies(response.data);
        console.log(response.data)
        alert('Response sent Successfully')
        // console.log(Object.keys(response.data).length)
        setOpen(false);

      }).catch(err => {
        setLoading(false)
        console.log(err)
      })
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="ENQUIRIES" subtitle="Enquiries from users" />
      </Box>
      <Box>
      <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        fullWidth ={true}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" style={{fontSize: 20}}>Help & Support</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div style={{color: '#fff'}}>
              <div style={{fontSize: 18}}>
                User Email: <br/>
              </div>
              {data?.email}
            </div>
              <br/>
              <div style={{color: '#fff'}}>
              <div style={{fontSize: 18}}>
                User Enquiry Subject: <br/>
              </div>
              {data?.subject}
            </div>
              <br/>
            <div className="mb-3">
                  <Form >
                    <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                      <Form.Label className="text-start" style={{fontSize: 18}}>
                        Subject
                      </Form.Label>
                      <Form.Control type="email" placeholder="Enter Subject" value={subject} onChange={handleChangeSubject} />
                    </Form.Group>

                    <Form.Group
                      className="mb-3 text-start"
                      controlId="formBasicPassword"
                    >
                      <Form.Label style={{fontSize: 18}}>Message</Form.Label>
                      <Form.Control type="text" placeholder="Enter message" value={message} onChange={handleChangeMessage} />
                    </Form.Group>
                    <Form.Group
                      // className="mb-2"
                      // controlId="formBasicCheckbox"
                    >
                    
                    </Form.Group>
                     
                  </Form>
                  
                </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="primary" style={{padding:5, width:'20%'}}>Cancel</Button>
          {!loading ? (

                        <Button disabled={loading} variant="primary" onClick={handleSubmit} style={{padding:5, width:'20%'}}>
                          Send
                        </Button>
                          // <Button disabled={loading} style={{color:'#fff'}} onClick={handleClose}>Send</Button>
                        ) : (
                        <Button disabled={loading} variant="primary"style={{padding:5, width:'100%'}}>
                          <Bounce />
                        </Button>
                        )}
        </DialogActions>
      </Dialog>
    </div>
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

export default Enquiry;
