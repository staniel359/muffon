module Lastfm
  module Album
    class Processor < Service
      def call
        process_album
      end

    private

      def process_album
        album.tap do |h|
          base_details(h)
          h.tags = tags
          discogs_details(h)
          h.save
        end.update(
          tracks: album_tracks,
          full: true
        )
        album
      end

      def album
        @album ||= ::Album.where(
          title: CGI.unescape(@args.title),
          artist_id: album_artist.id
        ).first_or_initialize
      end

      def album_artist
        @album_artist ||= ::Artist.where(
          name: @args.artist_name
        ).first_or_create
      end

      def base_details(h)
        h.cover = album_data['image'][3]['#text']
        h.mbid = album_data['mbid']
        h.listeners = album_data['listeners'].to_i
        h.playcount = album_data['playcount'].to_i
        h.description = album_data.try(:[], 'wiki').try(:[], 'content')
      end

      def album_data
        @album_data ||= Lastfm::Album::Data.call(
          artist_name: @args.artist_name,
          title: @args.title
        )
      end

      def tags
        album_data['tags']['tag'].map { |tag| create_tag(tag) }
      end

      def create_tag(tag)
        ::Tag.where(name: tag['name'].downcase).first_or_create.id
      end

      def discogs_details(h)
        Discogs::Album::Details.call(
          artist_name: @args.artist_name,
          title: @args.title, h: h
        )
      end

      def album_tracks
        Lastfm::Album::Tracks.call(
          album_id: album.id,
          artist_id: album.artist_id,
          album_data: album_data,
          discogs_main_id: album.discogs_main_id
        )
      end
    end
  end
end
