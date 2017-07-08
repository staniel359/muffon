class Conversation < ApplicationRecord
  belongs_to :sender, class_name: 'Profile'
  belongs_to :recipient, class_name: 'Profile'
  validates :sender_id, :recipient_id, presence: true
end
