# frozen_string_literal: true

class CreateMotivations < ActiveRecord::Migration[5.2]
  def change
    create_table :motivations do |t|
      t.integer :daily_total_commits
      t.integer :motivation
      t.date :date
      t.integer :total_param
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
