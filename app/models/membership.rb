class Membership < ApplicationRecord
  belongs_to :group
  belongs_to :member, foreign_key: 'member_id', class_name: 'Profile'
end
