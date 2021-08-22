# frozen_string_literal: true

class CreateCommits < ActiveRecord::Migration[5.2]
  def change
    create_table :commits do |t|
      t.references :user, foreign_key: true
      t.references :definition, foreign_key: true
      t.string :message

      t.timestamps
    end
  end
end
