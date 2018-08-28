class Tag < ApplicationRecord
  has_many :profile_tags

  validates :name, presence: true

  def self.with(name:)
    where('LOWER(name) = ?', name.downcase)
  end
end
