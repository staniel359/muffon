class Message < ApplicationRecord
  belongs_to :conversation
  belongs_to :profile

  validates :conversation_id, :profile_id, presence: true
  validates :content, presence: true, unless: -> { track_ids.present? }
  validates :track_ids, presence: true, unless: -> { content.present? }

  scope :new_messages, -> { where(new: true) }

  def sendable?
    profile_id.present? && message_content_present?
  end

  def content_present?
    content.present? || track_ids.present?
  end

  def to(profile_id)
    where.not(profile_id: profile_id)
  end
end
