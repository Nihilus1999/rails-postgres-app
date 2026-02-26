class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users, id: :uuid do |t|
      t.references :person_type, type: :uuid, null: false, foreign_key: true
      t.references :document_type, type: :uuid, null: false, foreign_key: true
      t.string :document_number, null: false
      t.date :document_issue_date, null: false
      t.date :document_expiration_date, null: false
      t.string :name, null: false
      t.string :email, null: false
      t.string :primary_phone, null: false
      t.string :secondary_phone

      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :document_number, unique: true
  end
end
