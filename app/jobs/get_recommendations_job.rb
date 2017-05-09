class GetRecommendationsJob < ApplicationJob
  queue_as :default

  def perform(profile_id)
  	profile = Profile.find_by(id: profile_id)
    profile.profile_artists.order(count: :desc).map do |a|
    	similars = JSON.parse(open("http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=#{CGI.escape(a.artist.name)}&limit=50&api_key=fb914bd85f85f89d750e93c8bfb70012&format=json").read)['similarartists']['artist']
    	similars.map do |s|
    		rec = Recommendation.where(profile_id: profile_id, artist_name: s['name']).first_or_create!(image: s['image'][2]['#text'])
    		rec.artists << a.artist_id
    		rec.save!
    	end
    end
  end
end
