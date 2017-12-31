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

      def info
        @info ||= Lastfm::Artist::Info.call(
          name: @args.name
        )
      end

      def process_params(h)
        h.mbid = info['mbid']
        h.image = nil || info['image'][3]['#text']
        h.listeners = info['stats']['listeners']
        h.playcount = info['stats']['playcount']
        h.description = info['bio']['summary']
        h.tags |= tags
        # h.discogs_ids |= discogs_ids if @args.type == 'full'
        h.info_status = @args.type
        h.similars = similars
        h.save
      end

      def tags
        info['tags']['tag'].map do |tag|
          ::Tag.where(
            name: tag['name'].downcase
          ).first_or_create.id
        end
      end

      # def discogs_ids
      #   Discogs::Artist::Ids.call(name: @args.name)
      # end

      def similars
        info['similar']['artist'].first(4).map do |artist|
          ::Artist.where(
            name: artist['name']
          ).first_or_create(
            image: artist['image'][3]['#text']
          ).id
        end
      end

      # def artist_official_releases(artist_id)
      #   Discogs::Artist::OfficialReleases.call(
      #     discogs_ids: discogs_ids,
      #     artist_id: artist_id
      #   ).official_releases
      # end
    end
  end
end
