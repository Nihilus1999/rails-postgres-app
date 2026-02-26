import { Link } from "react-router-dom";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ mt: { xs: 4, md: 7 }, mb: { xs: 4, md: 7 } }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 5,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "rgba(15, 23, 42, 0.1)",
          bgcolor: "#fff",
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
        }}
      >
        <Box
          sx={{
            px: { xs: 2.5, md: 4 },
            py: { xs: 2.5, md: 3 },
            borderBottom: "1px solid",
            borderColor: "rgba(15, 23, 42, 0.08)",
            bgcolor: "#fff",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: 0.2 }}>
            Bienvenidos a Sisco Bank C.A.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Innovación y pasión por el logro de la excelencia.
          </Typography>
        </Box>

        <Stack spacing={2.5} sx={{ p: { xs: 2.5, md: 4 } }}>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            En el año 2017 surge entre las instituciones financieras un banco universal denominado
            <strong> Sisco Bank C.A.</strong>, con el objetivo de alcanzar una sólida presencia en mercados de
            alto potencial. Su crecimiento se impulsa por la innovación, la pasión por el logro y una
            estrategia sostenida y rentable centrada en entregar soluciones de alto valor agregado a sus clientes.
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Como parte de esta evolución digital, Sisco Bank C.A. requiere una aplicación web responsive
            que permita registrar personas naturales y jurídicas, brindando una experiencia sencilla y eficiente.
            Esta solución fue desarrollada con <strong>Ruby</strong> y el framework <strong>Rails</strong>, junto a un frontend moderno en React.
          </Typography>

          <Box sx={{ pt: 1, display: "flex", justifyContent: "center" }}>
            <Button
              component={Link}
              to="/users"
              variant="contained"
              disableElevation
              sx={{
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 700,
                px: 3,
                py: 1.2,
              }}
            >
              Ir al módulo de usuarios
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
