class Bookmark < ApplicationRecord
  belongs_to :profile
  belongs_to :artist, optional: true
  belongs_to :album, optional: true
  belongs_to :track, optional: true
end
