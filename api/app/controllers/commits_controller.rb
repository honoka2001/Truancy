class CommitsController < ApplicationController
    def index 
        commits = Commit.all
        render json: { data: commits }
    end
end
