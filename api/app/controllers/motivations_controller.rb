# frozen_string_literal: true

class MotivationsController < ApplicationController
  def show
    user = User.find(params[:id])
    date = Time.current

    motivations = user.motivations.order(date: "DESC")
    motivation = motivations.find_by(date: date)
    motivation.get_motivation
  end
end
