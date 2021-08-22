# frozen_string_literal: true

class Commit < ApplicationRecord
  belongs_to :user
  belongs_to :definition

  def add_daily_total_commits
    motivation = Motivation.find_by(user_id: self.user_id, date: self.date)
    daily_total_commits = self.count + motivation.daily_total_commits
    motivation.update(daily_total_commits: daily_total_commits)
  end

end
