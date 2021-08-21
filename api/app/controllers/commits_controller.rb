class CommitsController < ApplicationController
  def index
    # commits = Commit.joins(:definition).where(user_id: params[:id])
    commits = Commit.joins(definition: :color).select('colors.code, commits.date, commits.count,  commits.message, definitions.name, commits.id').where(user_id: params[:id])
    render json: commits
  end

  def create
    commit = Commit.new(commit_create_params)
    if commit.save
      render json: { status: 'SUCCESS' }
    else
      render json: { status: 'ERROR'  }
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

