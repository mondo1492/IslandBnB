# Spacebnb
URL: [Live Link](https://space-bnb.herokuapp.com)

Spacebnb is an Airbnb clone with a space-theme twist.  It is a full-stack, single-page, web application built using Ruby on Rails, a PostGreSQL database, React/Redux, Google Maps and Cloudinary.

## Features
* User accounts, with secure authentication both on backend and on the frontend
* Search for trips in a geographic location by price, number of guests allowed, and bed number
* Hosts (users) can create, view, and delete listing.
* Users can search for listings by price, bed number, and location, using the Google Maps Api.
* Users may only view trips that they booked personally
* Home can be viewed, booked, and rated.  
* Bookings cannot overlap.

## User Authentication
On the back-end, an encrypted, hashed password is stored in the database (passwords are never saved to the database). On log-in, the provided password is rehashed and compared to the encrypted password in order to verify the log-in.

![login_flow](/app/assets/images/login.gif)

## Home Show Page
All homes are stored in the database, which contains columns for:
  * the home `id`
  * the Geographic location (`lat` and `lng`)
  * `price` per night
  * `title` of the home
  * `description` of the home
  * the `address` of home
  * a `pic_url` referencing its picture hosted on Cloudinary
  * `max_guests`, the maximum number of guests for the home
  * the number of `bedrooms`
  * the number of `beds`
  * the `property_type` of home (Yurt, Cave, House, Igloo, etc.)
  * the `room_type` that the host is servicing (Shared Room, Entire House, or Entire Room)

Below is an example of a state shape for the home index page:

```JavaScript
{
  1: {
    id: 1,
    lat: 41.1706021488593,
    lng: -74.9294859019342,
    price: 138,
    title: "Space room",
    description: "Best room",
    address: "1 Mars St",
    host_id: 3,
    average_stars: 2.4,
    max_guests: 12,
    beds: 12,
    room_type: "Private Room"
    pic_url: "http://"
  },
  2: {
    id: 1,
    lat: 41.1706021488593,
    lng: -74.9294859019342,
    price: 138,
    title: "Cool Room",
    description: "Lorem Ipsum",
    address: "2 Europa Drive",
    host_id: 3,
    average_stars: 2.4,
    max_guests: 12,
    beds: 12,
    room_type: "Private Room"
    pic_url: "http://"
  }
}
```

## Map Filters
Spacebnb offers real-time map-filtering based map location. The Redux state is updated with a list of all the homes matching both the filter query and location bounds. Map markers are then populated on the map as an overlay for every location stored in the state. With every filter or idle state of the map, old map markers are replaced with new map markers; the bounds also resize automatically when zooming in or out of the map.

![search](/app/assets/images/map_search.gif)

#### Implementation

On the backend, the room model will take in a query based on a latitude and longitude rectangular boundary. The home model also takes filters by bed number, guest number, and max price.

  ``` Ruby
  def self.in_bounds(bounds)
    self.where("lat < ?", bounds[:northEast][:lat])
        .where("lat > ?", bounds[:southWest][:lat])
        .where("lng > ?", bounds[:southWest][:lng])
        .where("lng < ?", bounds[:northEast][:lng])
        .where("beds >= ?", bounds[:bed_params][:min])
        .where("price <= ?", bounds[:price_params][:max])
        .where("num_guests <= ?", bounds[:guest_params][:max])
  end
  ```

On the frontend, a filter object will be a slice of state that will be passed in when making an ajax request for an index of homes, and the subsequent response will update the map api with the filtered index.

``` JavaScript
export const updateFilter = (filter, value) => (dispatch, getState) => {
  dispatch(changeFilter(filter, value));
  return fetchHomes(getState().filters)(dispatch);
};
```

Here is an example of a filter state slice:
```
  {
    bounds: {
      northEast: {lat: 39.123551, lng: -73.951231},
      southWest: {lat: 41.139024, lng: -69.994121}.
      bed_params: {min: 1},
      price_params: {max: 0},,
      guest_params: {max: 1},
    }
  }
```

## Adding a booking
![create_listing](/app/assets/images/create_listing.gif)


## Booking a Trip
All trips (bookings) are stored in one table in the database, which contains columns for `id`, the `guest_id` that references a guest (user), the `room_id` that references the booked home, and the `start_date`, `end_date`, and `total_cost` of the trip. Overlapping booking requests are not allowed and blocked out on calendar.


![booking](/app/assets/images/booking.gif)

### Viewing Trips
Users can only view their own trips. The user can view details about their trip, the amount they paid, and if they have to, cancel their trips.


## Reviews
A review requires a rating (1-5) and a body. Upon creating a review, the review will be posted on the respective home show page. In the backend, each review will be tallied and the average rating calculated. This information will be displayed on the home index page.

![review](/app/assets/images/review.gif)

## Future Concepts
During my two week course of development, I discovered many more implementation that can deliver a better user experience listed below:

#### User Profile Pages
Along with reviews, adding user profiles will improve the utility, and give a social element to the app.

#### More Filters and Live Filtering
Filtering by amenities and housing accommodations will improve usability. Adding dropdowns and modals will allow the expansion of such filters.

#### Improved Styling/Design
Compared with Airbnb, there are countless UX design tweaks that I can improve on such as: adding a carousel that spins through photos of the home. Adding a slider bar to filter budgets and guest size.
