class UsersController < ApplicationController
	def create
		if user = User.find_by(user_create_params)
			render json:{user}
		else
			user = User.create(user_create_params)
			render json:{user}
		end
	end
	private

  def user_create_params
    params.require(:user).permit(:uid)
  end
end
