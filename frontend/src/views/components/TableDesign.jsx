// src/components/common/TableDesign.jsx
import { Box, Typography, Stack, Paper, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const TableDesign = ({
  title,
  buttonLink,
  rows,
  columns,
  limit = 10,
  rowHeight = 60,
  hideCreateButton = false,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "#fff",
        border: "2px solid",
        borderColor: "rgba(15, 23, 42, 0.16)",
        borderRadius: 5,
        overflow: "hidden",
        boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          px: { xs: 2.5, md: 4 },
          py: { xs: 2.5, md: 3 },
          borderBottom: "2px solid",
          borderColor: "rgba(15, 23, 42, 0.12)",
          bgcolor: "#fff",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{
                letterSpacing: 0.2,
                color: "text.primary",
                lineHeight: 1.2,
              }}
            >
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4 }}>
              Consulta y gestiona la información de forma rápida.
            </Typography>
          </Box>

          {!hideCreateButton && (
            <Button
              component={Link}
              to={buttonLink}
              variant="contained"
              disableElevation
              startIcon={<AddIcon />}
              sx={{
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 700,
                px: 2.2,
                py: 1,
              }}
            >
              Nuevo
            </Button>
          )}
        </Stack>
      </Box>

      <Box
        sx={{
          p: { xs: 2, md: 3 },
          overflowX: "auto",
        }}
      >
        <Box
          sx={{
            minWidth: 850,
            borderRadius: 3,
            border: "2px solid",
            borderColor: "rgba(15, 23, 42, 0.14)",
            overflow: "hidden",
            bgcolor: "#fff",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[limit]}
            initialState={{
              pagination: { paginationModel: { pageSize: limit, page: 0 } },
            }}
            pagination
            getRowHeight={() => rowHeight}
            disableRowSelectionOnClick
            sx={{
              border: "none",
              fontFamily: "inherit",
              "& .MuiDataGrid-main": {
                backgroundColor: "#fff",
              },
              "& .MuiDataGrid-cell": {
                fontSize: "14px",
                borderBottom: "1px solid rgba(15, 23, 42, 0.14)",
                borderRight: "1px solid rgba(15, 23, 42, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              "& .MuiDataGrid-cell:last-of-type": {
                borderRight: "none",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.04)",
              },
              "& .MuiDataGrid-columnHeader": {
                fontSize: "15px",
                fontWeight: 700,
                backgroundColor: "rgba(25, 118, 210, 0.08)",
                color: "#0f172a",
                borderBottom: "2px solid rgba(15, 23, 42, 0.16)",
                borderRight: "1px solid rgba(15, 23, 42, 0.14)",
              },
              "& .MuiDataGrid-columnHeader:last-of-type": {
                borderRight: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                minHeight: 58,
              },
              "& .MuiDataGrid-columnHeaderTitleContainer": {
                justifyContent: "center",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "2px solid rgba(15, 23, 42, 0.14)",
                minHeight: 52,
              },
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default TableDesign;