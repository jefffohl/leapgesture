class RenameGestureColumn < ActiveRecord::Migration
  def change
  	rename_column :gestures, :gesture, :data
  end
end
