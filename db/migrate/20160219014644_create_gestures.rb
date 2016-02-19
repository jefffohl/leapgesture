class CreateGestures < ActiveRecord::Migration
  def change
    create_table :gestures do |t|
      t.json :gesture, null: false
      t.timestamps null: false
    end
  end
end
