class Tagging < ApplicationRecord
  belongs_to :taggable,    polymorphic: true, optional: true
  belongs_to :profile_tag, counter_cache: :taggings_count

  validates :taggable_type, :taggable_id, presence: true

  after_create_commit :increment_profile_tag_counter
  after_destroy_commit :decrement_profile_tag_counter

  def increment_profile_tag_counter
    profile_tag.increment!("#{taggable_type.downcase}_taggings_count")
  end

  def decrement_profile_tag_counter
    profile_tag.decrement!("#{taggable_type.downcase}_taggings_count")
  end
end
