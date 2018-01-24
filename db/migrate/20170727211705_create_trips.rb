class CreateTrips < ActiveRecord::Migration[5.1]
  def change
    create_table :trips do |t|
      t.string :start_date, null: false
      t.string :end_date, null: false
      t.integer :room_id, null: false
      t.integer :guest_id, null: false
      t.integer :num_guests, null: false
      t.float :total_cost, null: false
      t.timestamps
    end
  end
end
