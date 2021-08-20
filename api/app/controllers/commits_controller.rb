class CommitsController < ApplicationController
  def index
    # commits = Commit.joins(:definition).where(user_id: params[:id])
    commits = Commit.joins(:definition).select('commits.id, commits.message, commits.definition_id, commits.count, definitions.name, definitions.color_id').where(user_id: params[:id])
    render json: commits
  end

  def create
    commit = Commit.new(commit_create_params)
    if commit.save
      if Motivation.find_by(user_id: commit_create_params[:user_id], date: commit_create_params[:date])
        commit.add_daily_total_commits
      else
        Motivation.create(user_id: commit_create_params[:user_id], date: commit_create_params[:date], daily_total_commits: commit_create_params[:count])
      end
      render json: { status: 'SUCCESS' }
    else
      render json: { status: 'ERROR'  }
    end
  end

  def destroy
    commit = Commit.find(commit_destroy_params)
    if commit.destroy
      render json: { status: 'SUCCESS' }
    else
      render json: { status: 'ERROR' }
    end
  end

  private

  def commit_create_params
    params.require(:commit).permit(:user_id, :definition_id, :message, :date, :count)
  end

  # def commit_destroy_params
  #   params.require(:commit).premit(:id)
  # end
end
