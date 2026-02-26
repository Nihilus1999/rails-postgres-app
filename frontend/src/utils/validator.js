export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^04(12|14|16|24|26)\d{7}$/;
export const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
export const CEDULA_REGEX = /^\d{7}$/;
export const RIF_REGEX = /^[VEJPGC]-?\d{8}-?\d$/i;
export const PASSPORT_REGEX = /^[a-zA-Z0-9]{6,9}$/;

export const VALIDATION_MESSAGES = {
  required: "Requerido",
  email: "debe tener un formato válido (ejemplo: prueba@gmail.com)",
  phone: "debe tener formato venezolano válido (ej: 04121234567)",
  name: "solo permite letras y espacios (incluye ñ y acentos)",
  cedula: "para cédula debe contener exactamente 7 dígitos",
  rif: "para RIF debe cumplir formato V-12345678-9 (también acepta sin guiones)",
  passport: "para pasaporte debe ser alfanumérico de 6 a 9 caracteres",
  issueDateFuture: "no puede ser una fecha futura",
  expirationBeforeIssue: "debe ser posterior a la fecha de emisión",
  invalidDocumentType: "no es válido para el tipo de persona seleccionado",
};

export function validateDocumentNumberByType(documentNumber, documentTypeName) {
  if (!documentNumber) return true;
  if (!documentTypeName) return true;

  const type = documentTypeName.toLowerCase();

  if (type === "cédula" || type === "cedula") {
    return CEDULA_REGEX.test(documentNumber) || VALIDATION_MESSAGES.cedula;
  }

  if (type === "rif") {
    return RIF_REGEX.test(documentNumber) || VALIDATION_MESSAGES.rif;
  }

  if (type === "pasaporte") {
    return PASSPORT_REGEX.test(documentNumber) || VALIDATION_MESSAGES.passport;
  }

  return true;
}

export function validateIssueDateNotFuture(value) {
  if (!value) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const issueDate = new Date(value);
  issueDate.setHours(0, 0, 0, 0);

  return issueDate <= today || VALIDATION_MESSAGES.issueDateFuture;
}

export function validateExpirationDateAfterIssue(expirationDate, issueDate) {
  if (!expirationDate || !issueDate) return true;

  const expiration = new Date(expirationDate);
  const issue = new Date(issueDate);

  return expiration >= issue || VALIDATION_MESSAGES.expirationBeforeIssue;
}

export function validateDocumentTypeByPersonType(documentTypeId, personTypeId, documentTypes) {
  if (!documentTypeId || !personTypeId) return true;

  const selectedDocumentType = documentTypes.find((dt) => String(dt.id) === String(documentTypeId));

  if (!selectedDocumentType) return true;

  return String(selectedDocumentType.person_type_id) === String(personTypeId)
    || VALIDATION_MESSAGES.invalidDocumentType;
}
