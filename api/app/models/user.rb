# frozen_string_literal: true

class User < ApplicationRecord
  has_many :commits, dependent: :destroy
  has_many :definitions, dependent: :destroy
  has_many :motivations

  has_many :follower, class_name: 'Relationship', foreign_key: 'follower_id', dependent: :destroy
  has_many :followed, class_name: 'Relationship', foreign_key: 'followed_id', dependent: :destroy

  has_many :following_user, through: :follower, source: :followed
  has_many :follower_user, through: :followed, source: :follower

  validates :uid, presence: true
  attribute :target, :integer, default: 10
end
