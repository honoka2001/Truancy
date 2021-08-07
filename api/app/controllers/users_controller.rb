class UsersController < ApplicationController
  def create
    if user = User.find_by(user_create_params) # (uid:uid)
    else
      user = User.create(user_create_params)
    end
    render json: user
  end

  private

  def user_create_params
    params.require(:user).permit(:uid)
  end
end
