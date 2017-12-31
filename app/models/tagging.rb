class Tagging < ApplicationRecord
  belongs_to :profile
  belongs_to :tag
  belongs_to :profile_tag, counter_cache: :taggings_count
  belongs_to :model, polymorphic: true
  belongs_to :profile_model, polymorphic: true, optional: true
  belongs_to :artist, foreign_key: 'model_id', optional: true
  belongs_to :profile_artist, foreign_key: 'profile_model_id', optional: true
  belongs_to :album, foreign_key: 'model_id', optional: true
  belongs_to :profile_album, foreign_key: 'profile_model_id', optional: true
  belongs_to :track, foreign_key: 'model_id', optional: true
  belongs_to :profile_track, foreign_key: 'profile_model_id', optional: true

  default_scope { order('created_at asc') }

  after_create_commit :increment_count
  after_destroy_commit :decrement_count

  def increment_count
    profile_tag.increment!(
      "#{model_type.downcase}_taggings_count".to_sym
    )
  end

  def decrement_count
    profile_tag.decrement!(
      "#{model_type.downcase}_taggings_count".to_sym
    )
  end
end
