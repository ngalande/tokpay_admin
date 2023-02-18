// docs https://github.com/azouaoui-med/react-pro-sidebar
import { useEffect, useState } from "react";
import { Menu, Sidebar, MenuItem } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";
import { BiLogOut } from 'react-icons/bi';
import { useSidebarContext } from "./sidebarContext";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../../../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme, Box, Typography, IconButton, Button } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";

import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const MyProSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const navigate = useNavigate();
  const auth = getAuth(app)
  const user =  auth.currentUser;


  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if(user == null){
        navigate('/login')
        console.log(user.email)
      }
    })
  },[])


  const handleLogout =async()=>{
    signOut(auth).then(() => {
      navigate('/login')
    }).catch((error)=>{
      alert('Error Signing Out')
    })
  }
  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item:hover": {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar
        breakPoint="md"
        rtl={sidebarRTL}
        backgroundColor={colors.primary[400]}
        image={sidebarImage}
      >
        <Menu iconshape="square">
          <MenuItem
            icon={
              collapsed ? (
                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
              ) :(
              <di></di>
              )
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  TOKPAY
                </Typography>
                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!collapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  "& .avater-image": {
                    backgroundColor: colors.primary[500],
                  },
                }}
              >
                <img
                  className="avater-image"
                  alt="profile user"
                  width="100px"
                  height="100px"
                  src={require('../../../assets/images/user.png')}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Code Pappi
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/home"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Users
            </Typography>
            <Item
              title="View Users"
              to="/users"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 20px 5px 20px" }}
            >
              Stats
            </Typography>
            <Item
              title="Growth Rate"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Transaction Volume"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Revenue Generated"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
          </Box>
          <Box 
            textAlign="center"
            // display="flex"
                justifyContent="space-between"
                alignItems="center"
                // ml="15px"
                marginTop={'70px'}
            >
            <Button style={{position:'relative', alignSelf:'center'}} onClick={handleLogout}>
              <BiLogOut size={50} color='red' />
            </Button>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MyProSidebar;
