class CreateUsers < ActiveRecord::Migration[8.0] # La versión puede variar según tu Rails
  def change
    create_table :users do |t|
      t.references :person_type, null: false, foreign_key: true
      t.references :document_type, null: false, foreign_key: true

      # null: false hace que la base de datos rechace campos vacíos
      t.string :document_number, null: false
      t.date :document_issue_date, null: false
      t.date :document_expiration_date, null: false
      t.string :name, null: false
      t.string :email, null: false
      t.string :primary_phone, null: false

      # secondary_phone se queda normal porque la prueba dice "(campo opcional)"
      t.string :secondary_phone

      t.timestamps
    end

    # Agregamos un índice único para que no se repitan correos ni documentos
    add_index :users, :email, unique: true
    add_index :users, :document_number, unique: true
  end
end
