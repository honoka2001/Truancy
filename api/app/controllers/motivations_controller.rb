# frozen_string_literal: true

class MotivationsController < ApplicationController
  def show
    user = User.find(params[:id])
    date = Time.current

    motivations = user.motivations.order(date: "DESC")
    motivation = motivations.find_by(date: date)
    motivation.get_motivation

    # 今日のモチベーション率
    dayMotivation = motivation.motivation

    # 詳細パラメータ配列
    # params = [motivation.sub_param, motivation.diff_param, motivation.avg_param]

    render json: { dayMotivation: dayMotivation }
  end

end
