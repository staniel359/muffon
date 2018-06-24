class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  scope :created_desc,     -> { reorder(created_at: :desc) }
  scope :created_asc,      -> { reorder(created_at: :asc) }
  scope :updated_desc,     -> { reorder(updated_at: :desc) }
  scope :plays_count_desc, -> { reorder(plays_count: :desc) }
  scope :plays_count_asc,  -> { reorder(plays_count: :asc) }
end
