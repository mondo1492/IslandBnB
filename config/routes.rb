Rails.application.routes.draw do
  root to: 'static_pages#root'



  namespace :api, defaults: { format: :json } do
    resources :users, only: %i(new create)
    resource :session, only: %i(new create destroy)
    resources :rooms
    resources :listings, only: :show
    resources :pictures, only: %i(new index create destroy)
    resources :reviews, only: %i(show create)
    resources :trips, only: %i(show create index room_specific_index)
    get "trips/specific/:id", to: "trips#room_specific_index"
  end
end
