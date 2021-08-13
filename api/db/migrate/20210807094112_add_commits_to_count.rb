# frozen_string_literal: true

class AddCommitsToCount < ActiveRecord::Migration[5.2]
  def change
    add_column :commits, :count, :integer
  end
end
