class CreateListings < ActiveRecord::Migration[5.1]
  def change
    create_table :listings do |t|
      t.integer :host
      t.integer :room_id
      t.timestamps
    end
  end
end
