class CommitsController < ApplicationController
    def create
        commit = Commit.new(commit_params)
        if Commit.save
            render json: { status: 'SUCCESS' }
        else
            render json: { status: 'ERROR' }
        end
    end
    
end
