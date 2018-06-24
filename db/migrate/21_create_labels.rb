class CreateLabels < ActiveRecord::Migration[5.1]
  def change
    create_table :labels do |t|
      t.string :name
      t.string :mbid
      t.string :image

      t.timestamps
    end
  end
end
