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
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableDesign from "@/views/components/TableDesign";
import UserDetailsModal from "@/views/components/UserDetailsModal";
import { getUsers, deleteUser } from "@/services/user";

const UserList = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();

      const userRows = response.data.map((item) => ({
        id: item.id,
        tipoDocumento: item.document_type?.name || "N/A",
        numeroDocumento: item.document_number || "N/A",
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

  const handleOpenDeleteConfirm = (user) => {
    setUserToDelete(user);
    setDeleteConfirmOpen(true);
  };

  const handleCloseDeleteConfirm = () => {
    setDeleteConfirmOpen(false);
    setUserToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      const response = await deleteUser(userToDelete.id);
      setRows((prevRows) => prevRows.filter((row) => row.id !== userToDelete.id));
      setSuccessMsg(response.message);
      setError("");
      setSnackbarOpen(true);
    } catch (err) {
      setError(err.message);
      setSuccessMsg("");
      setSnackbarOpen(true);
    } finally {
      handleCloseDeleteConfirm();
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

  const columns = [
    {
      field: "tipoDocumento",
      headerName: "Tipo Documento",
      flex: 1,
      minWidth: 170,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "numeroDocumento",
      headerName: "N° Documento",
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
            onClick={() => handleOpenDeleteConfirm(params.row)}
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

      <UserDetailsModal
        open={openDetails}
        onClose={handleCloseDetails}
        user={selectedUser}
      />

      <Dialog
        open={deleteConfirmOpen}
        onClose={handleCloseDeleteConfirm}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            border: "1px solid rgba(15, 23, 42, 0.12)",
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" fontWeight={800}>
            Confirmar eliminación
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            ¿Estás seguro de que deseas eliminar a <strong>{userToDelete?.nombre || "este usuario"}</strong>?
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5, pt: 1 }}>
          <Button
            onClick={handleCloseDeleteConfirm}
            variant="outlined"
            sx={{ borderRadius: 999, textTransform: "none", fontWeight: 700 }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            disableElevation
            sx={{ borderRadius: 999, textTransform: "none", fontWeight: 700 }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserList;
