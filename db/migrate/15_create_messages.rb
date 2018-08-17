class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.text :content

      t.belongs_to :conversation, foreign_key: true
      t.belongs_to :profile,      foreign_key: true

      t.integer :track_ids, array: true, default: []

      t.boolean :new, default: true

      t.timestamps
    end
    add_index :messages, :new
  end
end
