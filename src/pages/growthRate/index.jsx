import React from 'react'
import BarChart from '../../components/growthRate'
import { Box } from '@mui/material';
import Header from '../../components/Header';
// import { useTheme } from '@mui/material';
// import { tokens } from '../../theme';
const RateBar = () => {
    // const theme = useTheme()
    // const colors = tokens(theme.palette.mode)
    return (
        <Box m="20px" height="75vh">
            <Header title="Growth Rate" subtitle="Growth Rate bar chart" />
            <BarChart />
        </Box>
    )
}

export default RateBar