class AddPictureColRoom < ActiveRecord::Migration[5.1]
  def change
    add_column :rooms, :pic_url, :string, null: false
  end
end
