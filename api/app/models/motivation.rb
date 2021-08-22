# frozen_string_literal: true

class Motivation < ApplicationRecord
  belongs_to :user
  validates :date, uniqueness: { scope: :user_id }

  # モチベーション算出
  def get_motivation
    # 偏差の算出
    def get_sub_param
      sub_weight = 1.5
      sub_date = date - 1
      sub = Motivation.find_by(user_id: user_id, date: sub_date).daily_total_commits - user.target
      sub_param = sub * sub_weight
    end

    # 傾きの算出
    def get_diff_param
      diff_weight = 5
      diff_start_date = date - 1
      diff_end_date = date - 2
      diff_start_daily_total_commits = Motivation.find_by(user_id: user_id, date: diff_start_date).daily_total_commits
      diff_end_daily_total_commits = Motivation.find_by(user_id: user_id, date: diff_end_date).daily_total_commits

      diff = diff_end_daily_total_commits == 0 ? 0 : diff_start_daily_total_commits.to_f / diff_end_daily_total_commits.to_f

      diff_param = diff * diff_weight
    end

    # 継続量の算出
    def get_avg_param
      avg_weight = 1
      avg_start_date = date - 3
      avg_end_date = date - 1

      avg = Motivation.where(user_id: user_id,
                             date: avg_start_date..avg_end_date).sum(:daily_total_commits) / 3.to_f
      avg_param = avg * avg_weight
    end

    # モチベーション参考値の算出
    def get_total_param
      total_param = get_sub_param + get_diff_param + get_avg_param
    end

    update(sub_param: get_sub_param, diff_param: get_diff_param, avg_param: get_avg_param, total_param: get_total_param)
    avg_start_date = date.-2
    avg_end_date = date
    max = Motivation.where(user_id: user_id, date: avg_start_date..avg_end_date).maximum(:total_param)
    motivation = total_param / max.to_f * 100
    motivation = 0 if motivation < 0
    update(motivation: total_param / max.to_f * 100)
  end
end
