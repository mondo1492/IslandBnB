class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.integer :room_id, null: false
      t.string :reviewer_name, null: false
      t.text :body, null: false
      t.integer :rating, null: false
      t.timestamps
    end
  end
end
