class CreateDocumentTypes < ActiveRecord::Migration[8.1]
  def change
    create_table :document_types, id: :uuid do |t|
      t.string :name
      t.references :person_type, type: :uuid, null: false, foreign_key: true

      t.timestamps
    end
  end
end
