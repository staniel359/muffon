class Tag < ApplicationRecord
  has_many :profile_tags

  validates :name, presence: true

  def artists
    Artist.where('? = ANY(tag_ids)', id)
  end
end
