module Lastfm
  module Artist
    class Processor < Service
      def call
        process_artist
      end

    private

      def process_artist
        artist.tap { |h| process_params(h) }
      end

      def artist
        ::Artist.where(name: @args.name).first_or_initialize
      end

      def lastfm_data
        @lastfm_data ||= JSON.parse(
          RestClient.get(
            'http://ws.audioscrobbler.com/2.0/'\
            '?method=artist.getinfo'\
            "&artist=#{query_name(@args.name)}"\
            "&api_key=#{ENV['LASTFM_KEY']}&format=json"
          ).body
        )['artist']
      end

      def process_params(h)
        h.mbid = lastfm_data['mbid']
        h.image = nil || lastfm_data['image'][3]['#text']
        h.listeners = lastfm_data['stats']['listeners']
        h.playcount = lastfm_data['stats']['playcount']
        h.description = nil || lastfm_data['bio']['content']
        h.tags |= tags
        h.similars = similars
        if @args.full
          h.top_tracks = top_tracks
          h.top_albums = top_albums
          h.top_track_count = h.artist_top_tracks.first.playcount
          h.full = true
        end
        h.save
      end

      def tags
        lastfm_data['tags']['tag'].map do |tag|
          ::Tag.where(
            name: tag['name'].downcase
          ).first_or_create.id
        end
      end

      def similars
        lastfm_data['similar']['artist'].first(4).map do |a|
          ::Artist.where(name: a['name']).first_or_create(
            image: nil || a['image'][3]['#text']
          ).id
        end
      end

      def top_tracks
        Lastfm::Artist::Tracks.call(
          name: @args.name, limit: 10
        ).pluck(:id)
      end

      def top_albums
        Lastfm::Artist::Albums.call(
          name: @args.name, limit: 5
        ).first(4).pluck(:id)
      end
    end
  end
end
