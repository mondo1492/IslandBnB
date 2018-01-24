```js
{
  session: {
    currentUser: {
    id: 1,
    username: "Buzz Aldrin"
    }
    errors:[] 
  },
  rooms: {
    entities: {
      1: {
        id: 1,
        title: "Mars Red Spot",
        price: "3000",
        planet: "mars",
        lng: "41.23123",
        lat: "51.324234234",
        room_type: "Entire home/apt",
        rating: 5,
        num_rating: 324
      },
      23: {
        id: 23,
        title: "Europa",
        description: "There are living things here!",
        address: "1 Europa Drive",
        planet: "europa",
        lng: "1.23123",
        lat: "1.324234234",
        rules: "No walking on the ice",
        host_id: 2,
        price: "1500",
        prop_type: "House",
        room_type: "Entire home/apt",
        num_guests: 35,
        bedrooms: 12,
        beds: 20,
        amenities: {
          wifi: true,
          gym: false,
          heating: true,
          tv: true,
          fireplace: true,
          etc...
        }
    },
    currentRoom: 23,
      reviews: ["1", "3", "4"]
    }
  },
  reviews: {
    "1": {
      id: 2,
      room_id: 23,
      reviewer_name: "Marvin",
      body: "Mars is better",
      rating: 4
    }
  },
  trips: {
    entities: {
      26: {
        id: 23,
        title: "Marvin's Place on Mars",
        check_in: 07/17/2017,
        check_out: 09/18/2017,
        guests: 2
      }
    }
  }
}
```
