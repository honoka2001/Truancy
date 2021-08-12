class Motivation < ApplicationRecord
  belongs_to :user
  validates :date, uniqueness: { scope: :user_id }
      # 偏差の算出
      def get_sub_param
        sub_weight = 1.5
        sub_date = date.ago(1.days)
        sub = Motivation.find_by(user_id: user_id, date: sub_date).daily_total_commits - user.target
        sub_param = sub * sub_weight
      end
end
