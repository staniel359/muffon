class Label < ApplicationRecord
  validates :name, presence: true

  def self.with(name:)
    where('LOWER(name) = ?', name.downcase)
  end
end
