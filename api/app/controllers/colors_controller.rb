class ColorsController < ApplicationController
    def index
        colors = Color.all
        render json: colors
    end
end
