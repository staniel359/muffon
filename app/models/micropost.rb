class Micropost < ApplicationRecord
  belongs_to :profile
  validates :content, presence: true

  scope :own_board_posts, lambda {
    where('microposts.profile_id = microposts.board_id')
  }
end
