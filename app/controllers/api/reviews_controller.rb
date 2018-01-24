class Api::ReviewsController < ApplicationController
  def show
    room = Room.find(params[:id])
    @reviews = room.reviews.all
  end

  def create
    @review = Review.new(review_params)
    if @review.save
      render :show_specific
    else
      render json: @room.errors.full_messages, status: 422
    end
  end

  private

  def review_params
    params.require(:review).permit(
      :room_id, :reviewer_name, :body, :rating)
  end
end
