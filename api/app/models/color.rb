# frozen_string_literal: true

class Color < ApplicationRecord
  has_many :definitions
end
