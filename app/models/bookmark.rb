class Bookmark < ApplicationRecord
  belongs_to :profile
  belongs_to :bookmarkable, polymorphic: true, optional: true

  validates :bookmarkable_type, :bookmarkable_id, presence: true

  scope :associated, -> { includes(:bookmarkable) }
end
