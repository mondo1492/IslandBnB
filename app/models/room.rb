class Room < ApplicationRecord
  # has_many :pictures
  validates :title, :description, :address, :lng, :lat, :host_id,
            :price, :prop_type, :room_type, :num_guests, :bedrooms, :beds,
            :pic_url, presence: true

  belongs_to :user,
    primary_key: :id,
    foreign_key: :host_id

  has_many :trips

  has_many :reviews

  def self.in_bounds(bounds)
    self.where("lat < ?", bounds[:northEast][:lat])
        .where("lat > ?", bounds[:southWest][:lat])
        .where("lng > ?", bounds[:southWest][:lng])
        .where("lng < ?", bounds[:northEast][:lng])
        .where("beds >= ?", bounds[:bed_params][:min])
        .where("price <= ?", bounds[:price_params][:max])
        .where("num_guests <= ?", bounds[:guest_params][:max])
  end

  def host_name
    self.user.username
  end

  def review_count
    self.reviews.count
  end

  def review_rating
    total = 0
    num_reviews = 0
    self.reviews.each do |review|
      total += review.rating
      num_reviews += 1
    end
    total / num_reviews.to_f
  end
end
