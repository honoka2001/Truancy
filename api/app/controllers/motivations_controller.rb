# frozen_string_literal: true

class MotivationsController < ApplicationController
  def show
    user = User.find(params[:id])
    today = Date.today

    motivations = user.motivations.order(date: 'DESC')

    # motivationsテーブルにレコードのない日にコミット数0を挿入しモチベーション算出
    non_commits_date = motivations.last.date + 1
    (non_commits_date..today).each do |date|
      next if motivations.find_by(date: date)

      Motivation.create(date: date, user_id: user.id, daily_total_commits: 0)
      motivation = Motivation.find_by(date: date, user_id: user.id)
      motivation.get_motivation
    end
    # 今日のモチベーション算出
    motivation = motivations.find_by(date: today)
    motivation.get_motivation

    # 今日のモチベーション率
    dayMotivation = motivation.motivation

    # 詳細パラメータ配列
    # params = [motivation.sub_param, motivation.diff_param, motivation.avg_param]

    render json: { dayMotivation: dayMotivation }
  end

end
