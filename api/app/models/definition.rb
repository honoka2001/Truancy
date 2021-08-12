# frozen_string_literal: true

class Definition < ApplicationRecord
  belongs_to :color
  belongs_to :user
  has_many :commits, dependent: :destroy
end
