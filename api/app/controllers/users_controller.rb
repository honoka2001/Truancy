class UsersController < ApplicationController
	def create
		

	end
	private

  def user_create_params
    params.require(:user).permit(:uid)
  end
end
