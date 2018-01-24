# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Room.destroy_all

user1 = User.create!(username: "Guest User", password: "SuperSecretPassword")
user2 = User.create!(username: "Aaron", password: "Password")
user3 = User.create!(username: "Keith", password: "somethingdirty")

room1 = Room.create!(title: "Best Room Ever", description: "Seriously the Best",
  address: "1 Main St", planet: "Earth", lat: 1, lng: 1, host_id: user1[:id],
  price: 400, prop_type: "House", room_type: "Whole House", num_guests: 1,
  bedrooms: 10, beds: 5,
  pic_url: "http://res.cloudinary.com/dluh2fsyd/image/upload/v1500916134/outerspace_fgw6bx.jpg")
room2 = Room.create!(title: "Room on Mars", description: "Transportation not included",
  address: "1 Mars St", planet: "Europa", lat: 37.763972, lng: 	-122.434297,
  host_id: user1[:id], price: 4000, prop_type: "House", room_type: "Whole House",
  num_guests: 22, bedrooms: 10, beds: 2,
  pic_url: "http://res.cloudinary.com/dluh2fsyd/image/upload/v1500916134/Media-Space-allows-you-to-get-lost-in-space_ef04zi.jpg")
room3 = Room.create!(title: "Room on Europa", description: "Pack your coat!",
  address: "1 Europa St", planet: "Mars", lat: 37.753972, lng: 	-122.431297,
  host_id: user1[:id], price: 420, prop_type: "House", room_type: "Whole House",
  num_guests: 25, bedrooms: 10, beds: 4,
  pic_url: "http://res.cloudinary.com/dluh2fsyd/image/upload/v1500916134/f97e3c98755a87c03e81f1610220e22e_gsykvq.jpg")
room4 = Room.create!(title: "Basement Room!", description: "For the minimalists",
  address: "1 Spooner St", planet: "Earth", lat: 37.743972, lng: 	-122.421297,
  host_id: user1[:id], price: 5000, prop_type: "House", room_type: "Couch",
  num_guests: 1, bedrooms: 10, beds: 15,
  pic_url: "http://res.cloudinary.com/dluh2fsyd/image/upload/v1500916134/efe63a409afc79bdbea73da4f1092c73_gho0co.jpg")
room5 = Room.create!(title: "Cool Alien Room", description: "Yup, a tent, this is what spacebnb has come to",
  address: "1 Woods Drive", planet: "Earth", lat: 37.733972, lng: 	-122.431297,
  host_id: user1[:id], price: 9000, prop_type: "House", room_type: "Single Room",
  num_guests: 1, bedrooms: 10, beds: 12,
  pic_url: "http://res.cloudinary.com/dluh2fsyd/image/upload/v1500916134/e0ab05307007c4a950bda79f23ca91de_g7uplb.jpg")
room6 = Room.create!(title: "Best place on earth?", description: "Cool", address: "42 Main Drive",
  planet: "Earth", lat: 37.723972, lng: 	-122.451297, host_id: user1[:id],
  price: 9000, prop_type: "House", room_type: "Single Room", num_guests: 1,
  bedrooms: 10, beds: 12,
  pic_url: "http://res.cloudinary.com/dluh2fsyd/image/upload/v1501045277/futuro-house_xvkalt.jpg")
room7 = Room.create!(title: "Best home in the milk way", description: "Cool",
  address: "3 Yogi Drive", planet: "Earth", lat: 37.713972, lng: 	-122.461297,
  host_id: user1[:id], price: 9000, prop_type: "House", room_type: "Single Room",
  num_guests: 1, bedrooms: 10, beds: 12,
  pic_url: "http://res.cloudinary.com/dluh2fsyd/image/upload/v1501045276/alien-house-chattanooga_wn1vkd.jpg")
room8 = Room.create!(title: "Galaxy Gem", description: "Cool", address: "81 Main St",
  planet: "Earth", lat: 37.703972, lng: 	-122.421297, host_id: user1[:id],
  price: 9000, prop_type: "House", room_type: "Single Room", num_guests: 1, bedrooms: 10,
  beds: 12, pic_url: "http://res.cloudinary.com/dluh2fsyd/image/upload/v1501045276/6567342019_ce8021704b_z_nhu2gp.jpg")
room9 = Room.create!(title: "Noice", description: "Cool", address: "22 Burr St",
  planet: "Earth", lat: 37.773972, lng: 	-122.411297, host_id: user1[:id],
  price: 9000, prop_type: "House", room_type: "Single Room", num_guests: 1, bedrooms: 10,
  beds: 12, pic_url: "http://res.cloudinary.com/dluh2fsyd/image/upload/v1501045277/20100917-ufohouse2_ctfzhy.jpg")


Review.create!(room_id: room1.id, reviewer_name: "Aaron", body: "best house everrrrrr", rating: 5)
Review.create!(room_id: room2.id, reviewer_name: "Aaron", body: "worst house everrrrrr", rating: 3)
Review.create!(room_id: room3.id, reviewer_name: "Aaron", body: "medium house everrrrrr", rating: 4)
Review.create!(room_id: room4.id, reviewer_name: "Aaron", body: "ab house everrrrrr", rating: 2)
Review.create!(room_id: room5.id, reviewer_name: "Aaron", body: "bc house everrrrrr", rating: 5)
Review.create!(room_id: room6.id, reviewer_name: "Aaron", body: "cd house everrrrrr", rating: 5)
Review.create!(room_id: room7.id, reviewer_name: "Aaron", body: "ef house everrrrrr", rating: 4)
Review.create!(room_id: room8.id, reviewer_name: "Aaron", body: "fg house everrrrrr", rating: 2)
Review.create!(room_id: room9.id, reviewer_name: "Aaron", body: "hi house everrrrrr", rating: 1)
