class ApplicationController < ActionController::API
  def current_user(uid)
    current_user = User.find_by(uid: uid)
  end
end
