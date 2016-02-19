class Gesture < ActiveRecord::Base
	validates :gesture, presence: true
end
