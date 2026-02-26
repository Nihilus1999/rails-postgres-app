class User < ApplicationRecord
  belongs_to :person_type
  belongs_to :document_type

  VENEZUELAN_MOBILE_PHONE_REGEX = /\A04(12|14|16|24|26)\d{7}\z/
  NAME_ONLY_LETTERS_SPACES_REGEX = /\A[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+\z/
  CEDULA_REGEX = /\A\d{7}\z/
  RIF_REGEX = /\A[VEJPGC]-?\d{8}-?\d\z/i
  PASSPORT_REGEX = /\A[a-zA-Z0-9]{6,9}\z/

  # 1. Validaciones de presencia obligatoria (todos menos el teléfono secundario)
  validates :document_number, :document_issue_date, :document_expiration_date,
            :name, :email, :primary_phone, presence: true

  # 2. Validación del Correo Electrónico
  validates :email, uniqueness: true, format: {
    with: URI::MailTo::EMAIL_REGEXP,
    message: "debe tener un formato válido (ejemplo: prueba@gmail.com)"
  }

  # 3. Validación del Teléfono (Formato móvil venezolano: 04XX + 7 dígitos)
  validates :primary_phone, format: {
    with: VENEZUELAN_MOBILE_PHONE_REGEX,
    message: "debe tener formato venezolano válido (ej: 04121234567)"
  }
  validates :secondary_phone, format: {
    with: VENEZUELAN_MOBILE_PHONE_REGEX,
    message: "debe tener formato venezolano válido (ej: 04121234567)"
  }, allow_blank: true # Es opcional

  # 4. Validación del Nombre (solo letras, espacios, ñ y acentos)
  validates :name, format: {
    with: NAME_ONLY_LETTERS_SPACES_REGEX,
    message: "solo permite letras y espacios (incluye ñ y acentos)"
  }

  # 5. Reglas de Negocio Customizadas (Distinción de documento y nombre)
  validate :document_matches_person_type
  validate :document_number_by_type
  validate :dates_logic

  private

  def document_matches_person_type
    # Validamos que el tipo de documento seleccionado pertenezca al tipo de persona
    if document_type.present? && person_type.present?
      if document_type.person_type_id != person_type.id
        errors.add(:document_type, "no es válido para el tipo de persona seleccionado")
      end
    end
  end

  def document_number_by_type
    return if document_number.blank? || document_type.blank?

    case document_type.name.to_s.downcase
    when "cédula", "cedula"
      unless document_number.match?(CEDULA_REGEX)
        errors.add(:document_number, "para cédula debe contener exactamente 7 dígitos")
      end
    when "rif"
      unless document_number.match?(RIF_REGEX)
        errors.add(:document_number, "para RIF debe cumplir formato V-12345678-9 (también acepta sin guiones)")
      end
    when "pasaporte"
      unless document_number.match?(PASSPORT_REGEX)
        errors.add(:document_number, "para pasaporte debe ser alfanumérico de 6 a 9 caracteres")
      end
    end
  end

  def dates_logic
    if document_issue_date.present? && document_expiration_date.present?
      if document_issue_date > Date.today
        errors.add(:document_issue_date, "no puede ser una fecha futura")
      end
      if document_expiration_date < document_issue_date
        errors.add(:document_expiration_date, "debe ser posterior a la fecha de emisión")
      end
    end
  end
end
