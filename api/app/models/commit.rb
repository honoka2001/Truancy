# frozen_string_literal: true

class Commit < ApplicationRecord
  belongs_to :user
  belongs_to :definition
end
