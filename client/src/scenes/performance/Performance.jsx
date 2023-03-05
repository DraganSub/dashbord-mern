import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { useGetUserPerformanceQuery } from "state/api";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

export default function Performance() {
  const theme = useTheme();
  const userId = useSelector(state => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createAt",
      headerName: "Created At",
      flex: 1,
    },

    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: params => params.value.length
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: params => `$${Number(params.value).toFixed(2)}`
    },

  ]

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PERFORMANCE" subTitle="Track Your Affiliate User Performance Here" />
      <Box
        mt="40px"
        height="75vh"
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
          rows={(data && data.sales) || []}
          columns={columns}
          components={{
            ColumnMenu: CustomColumnMenu
          }}
        />
      </Box>
    </Box>

  )
}
