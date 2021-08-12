# frozen_string_literal: true

class MotivationsController < ApplicationController
  def index
    user = User.find(1)
    date = Date.today

    motivations = user.motivations
    motivation = motivations.find_by(date: date)
    motivation.get_motivation
  end
end
