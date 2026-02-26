// src/views/users/UserList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableDesign from "@/views/components/TableDesign";
import { getUsers, deleteUser } from "@/services/user";

const UserList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();

      const userRows = response.data.map((item) => ({
        id: item.id,
        documento: `${item.document_type?.name || ""} - ${item.document_number}`,
        nombre: item.name,
        correo: item.email,
        telefono: item.primary_phone,
        tipoPersona: item.person_type?.name || "N/A",
        personTypeName: item.person_type?.name || "N/A",
        documentTypeName: item.document_type?.name || "N/A",
        documentNumber: item.document_number || "N/A",
        email: item.email || "N/A",
        primaryPhone: item.primary_phone || "N/A",
        secondaryPhone: item.secondary_phone || "N/A",
        documentIssueDate: item.document_issue_date || "N/A",
        documentExpirationDate: item.document_expiration_date || "N/A",
      }));

      setRows(userRows);
    } catch (err) {
      setError(err.message);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        // Llamamos directamente a nuestro servicio refactorizado
        const response = await deleteUser(id);
        setRows(rows.filter((row) => row.id !== id));

        setSuccessMsg(response.message);
        setError("");
        setSnackbarOpen(true);
      } catch (err) {
        setError(err.message);
        setSuccessMsg("");
        setSnackbarOpen(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setError("");
  };

  const handleOpenDetails = (user) => {
    setSelectedUser(user);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedUser(null);
  };

  const formatDate = (value) => {
    if (!value || value === "N/A") return "N/A";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("es-EC", { year: "numeric", month: "2-digit", day: "2-digit" });
  };

  const columns = [
    {
      field: "documento",
      headerName: "Documento",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "nombre",
      headerName: "Nombre / Razón Social",
      flex: 1.5,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "correo",
      headerName: "Correo Electrónico",
      flex: 1.5,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "telefono",
      headerName: "Teléfono",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "tipoPersona",
      headerName: "Tipo Persona",
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "acciones",
      headerName: "Gestionar",
      width: 210,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Tooltip title="Ver detalles" arrow>
            <IconButton
              onClick={() => handleOpenDetails(params.row)}
              size="small"
              sx={{
                border: "1px solid rgba(2, 132, 199, 0.25)",
                bgcolor: "rgba(2, 132, 199, 0.08)",
                "&:hover": { bgcolor: "rgba(2, 132, 199, 0.16)" },
              }}
            >
              <VisibilityIcon sx={{ color: "#0284c7" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar" arrow>
            <IconButton
            component={Link}
            to={`/users/edit/${params.row.id}`}
            size="small"
            sx={{
              border: "1px solid rgba(25, 118, 210, 0.25)",
              bgcolor: "rgba(25, 118, 210, 0.06)",
              "&:hover": { bgcolor: "rgba(25, 118, 210, 0.12)" },
            }}
          >
            <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar" arrow>
            <IconButton
            onClick={() => handleDelete(params.row.id)}
            size="small"
            sx={{
              border: "1px solid rgba(211, 47, 47, 0.25)",
              bgcolor: "rgba(211, 47, 47, 0.06)",
              "&:hover": { bgcolor: "rgba(211, 47, 47, 0.12)" },
            }}
          >
            <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <TableDesign
        title="Lista de Usuarios"
        buttonLink="/users/create"
        rows={rows}
        columns={columns}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={error ? "error" : "success"}
          sx={{ fontWeight: "bold" }}
        >
          {error || successMsg}
        </Alert>
      </Snackbar>

      <Dialog
        open={openDetails}
        onClose={handleCloseDetails}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 4,
            border: "1px solid rgba(15, 23, 42, 0.12)",
            boxShadow: "0 20px 45px rgba(15, 23, 42, 0.18)",
          },
        }}
      >
        <DialogTitle sx={{ pb: 1.5 }}>
          <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: 0.2 }}>
            Detalles del Usuario
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Información completa del registro seleccionado.
          </Typography>
        </DialogTitle>

        <DialogContent dividers sx={{ px: { xs: 2, md: 3 }, py: 2.5 }}>
          <Stack spacing={2}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">Nombre / Razón social</Typography>
                <Typography fontWeight={600}>{selectedUser?.nombre || "N/A"}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">Correo</Typography>
                <Typography fontWeight={600}>{selectedUser?.email || "N/A"}</Typography>
              </Box>
            </Stack>

            <Divider />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">Tipo de Persona</Typography>
                <Typography fontWeight={600}>{selectedUser?.personTypeName || "N/A"}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">Tipo de Documento</Typography>
                <Typography fontWeight={600}>{selectedUser?.documentTypeName || "N/A"}</Typography>
              </Box>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">Número de Documento</Typography>
                <Typography fontWeight={600}>{selectedUser?.documentNumber || "N/A"}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">Teléfono Principal</Typography>
                <Typography fontWeight={600}>{selectedUser?.primaryPhone || "N/A"}</Typography>
              </Box>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">Teléfono Secundario</Typography>
                <Typography fontWeight={600}>{selectedUser?.secondaryPhone || "N/A"}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">Fecha de Emisión</Typography>
                <Typography fontWeight={600}>{formatDate(selectedUser?.documentIssueDate)}</Typography>
              </Box>
            </Stack>

            <Box>
              <Typography variant="caption" color="text.secondary">Fecha de Vencimiento</Typography>
              <Typography fontWeight={600}>{formatDate(selectedUser?.documentExpirationDate)}</Typography>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleCloseDetails}
            variant="contained"
            disableElevation
            sx={{
              borderRadius: 999,
              textTransform: "none",
              fontWeight: 700,
              px: 3,
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserList;
