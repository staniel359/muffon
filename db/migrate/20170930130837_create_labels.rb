class CreateLabels < ActiveRecord::Migration[5.1]
  def change
    create_table :labels do |t|
      t.string :name
      t.integer :discogs_id
      t.string :image

      t.timestamps
    end
  end
end
