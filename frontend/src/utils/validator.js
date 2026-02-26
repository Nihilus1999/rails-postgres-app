export const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phone_regex = /^04(12|14|16|24|26)\d{7}$/;
export const name_regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
export const ci_regex = /^\d{1,8}$/;
export const RIF_REGEX = /^[VEJPGC]-?\d{8}-?\d$/i;
export const PASSPORT_REGEX = /^[a-zA-Z0-9]{6,9}$/;

export const validations_messages = {
  required: "Requerido",
  email: "debe tener un formato válido (ejemplo: prueba@gmail.com)",
  phone: "debe tener formato venezolano válido (ej: 04121234567)",
  name: "solo permite letras y espacios (incluye ñ y acentos)",
  ci: "La CI debe contener máximo 8 dígitos numéricos",
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

  if (type === "ci" || type === "cédula" || type === "cedula") {
    return ci_regex.test(documentNumber) || validations_messages.ci;
  }

  if (type === "rif") {
    return RIF_REGEX.test(documentNumber) || validations_messages.rif;
  }

  if (type === "pasaporte") {
    return PASSPORT_REGEX.test(documentNumber) || validations_messages.passport;
  }

  return true;
}

export function validateIssueDateNotFuture(value) {
  if (!value) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const issueDate = new Date(value);
  issueDate.setHours(0, 0, 0, 0);

  return issueDate <= today || validations_messages.issueDateFuture;
}

export function validateExpirationDateAfterIssue(expirationDate, issueDate) {
  if (!expirationDate || !issueDate) return true;

  const expiration = new Date(expirationDate);
  const issue = new Date(issueDate);

  return expiration >= issue || validations_messages.expirationBeforeIssue;
}

export function validateDocumentTypeByPersonType(documentTypeId, personTypeId, documentTypes) {
  if (!documentTypeId || !personTypeId) return true;

  const selectedDocumentType = documentTypes.find((dt) => String(dt.id) === String(documentTypeId));

  if (!selectedDocumentType) return true;

  return String(selectedDocumentType.person_type_id) === String(personTypeId)
    || validations_messages.invalidDocumentType;
}