class Membership < ApplicationRecord
  belongs_to :group, counter_cache: :members_count
  belongs_to :member, foreign_key: 'member_id', class_name: 'Profile'
end
