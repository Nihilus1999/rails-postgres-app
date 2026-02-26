# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_02_26_015633) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"
  enable_extension "pgcrypto"

  create_table "document_types", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name"
    t.uuid "person_type_id", null: false
    t.datetime "updated_at", null: false
    t.index ["person_type_id"], name: "index_document_types_on_person_type_id"
  end

  create_table "person_types", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name"
    t.datetime "updated_at", null: false
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.date "document_expiration_date", null: false
    t.date "document_issue_date", null: false
    t.string "document_number", null: false
    t.uuid "document_type_id", null: false
    t.string "email", null: false
    t.string "name", null: false
    t.uuid "person_type_id", null: false
    t.string "primary_phone", null: false
    t.string "secondary_phone"
    t.datetime "updated_at", null: false
    t.index ["document_number"], name: "index_users_on_document_number", unique: true
    t.index ["document_type_id"], name: "index_users_on_document_type_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["person_type_id"], name: "index_users_on_person_type_id"
  end

  add_foreign_key "document_types", "person_types"
  add_foreign_key "users", "document_types"
  add_foreign_key "users", "person_types"
end
