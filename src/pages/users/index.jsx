import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import AuthContext from "../../components/shared/authContext";
import jwtInterceoptor from "../../components/shared/jwtInterceptor";
import { keys } from "../../components/shared/variables";

const Users = () => {
  const [users, setUsers] = useState(null)
  const [notusers, setNotUsers] = useState({})
  const { user } = useContext(AuthContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "Id" },
    {
      field: "name",
      headerName: "Full Name",
      width: 200,
      cellClassName: "name-column--cell",
    },
    { field: "email", headerName: "Email", width: 200 },
  ];

  useEffect(() => {
    // setUsers(columns)
    jwtInterceoptor
      .get(keys.API_URL+'/user/getallusers')
      .then((response) => {
        // setMovies(response.data);
        setUsers(response.data)
        // console.log(Object.keys(response.data).length)

      });
  }, []);


  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="USERS" subtitle="Users on the platform" />
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
        {/* {users ? (

          <DataGrid rows={users} columns={columns} />
        ):(
          <></>
        )} */}
        {users ? (

          <DataGrid rows={users} columns={columns} />
        ):(
          <DataGrid rows={notusers} columns={columns} />
        )}
      </Box>
    </Box>
  );
};

export default Users;
