class ChangeGestureFieldType < ActiveRecord::Migration
  def change
  	change_column :gestures, :gesture, :text
  end
end
