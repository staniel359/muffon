class TestJob < ApplicationJob
  queue_as :default

 #  def perform(profile_id)
	# 	i = 0
	# 	1.upto(20) do |i|
	# 		width = i * 5
	# 		ActionCable.server.broadcast "tracks_import_#{profile_id}", { id: profile_id, c: i, w: width }
	# 		i += 1
	# 		sleep 0.5
	# 	end
	# end

	def perform(profile_id)
		profile = Profile.find(profile_id)
		profile.profile_artists.order(count: :desc).map do |a|
        similars = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=#{CGI.escape(a.artist.name)}&limit=50&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['similarartists']['artist']
        similars.map do |s|
          rec = Recommendation.where(profile_id: profile_id, artist_name: s['name']).first_or_create!(image: s['image'][2]['#text'])
          rec.profile_artists << a.id unless rec.profile_artists.include?(a.id)
          rec.save!
          tags = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=#{CGI.escape(rec.artist_name)}&api_key=#{ENV["LASTFM_KEY"]}&format=json").read)['toptags']['tag']
          tags.first(10).map do |t|
            tag = Tag.where('lower(name) = lower(?)', t['name']).first_or_create!(name: t['name'])
            rec.tags << tag.id unless rec.tags.include?(tag.id)
            rec.save
          end
        end
      end
	end


end
