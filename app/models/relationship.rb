class Relationship < ApplicationRecord
  belongs_to :follower, class_name: 'Profile'
  belongs_to :following, class_name: 'Profile'
end
