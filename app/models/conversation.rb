class Conversation < ApplicationRecord
  belongs_to :sender, class_name: 'Profile'
  belongs_to :recipient, class_name: 'Profile'

  has_many :messages, dependent: :destroy

  validates :sender_id, :recipient_id, presence: true

  def sender?(profile_id)
    sender_id == profile_id
  end

  def recipient?(profile_id)
    recipient_id == profile_id
  end

  def member?(profile_id)
    sender?(profile_id) || recipient?(profile_id)
  end

  def other_member(profile_id)
    sender_id == profile_id ? recipient : sender
  end

  def other_member_messages(profile_id)
    messages.where.not(profile_id: profile_id)
  end
end
