class AddBannedToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :banned, :boolean, :default => false, :null => false
  end
end
