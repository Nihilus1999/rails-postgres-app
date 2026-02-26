# Limpiamos las tablas por si ejecutamos el comando varias veces
User.destroy_all
DocumentType.destroy_all
PersonType.destroy_all

# Creamos los Tipos de Persona
natural = PersonType.create!(name: "Natural")
juridica = PersonType.create!(name: "Jurídica")

# Creamos los Tipos de Documento asignados a su Tipo de Persona
DocumentType.create!(name: "Cédula", person_type: natural)
DocumentType.create!(name: "Pasaporte", person_type: natural)
DocumentType.create!(name: "RIF", person_type: juridica)

puts "¡Tipos de Persona y Documentos creados con éxito!"
