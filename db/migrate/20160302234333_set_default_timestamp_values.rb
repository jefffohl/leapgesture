class SetDefaultTimestampValues < ActiveRecord::Migration
  def change
  	change_column :gestures, :created_at, :datetime, default: 'now()'
  	change_column :gestures, :updated_at, :datetime, default: 'now()'
  end
end
