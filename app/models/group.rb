class Group < ApplicationRecord
  belongs_to :owner, class_name: 'Profile'

  has_many :memberships, dependent: :destroy
  has_many :members, through: :memberships

  validates :owner_id, presence: true

  mount_uploader :avatar, AvatarUploader

  scope :members_count_desc, -> { order(members_count: :desc, id: :asc) }

  def owner?(profile_id)
    owner_id == profile_id
  end
end
