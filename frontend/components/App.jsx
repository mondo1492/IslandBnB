import React from 'react';
import GreetingsContainer from './greeting/greetings_container';
import SessionFormContainer from './session/session_forms_container';
import { ProtectedRoute } from '../util/route_util';
import { Route, Switch, Link } from 'react-router-dom';
import  LeftLowerNav  from './nav_bar/left_lower_nav';
import MainDisplayContainer from './main_display/main_display_container';
import CreateRoomContainer from './rooms/room_container';
import GeoLocation from './rooms/geo_location';
import GoogleMap from './google_map/map';
import ListingsContainer from './user_listings/user_listings_container';
import ShowRoomContainer from './show_individual_room/show_room_container';
import SearchContainer from './home_search/search_container';
import TripsContainer from './trips/trips_container';
import UserTripsContainer from './trips/user_trips_container';
import Front from './front_page/front';
// <Route exact path="/" component={ TripsContainer } />
const App = () => (
  <div>
    <header>
      <GreetingsContainer/>
      <LeftLowerNav/>
    </header>
    <div id="header-padder"></div>
    <div id="all-content">

      <Switch>
        <Route exact path="/" component={  Front } />
        <Route exact path="/trips" component={  UserTripsContainer } />
        <Route exact path="/rooms/:id" component={ ShowRoomContainer } />
        <ProtectedRoute exact path="/create" component={ CreateRoomContainer }/>
        <ProtectedRoute path="/listings/:id" component={ ListingsContainer }/>
      </Switch>

    </div>
  </div>
);

export default App;
<Route exact path="/" component={  SearchContainer } />

//
//
// <Switch>
// </Switch>
//       //
