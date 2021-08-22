# frozen_string_literal: true

class CreateDefinitions < ActiveRecord::Migration[5.2]
  def change
    create_table :definitions do |t|
      t.string :name
      t.string :detail
      t.references :color, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
