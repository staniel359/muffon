class CreateConversations < ActiveRecord::Migration[5.2]
  def change
    create_table :conversations do |t|
      t.integer :sender_id
      t.integer :recipient_id

      t.timestamps
    end
    add_index :conversations, [:sender_id, :recipient_id], unique: true
  end
end
