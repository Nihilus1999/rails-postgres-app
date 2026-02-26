class CreatePersonTypes < ActiveRecord::Migration[8.1]
  def change
    create_table :person_types, id: :uuid do |t|
      t.string :name

      t.timestamps
    end
  end
end
