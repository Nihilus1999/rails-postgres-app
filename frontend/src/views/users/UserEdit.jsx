import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  Box,
  Stack,
  Divider,
} from "@mui/material";

import { getUserById, updateUser } from "@/services/user";
import { getPersonTypes, getDocumentTypes } from "@/services/catalogs";
import GlobalSnackbar from "@/views/components/GlobalSnackbar.jsx";
import {
  email_regex,
  phone_regex,
  name_regex,
  validations_messages,
  validateDocumentNumberByType,
  validateIssueDateNotFuture,
  validateExpirationDateAfterIssue,
  validateDocumentTypeByPersonType,
} from "@/utils/validator";

export default function UserEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isFormReady, setIsFormReady] = useState(false);
  const [lastPersonTypeId, setLastPersonTypeId] = useState("");
  const [personTypes, setPersonTypes] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      person_type_id: "",
      document_type_id: "",
      document_number: "",
      name: "",
      email: "",
      primary_phone: "",
      secondary_phone: "",
      document_issue_date: "",
      document_expiration_date: "",
    },
    mode: "onTouched",
  });

  const selectedPersonTypeId = watch("person_type_id");
  const selectedDocumentTypeId = watch("document_type_id");
  const isBusy = loading || initialLoading;

  const isDocumentNumberDisabled =
    isBusy || !selectedPersonTypeId || !selectedDocumentTypeId;

  const filteredDocumentTypes = documentTypes.filter(
    (dt) => String(dt.person_type_id) === String(selectedPersonTypeId),
  );
  const selectedDocumentType = documentTypes.find(
    (dt) => String(dt.id) === String(selectedDocumentTypeId),
  );

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      backgroundColor: "background.paper",
    },
    "& .MuiOutlinedInput-input": {
      paddingTop: "16.5px",
      paddingBottom: "16.5px",
    },
    "& .MuiSelect-select": {
      display: "flex",
      alignItems: "center",
      minHeight: "1.4375em !important",
      paddingTop: "16.5px",
      paddingBottom: "16.5px",
    },
    "& .MuiFormHelperText-root": {
      minHeight: 22,
      marginTop: 0.5,
    },
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ptData, dtData, userResponse] = await Promise.all([
          getPersonTypes(),
          getDocumentTypes(),
          getUserById(id),
        ]);

        const userData = userResponse?.data?.user || userResponse?.data;

        if (!userData?.id) {
          throw new Error("No se pudo obtener la información del usuario.");
        }

        setPersonTypes(ptData);
        setDocumentTypes(dtData);

        reset({
          person_type_id: String(userData.person_type_id || ""),
          document_type_id: String(userData.document_type_id || ""),
          document_number: userData.document_number || "",
          name: userData.name || "",
          email: userData.email || "",
          primary_phone: userData.primary_phone || "",
          secondary_phone: userData.secondary_phone || "",
          document_issue_date: userData.document_issue_date || "",
          document_expiration_date: userData.document_expiration_date || "",
        });

        setLastPersonTypeId(String(userData.person_type_id || ""));
        setIsFormReady(true);
      } catch (e) {
        setSnackbar({
          open: true,
          severity: "error",
          message: e.message || "Error al cargar la información del usuario.",
        });
      } finally {
        setInitialLoading(false);
      }
    };

    loadData();
  }, [id, reset]);

  useEffect(() => {
    if (!isFormReady) return;
    if (selectedPersonTypeId === lastPersonTypeId) return;

    setValue("document_type_id", "", { shouldValidate: true });
    setValue("document_number", "", { shouldValidate: true });
    setLastPersonTypeId(selectedPersonTypeId || "");
  }, [selectedPersonTypeId, lastPersonTypeId, isFormReady, setValue]);

  const issueDate = watch("document_issue_date");

  useEffect(() => {
    if (issueDate) {
      trigger("document_expiration_date");
    }
  }, [issueDate, trigger]);

  useEffect(() => {
    if (selectedDocumentTypeId) {
      trigger("document_number");
    }
  }, [selectedDocumentTypeId, trigger]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateUser(id, { user: data });
      setSnackbar({
        open: true,
        severity: "success",
        message: "Usuario actualizado correctamente.",
      });
      setTimeout(() => navigate("/users", { replace: true }), 1500);
    } catch (e) {
      setSnackbar({
        open: true,
        severity: "error",
        message: e.message || "Error al actualizar.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{ mt: { xs: 3, md: 5 }, mb: { xs: 3, md: 6 } }}
    >
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h5"
              fontWeight={800}
              sx={{ letterSpacing: 0.2, color: "text.primary" }}
            >
              Editar Cliente
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Actualiza la información del cliente seleccionado.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: { xs: 2.5, md: 4 } }}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={3}>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="primary.main"
                sx={{ mb: 2 }}
              >
                1. Identificación
              </Typography>

              <Stack direction={{ xs: "column", md: "row" }} spacing={2.5}>
                <Box sx={{ flex: 1 }}>
                  <Controller
                    name="person_type_id"
                    control={control}
                    rules={{ required: validations_messages.required }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        select
                        label="Tipo de Persona"
                        fullWidth
                        variant="outlined"
                        disabled={isBusy}
                        error={!!error}
                        helperText={error?.message || " "}
                        InputLabelProps={{ shrink: true }}
                        SelectProps={{ displayEmpty: true }}
                        sx={textFieldSx}
                      >
                        <MenuItem value="" disabled>
                          <em>Seleccione una opción</em>
                        </MenuItem>

                        {personTypes.map((pt) => (
                          <MenuItem key={pt.id} value={String(pt.id)}>
                            {pt.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Controller
                    name="document_type_id"
                    control={control}
                    rules={{
                      required: validations_messages.required,
                      validate: (value) =>
                        validateDocumentTypeByPersonType(
                          value,
                          selectedPersonTypeId,
                          documentTypes,
                        ),
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        select
                        label="Documento"
                        fullWidth
                        variant="outlined"
                        disabled={
                          !selectedPersonTypeId || isBusy
                        }
                        error={!!error}
                        helperText={
                          error?.message ||
                          (!selectedPersonTypeId
                            ? "Selecciona primero el tipo de persona."
                            : " ")
                        }
                        InputLabelProps={{ shrink: true }}
                        SelectProps={{ displayEmpty: true }}
                        sx={textFieldSx}
                      >
                        <MenuItem value="" disabled>
                          <em>Seleccione una opción</em>
                        </MenuItem>

                        {filteredDocumentTypes.map((dt) => (
                          <MenuItem key={dt.id} value={String(dt.id)}>
                            {dt.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <TextField
                    label="Número"
                    fullWidth
                    variant="outlined"
                    disabled={isDocumentNumberDisabled}
                    error={!!errors.document_number}
                    helperText={
                      errors.document_number?.message ||
                      (isDocumentNumberDisabled
                        ? "Selecciona tipo de persona y tipo de documento para habilitar este campo."
                        : " ")
                    }
                    sx={textFieldSx}
                    {...register("document_number", {
                      required: validations_messages.required,
                      validate: (value) =>
                        validateDocumentNumberByType(
                          value,
                          selectedDocumentType?.name,
                        ),
                    })}
                  />
                </Box>
              </Stack>

              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="primary.main"
                sx={{ mb: 2 }}
              >
                2. Contacto
              </Typography>
              <Stack spacing={2.5}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={2.5}>
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      label="Nombre Completo / Razón Social"
                      fullWidth
                      variant="outlined"
                      disabled={loading}
                      error={!!errors.name}
                      helperText={errors.name?.message || " "}
                      sx={textFieldSx}
                      {...register("name", {
                        required: validations_messages.required,
                        pattern: {
                          value: name_regex,
                          message: validations_messages.name,
                        },
                      })}
                    />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <TextField
                      label="Correo Electrónico"
                      type="email"
                      fullWidth
                      variant="outlined"
                      disabled={loading}
                      error={!!errors.email}
                      helperText={errors.email?.message || " "}
                      sx={textFieldSx}
                      {...register("email", {
                        required: validations_messages.required,
                        pattern: {
                          value: email_regex,
                          message: validations_messages.email,
                        },
                      })}
                    />
                  </Box>
                </Stack>

                <Stack direction={{ xs: "column", md: "row" }} spacing={2.5}>
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      label="Teléfono Principal"
                      fullWidth
                      variant="outlined"
                      disabled={loading}
                      error={!!errors.primary_phone}
                      helperText={errors.primary_phone?.message || " "}
                      sx={textFieldSx}
                      {...register("primary_phone", {
                        required: validations_messages.required,
                        pattern: {
                          value: phone_regex,
                          message: validations_messages.phone,
                        },
                      })}
                    />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <TextField
                      label="Teléfono Secundario"
                      type="tel"
                      fullWidth
                      variant="outlined"
                      disabled={loading}
                      error={!!errors.secondary_phone}
                      helperText={errors.secondary_phone?.message || " "}
                      sx={textFieldSx}
                      inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                        maxLength: 11,
                      }}
                      {...register("secondary_phone", {
                        validate: (value) =>
                          !value ||
                          phone_regex.test(value) ||
                          validations_messages.phone,
                      })}
                    />
                  </Box>
                </Stack>
              </Stack>

              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="primary.main"
                sx={{ mb: 2 }}
              >
                3. Fechas del Documento
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2.5}>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    label="Fecha de Emisión"
                    type="date"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    disabled={loading}
                    error={!!errors.document_issue_date}
                    helperText={errors.document_issue_date?.message || " "}
                    sx={textFieldSx}
                    {...register("document_issue_date", {
                      required: validations_messages.required,
                      validate: validateIssueDateNotFuture,
                    })}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <TextField
                    label="Fecha de Vencimiento"
                    type="date"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    disabled={loading}
                    error={!!errors.document_expiration_date}
                    helperText={errors.document_expiration_date?.message || " "}
                    sx={textFieldSx}
                    {...register("document_expiration_date", {
                      required: validations_messages.required,
                      validate: (value) =>
                        validateExpirationDateAfterIssue(
                          value,
                          getValues("document_issue_date"),
                        ),
                    })}
                  />
                </Box>
              </Stack>

              <Divider />

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading || initialLoading}
                  disableElevation
                  sx={{
                    minWidth: { xs: "100%", sm: 260 },
                    maxWidth: 320,
                    py: 1.5,
                    px: 3,
                    borderRadius: 999,
                    textTransform: "none",
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: 0.2,
                    backgroundColor: "primary.main",
                    boxShadow: "0 6px 16px rgba(25, 118, 210, 0.24)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {loading ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CircularProgress size={20} color="inherit" />
                      Guardando...
                    </Box>
                  ) : (
                    "ACTUALIZAR CLIENTE"
                  )}
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Paper>

      <GlobalSnackbar
        open={snackbar.open}
        severity={snackbar.severity}
        message={snackbar.message}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </Container>
  );
}
