import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport } from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";


export default function DataGridCustomToolbar(props) {

  const {
    setSearch,
    searchInput,
    setSearchInput
  } = props;

  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </FlexBetween>
      <TextField
        label="Search..."
        sx={{ mb: "0.5rem", width: "15rem" }}
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        variant="standard"
        inputProps={{
          endAdorment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setSearch(searchInput)
                  setSearchInput("")
                }}
              >
                <Search />
              </IconButton>
            </InputAdornment>
          )
        }}
      >
      </TextField>

    </GridToolbarContainer>
  )
}
