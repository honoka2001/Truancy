class ApplicationController < ActionController::API
  before_action :current_user
  def current_user(user_id)
    current_user = User.find_by(id: user_id)
  end
end
