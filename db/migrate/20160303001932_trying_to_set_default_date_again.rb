class TryingToSetDefaultDateAgain < ActiveRecord::Migration
  def change
  	execute 'ALTER TABLE gestures ALTER COLUMN created_at SET DEFAULT CURRENT_DATE'
  	execute 'ALTER TABLE gestures ALTER COLUMN updated_at SET DEFAULT CURRENT_DATE'
  end
end
