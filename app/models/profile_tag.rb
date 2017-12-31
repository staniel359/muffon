class ProfileTag < ApplicationRecord
  belongs_to :profile, counter_cache: :tags_count
  belongs_to :tag
  has_many :taggings, dependent: :destroy
  validates :profile_id, :tag_id, presence: true

  default_scope { order(taggings_count: :desc) }

  def artist_taggings
    taggings.where(model_type: 'Artist')
  end

  def album_taggings
    taggings.where(model_type: 'Album')
  end

  def track_taggings
    taggings.where(model_type: 'Track')
  end
end
