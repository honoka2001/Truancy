# frozen_string_literal: true

class AddCommitsToDate < ActiveRecord::Migration[5.2]
  def change
    add_column :commits, :date, :date
  end
end
