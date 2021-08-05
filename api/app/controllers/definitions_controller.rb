class DefinitionsController < ApplicationController

  def index
    @definition = Definition.all
  end

  def new
    @definition = Definition.new
  end

  def create
    @definition = Definition.new
    if @definition.save
      render json: @definition
    else
      render json: @definition.errors, status: 422
    end
  end

end
