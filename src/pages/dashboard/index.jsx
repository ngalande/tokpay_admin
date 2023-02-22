import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/revenue";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/growthRate";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { getFirestore, collection, getCountFromServer } from "firebase/firestore";
import app from "../../firebaseConfig";
import jwtInterceoptor from "../../components/shared/jwtInterceptor";
import { keys } from "../../components/shared/variables";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../components/shared/authContext";
import { useNavigate } from "react-router-dom";
const db = getFirestore(app);
const address = '0x1ec2901dcc51f7d2a636e12d6dd66268b8c22186'

const Dashboard = () => {
  const [userCount, setUserCount] = useState(null)
  const [transactionCount, setTransactionCount] = useState(null)
  const [transactions, setTransactions] = useState(null)
  const [totalBalances, setTotlaBalances] = useState('')
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  
  useEffect(() => {
    // setUsers(columns)
    if(!user){
      logout()
      navigate('/login')
      // console.log(user.email)
    }else{
      // console.log('went on ///////')
      jwtInterceoptor
        .get(keys.API_URL+'/user/getallusers')
        .then((response) => {
          // setMovies(response.data);
          let count = Object.keys(response.data).length
          setUserCount(count)
          // console.log(count)
  
        }).catch(err => {
          // let status = err.response.status
          console.log(err)
          // logout()
  
        })
  
        jwtInterceoptor
        .get(keys.API_URL+'/trans/getalltransactions')
        .then((response) => {
          // setMovies(response.data);
          let count = Object.keys(response.data).length
          let data = response.data
          setTransactionCount(count)
          setTransactions(data)
          // console.log(data)
  
        }).catch(err => {
          // let status = err.response.status
          console.log(err)
          // logout()
        })
  
        jwtInterceoptor
        .get(keys.API_URL+'/wallet/getallbalances')
        .then((response) => {
          // setMovies(response.data);
          // let count = Object.keys(response.data).length
          let balance = response.data.balance
          setTotlaBalances(balance)
          // console.log(response.data.balance)
  
        }).catch(err => {
          // let status = err.response.status
          if(err.response.status == 404){
            // console.log(status)
            setTotlaBalances(0)
            // navigate('/home')
          }
  
        })
    }
    

  }, []);
  return (
    <Box m="20px">
      {/* HEADER */}

      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title="DASHBOARD" subtitle="Welcome to Tokpay Admin Dashboard" />

        
      </Box>

      {/* GRID & CHARTS */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={transactionCount}
              subtitle="Transactions Processed"
              progress="0.50"
              // increase="+21%"
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={userCount}
              subtitle="Total Users"
              progress={userCount/100}
              // increase="+5%"
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={'$ '+totalBalances}
              subtitle="Total Users Account Balance"
              progress="0.50"
              // increase="+21%"
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="1,325,134"
              subtitle="Total Revenue Generated"
              progress="0.80"
              // increase="+43%"
              icon={
                <TrafficIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>

        <Grid
          xs={12}
          sm={12}
          md={8}
          lg={8}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid xs={12}>
            <Box backgroundColor={colors.primary[400]}>
              <Box
                mt="25px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Revenue Generated
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.greenAccent[500]}
                  >
                    $58,373,698
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <LineChart isDashboard={true} />
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Box backgroundColor={colors.primary[400]} p="30px">
              <Typography variant="h5" fontWeight="600">
                Transaction Volume
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="25px"
              >
                <ProgressCircle size="125" />
                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  sx={{ mt: "15px" }}
                >
                  $48,352 revenue generated
                </Typography>
                <Typography>
                  Includes extra misc expenditures and costs
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Box backgroundColor={colors.primary[400]}>
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
              >
                Growth Rate
              </Typography>
              <Box height="250px" mt="-20px">
                <BarChart isDashboard={true} />
              </Box>
            </Box>
          </Grid>
          
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
          <Box
            backgroundColor={colors.primary[400]}
            maxHeight="100vh"
            overflow="auto"
            m="25px 0 0 0"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              color={colors.grey[100]}
              p="15px"
            >
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Recent Transaction
              </Typography>
            </Box>
            {transactions?.map((transaction, i) => {
              return (
                <Box
                  key={`${transaction}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.greenAccent[100]}
                    >
                      {transaction.transactionHash}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      From: {transaction.senderName}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      To: {transaction.receiverName}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{Date(transaction.time).slice(4,21)}</Box>
                  <Box
                    color={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    ${transaction.amount}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
