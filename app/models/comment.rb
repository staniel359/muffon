class Comment < ApplicationRecord
  belongs_to :profile
  belongs_to :commentable, polymorphic: true, optional: true

  validates :commentable_type, :commentable_id, presence: true
  validates :content, presence: true
end
