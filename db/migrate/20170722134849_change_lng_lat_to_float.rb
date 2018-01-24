class ChangeLngLatToFloat < ActiveRecord::Migration[5.1]
  def change
    remove_column :rooms, :lng
    remove_column :rooms, :lat
    add_column :rooms, :lat, :float, null: false
    add_column :rooms, :lng, :float, null: false
  end
end
