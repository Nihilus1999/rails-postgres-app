User.destroy_all
DocumentType.destroy_all
PersonType.destroy_all

natural = PersonType.create!(name: "Natural")
juridica = PersonType.create!(name: "Jurídica")


DocumentType.create!(name: "CI", person_type: natural)
DocumentType.create!(name: "Pasaporte", person_type: natural)
DocumentType.create!(name: "RIF", person_type: juridica)

puts "seeds created successfully"
