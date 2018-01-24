class Review < ApplicationRecord
  belongs_to :room
  # 
  # belongs_to :user,
  #   primary_key: :id,
  #   foreign_key: :reviewer_name

end
