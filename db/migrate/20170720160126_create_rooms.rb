class CreateRooms < ActiveRecord::Migration[5.1]
  def change
    create_table :rooms do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :address, null: false
      t.string :planet
      t.integer :lng, null: false
      t.integer :lat, null: false
      t.integer :host_id, null: false
      t.integer :price, null: false
      t.string :prop_type, null: false
      t.string :room_type, null: false
      t.integer :num_guests, null: false
      t.integer :bedrooms, null: false
      t.integer :beds, null: false
      t.timestamps
    end
    add_index :rooms, :host_id
  end
end
