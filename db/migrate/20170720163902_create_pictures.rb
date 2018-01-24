class CreatePictures < ActiveRecord::Migration[5.1]
  def change
    create_table :pictures do |t|
      t.string :pic_url
      t.integer :room_id
      t.timestamps
    end
    add_index :pictures, :room_id
  end
end
