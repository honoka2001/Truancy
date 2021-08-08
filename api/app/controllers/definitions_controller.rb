class DefinitionsController < ApplicationController

  def index
    definitions = Definition.all
    render json: definitions
  end

  def create
    definition = Definition.new
    if definition.save
      render json: definition
    else
      render json: definition.errors, status: 422
    end
  end

end
