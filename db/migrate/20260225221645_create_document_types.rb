class CreateDocumentTypes < ActiveRecord::Migration[8.1]
  def change
    create_table :document_types do |t|
      t.string :name
      t.references :person_type, null: false, foreign_key: true

      t.timestamps
    end
  end
end
