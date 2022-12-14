class CommitsController < ApplicationController
  def index
    # commits = Commit.joins(:definition).where(user_id: params[:id])
    commits = Commit.joins(definition: :color).select('colors.code, commits.date, commits.count,  commits.message, definitions.name, commits.id').where(user_id: params[:id])
    render json: commits
  end

  def create
    commit = Commit.new(commit_create_params)
    if commit.save
      if Motivation.find_by(user_id: commit_create_params[:user_id], date: commit_create_params[:date])
        commit.add_daily_total_commits
      else
        Motivation.create(user_id: commit_create_params[:user_id], date: commit_create_params[:date],
                          daily_total_commits: commit_create_params[:count])
      end

      # モチベーション再計算
      update_motivation_date = commit.date + 3
      (commit.date..update_motivation_date).each do |date|
        motivation = Motivation.find_by(date: date, user_id: commit_create_params[:user_id])
		if motivation
        	motivation.get_motivation
		end
      end

      render json: { status: 'SUCCESS' }
    else
      render json: { status: 'ERROR' }
    end
  end

  def destroy
    Commit.find(params[:id]).delete
  end

  private

  def commit_create_params
    params.require(:commit).permit(:user_id, :definition_id, :message, :date, :count)
  end

  # def commit_destroy_params
  #   params.require(:commit).premit(:id)
  # end
end
