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
    today_motivation_per = motivation.motivation
    # 今日のコミット数
    today_total_commits = motivation.daily_total_commits
    # 今日含めた7日のコミット数
    week_total_commits = motivations.where(date: today - 6..today).sum(:daily_total_commits)
    # 今日含めた30日のコミット数
    month_total_commits = motivations.where(date: today - 29..today).sum(:daily_total_commits)

    # 今日含めて15日分のモチベーションレコード取得
    week_motivations = motivations.where(date: today - 14..today)
    # カラムを配列として取得
    week_date = week_motivations.order(date: 'ASC').pluck(:date).reverse.map {|e| e.strftime("%m/%d") }
    week_motivation_per = week_motivations.pluck(:motivation).reverse
    week_daily_total_commits = week_motivations.pluck(:daily_total_commits).reverse

    # 定義の割合
    week_definition_sum = user.commits.where(date: today - 7..today).joins(:definition).group('definitions.name').sum(:count)
    week_definition_names = week_definition_sum.keys
    week_definition_sum = week_definition_sum.values

    # 今日含めて350日分のモチベーションレコード取得
	motivations = user.motivations.order(date: 'ASC')
    year_motivations = motivations.where(date: today - 349..today)

    # コミット総数
    total_commits = motivations.sum(:daily_total_commits)

    # 詳細パラメータ配列
    # params = [motivation.sub_param, motivation.diff_param, motivation.avg_param]

    render json: { today_motivation_per: today_motivation_per,
                   week_date: week_date,
                   today_total_commits: today_total_commits,
                   week_total_commits: week_total_commits,
                   month_total_commits: month_total_commits,
                   week_motivation_per: week_motivation_per,
                   week_daily_total_commits: week_daily_total_commits,
                   week_definition_names: week_definition_names,
                   week_definition_sum: week_definition_sum,
                   year_motivations: year_motivations,
                   total_commits: total_commits }
  end
end
