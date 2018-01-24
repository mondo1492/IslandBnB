# class Api::PicturesController < ApplicationController
#   def new
#     @picture = Picture.new
#   end
#
#   def create
#     @picture = Picture.new(user_params)
#     @picture.save
#     render json: @picture.errors.full_messages, status: 422
#   end
#
#   def destroy
#     @picture = Picture.new(user_params)
#     @picture.save
#     render json: @picture.errors.full_messages, status: 422
#   end
#
#   private
#
#   def user_params
#     params.require(:picture).permit(:pic_url)
#   end
# end
