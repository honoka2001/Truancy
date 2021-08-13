# frozen_string_literal: true

class CommitsController < ApplicationController
  def index
    user = User.find_by(commit_index_params)
    commits = user.commits
    render json: commit
  end

  def create
    commit = Commit.new(commit_create_params)
    if Commit.save
      render json: { status: 'SUCCESS' }
    else
      render json: { status: 'ERROR' }
    end
  end

  private

  def commit_index_params
    params.require(:user).premit(:uid)
  end

  def commit_create_params
    params.require(:commit).permit(:user_id, :definition_id, :message, :date, :count)
  end
end
