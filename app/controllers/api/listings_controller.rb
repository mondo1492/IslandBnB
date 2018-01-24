class Api::ListingsController < ApplicationController
  def show
    user = User.find(params[:id])
    @listings = user.rooms
  end
end
