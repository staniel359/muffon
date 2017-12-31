class Tag < ApplicationRecord
  validates :name, presence: true
  has_many :taggings
  has_many :profiles, through: :taggings
end
