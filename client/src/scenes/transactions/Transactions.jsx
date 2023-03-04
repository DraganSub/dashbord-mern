import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import { useState } from "react";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

export default function Transactions() {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  // temporary search value for adding search only on click
  const [searchInput, setSearchInput] = useState("");

  const stringifiedSort = JSON.stringify(sort)
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: stringifiedSort,
    search
  });
  console.log("🚀 ~ file: Transactions.jsx:19 ~ Transactions ~ data:", data)

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User Id",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 1,
      sortable: false,
      renderCell: (params) => params.value.length
    },

    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`
    },
  ]


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subTitle="Entire list of transactions" />
      <Box
        mt="40px"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none"
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none"
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.alt,
            borderBottom: "none",
            color: theme.palette.secondary[100]
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.primary.alt,
            borderTop: "none",
            color: theme.palette.secondary[100]
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`

          }
        }}>
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rowCount={(data && data.total) || 0}
          rows={(data && data.transactions) || []}
          columns={columns}
          pagination
          rowsPerPageOptions={[20, 50, 100]}
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch }
          }}
        />
      </Box>
      {/*  <DataGrid /> */}
    </Box>
  )
}
