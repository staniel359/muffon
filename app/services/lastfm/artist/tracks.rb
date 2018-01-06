module Lastfm
  module Artist
    class Tracks < Service
      def call
        process_tracks
      end

    private

      def process_tracks
        tracks.first(@args.limit).map do |track|
          process_track(track)
        end.sort_by { |t| t.playcount }.reverse
      end

      def tracks
        tracks_array = []
        tracks_page.css('tr[itemprop="track"]').map do |t|
          tracks_array << {
            'title' => t.css('.link-block-target').text
          }
        end
        tracks_array
      end

      def tracks_page
        Nokogiri::HTML.parse(
          RestClient.get(
            "https://www.last.fm/music/#{query_name(@args.name)}"\
            "/+tracks?date_preset=ALL&page=#{page}"
          )
        )
      end

      def lastfm_tracks
        lastfm_tracks_hash = {}
        lastfm_api_tracks.map do |t|
          lastfm_tracks_hash.merge!(
            t['name'].downcase => {
              'listeners' => t['listeners'],
              'playcount' => t['playcount'],
              'mbid' => t['mbid']
            }
          )
        end
        lastfm_tracks_hash
      end

      def lastfm_api_tracks
        @lastfm_api_tracks ||= JSON.parse(
          RestClient.get(
            'http://ws.audioscrobbler.com/2.0/'\
            '?method=artist.gettoptracks'\
            "&artist=#{query_name(@args.name)}"\
            "&api_key=#{ENV['LASTFM_KEY']}&format=json"
          ).body
        )['toptracks']['track']
      end

      def process_track(track)
        Track.where(
          title: track['title'],
          artist_id: ::Artist.where(
            name: @args.name
          ).first_or_create.id
        ).first_or_initialize.tap do |h|
          h.listeners = lastfm_tracks[track['title'].downcase].try(:[], 'listeners')
          h.playcount = lastfm_tracks[track['title'].downcase].try(:[], 'playcount')
          h.mbid = lastfm_tracks[track['title'].downcase].try(:[], 'mbid')
          h.save
        end
      end
    end
  end
end
