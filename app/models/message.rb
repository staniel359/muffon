class Message < ApplicationRecord
  belongs_to :conversation
  belongs_to :profile
  validates :conversation_id, :profile_id, :content, presence: true
end
