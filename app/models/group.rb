class Group < ApplicationRecord
  validates :owner_id, presence: true
  has_many :memberships, dependent: :destroy
  has_many :members, through: :memberships
  belongs_to :owner, class_name: 'Profile'

  mount_uploader :avatar, AvatarUploader

  after_create_commit :enter_group

  def enter_group
    owner.memberships.create(group_id: id, role: 'admin')
  end
end
