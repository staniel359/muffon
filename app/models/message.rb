class Message < ApplicationRecord
  belongs_to :conversation
  belongs_to :profile

  validates :conversation_id, :profile_id, presence: true
  validates :content, presence: true, unless: -> { track_ids.present? }
  validates :track_ids, presence: true, unless: -> { content.present? }

  def sendable?
    profile_id.present? && content_present?
  end

  def content_present?
    content.present? || track_ids.present?
  end
end
