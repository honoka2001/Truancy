class CommitsController < ApplicationController
  def index
    # commits = Commit.joins(:definition).where(user_id: params[:id])
    commits = Commit.joins(:definition).select('commits.id, commits.message, commits.definition_id, commits.count, definitions.name, definitions.color_id').where(user_id: params[:id])
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

