class ProfileTag < ApplicationRecord
  belongs_to :profile
  belongs_to :tag
  validates_presence_of :profile_id, :tag_id
end
