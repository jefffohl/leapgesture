class ChangeDateTimeDefaultToNow < ActiveRecord::Migration
  def change
  	execute 'ALTER TABLE gestures ALTER COLUMN created_at SET DEFAULT now()'
  	execute 'ALTER TABLE gestures ALTER COLUMN updated_at SET DEFAULT now()'
  end
end
