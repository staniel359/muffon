class CreateMessages < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.belongs_to :conversation, foreign_key: true
      t.belongs_to :profile, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
