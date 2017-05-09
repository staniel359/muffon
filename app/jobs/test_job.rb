class TestJob < ApplicationJob
  queue_as :default

  	def perform(profile_id)
		i = 0
		1.upto(100) do |i|
			width = i
			ActionCable.server.broadcast "tracks_import_#{profile_id}", { id: profile_id, c: i, w: width }
			i += 1
			sleep 0.5
		end
	end

end
