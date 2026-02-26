import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  Divider,
  Box,
} from "@mui/material";

function formatDate(value) {
  if (!value || value === "N/A") return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("es-EC", { year: "numeric", month: "2-digit", day: "2-digit" });
}

export default function UserDetailsModal({ open, onClose, user }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
              <Typography fontWeight={600}>{user?.nombre || "N/A"}</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">Correo</Typography>
              <Typography fontWeight={600}>{user?.email || "N/A"}</Typography>
            </Box>
          </Stack>

          <Divider />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">Tipo de Persona</Typography>
              <Typography fontWeight={600}>{user?.personTypeName || "N/A"}</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">Tipo de Documento</Typography>
              <Typography fontWeight={600}>{user?.documentTypeName || "N/A"}</Typography>
            </Box>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">Número de Documento</Typography>
              <Typography fontWeight={600}>{user?.documentNumber || "N/A"}</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">Teléfono Principal</Typography>
              <Typography fontWeight={600}>{user?.primaryPhone || "N/A"}</Typography>
            </Box>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">Teléfono Secundario</Typography>
              <Typography fontWeight={600}>{user?.secondaryPhone || "N/A"}</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">Fecha de Emisión</Typography>
              <Typography fontWeight={600}>{formatDate(user?.documentIssueDate)}</Typography>
            </Box>
          </Stack>

          <Box>
            <Typography variant="caption" color="text.secondary">Fecha de Vencimiento</Typography>
            <Typography fontWeight={600}>{formatDate(user?.documentExpirationDate)}</Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={onClose}
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
  );
}
