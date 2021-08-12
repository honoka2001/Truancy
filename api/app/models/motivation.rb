class Motivation < ApplicationRecord
  belongs_to :user
  validates :date, uniqueness: { scope: :user_id }
    # モチベーション参考値の算出
    def get_total_param
      # 偏差の算出
      def get_sub_param
        sub_weight = 1.5
        sub_date = date.ago(1.days)
        sub = Motivation.find_by(user_id: user_id, date: sub_date).daily_total_commits - user.target
        sub_param = sub * sub_weight
      end

      # 傾きの算出
      def get_diff_param
        diff_weight = 5
        diff_start_date = date.ago(1.days)
        diff_end_date = date.ago(2.days)

        diff = Motivation.find_by(user_id: user_id,
                                  date: diff_start_date).daily_total_commits / Motivation.find_by(user_id: user_id,
                                                                                                  date: diff_end_date).daily_total_commits.to_f
        diff_param = diff * diff_weight
      end

      # 継続量の算出
      def get_avg_param
        avg_weight = 1
        avg_start_date = date.ago(3.days)
        avg_end_date = date.ago(1.days)

        avg = Motivation.where(user_id: user_id,
                               date: avg_start_date..avg_end_date).sum(:daily_total_commits) / 3.to_f
        avg_param = avg * avg_weight
      end
      total_param = get_sub_param + get_diff_param + get_avg_param
    end
end
