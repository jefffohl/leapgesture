class AddGesturesNameField < ActiveRecord::Migration
  def change
  	add_column :gestures, :name, :string
  end
end
