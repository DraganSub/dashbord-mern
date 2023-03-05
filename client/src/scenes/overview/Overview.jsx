import { Box, FormControl, InputLabel, MenuItem, Select, } from "@mui/material";
import OverviewChart from "components/OverviewChart";
import Header from "components/Header";
import { useState } from "react";
export default function Overview() {
  const [view, setView] = useState("units");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Overview" subTitle="Overview of general revenue and profit" />
      <Box height="75vh">
        <FormControl
          sx={{
            mt: "1rem"
          }}
        >
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  )
}
