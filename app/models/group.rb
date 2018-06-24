class Group < ApplicationRecord
  belongs_to :owner, class_name: 'Profile'

  has_many :memberships, dependent: :destroy
  has_many :members, through: :memberships

  validates :owner_id, presence: true

  mount_uploader :avatar, AvatarUploader

  after_create_commit :enter_group

  scope :members_count_desc, -> { order(members_count: :desc) }

  def enter_group
    owner.memberships.create(group_id: id, role: 'admin')
  end
end
