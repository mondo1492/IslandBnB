class Api::TripsController < ApplicationController
  def index
    @trips = current_user.trips.all
  end

  def room_specific_index
    room = Room.find(params[:id])
    @trips = room.trips.all
    render :room_specific_index
  end

  def show
    @trip = Trip.find(params[:id])
  end

  def create
    @trip = Trip.new(trip_params)
    if @trip.save
      render :show
    else
      render json: @trip.errors.full_messages, status: 422
    end
  end

  private

  def trip_params
    params.require(:booking).permit(
      :start_date, :end_date, :room_id, :guest_id, :num_guests, :total_cost)
  end

  def booking_request
    params.require(:booking_request).permit(
      :start_date, :end_date, :room_id)
  end
end
