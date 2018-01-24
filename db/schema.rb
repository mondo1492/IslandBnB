# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170727211705) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "listings", force: :cascade do |t|
    t.integer "host"
    t.integer "room_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pictures", force: :cascade do |t|
    t.string "pic_url"
    t.integer "room_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["room_id"], name: "index_pictures_on_room_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer "room_id", null: false
    t.string "reviewer_name", null: false
    t.text "body", null: false
    t.integer "rating", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rooms", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.string "address", null: false
    t.string "planet"
    t.integer "host_id", null: false
    t.integer "price", null: false
    t.string "prop_type", null: false
    t.string "room_type", null: false
    t.integer "num_guests", null: false
    t.integer "bedrooms", null: false
    t.integer "beds", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "pic_url", null: false
    t.float "lat", null: false
    t.float "lng", null: false
    t.index ["host_id"], name: "index_rooms_on_host_id"
  end

  create_table "trips", force: :cascade do |t|
    t.string "start_date", null: false
    t.string "end_date", null: false
    t.integer "room_id", null: false
    t.integer "guest_id", null: false
    t.integer "num_guests", null: false
    t.float "total_cost", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
