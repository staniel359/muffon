module Lastfm
  module Recommendations
    class Processor < Service
      def call
        process_recommendation
      end

    private

      def process_recommendation
        recommendation.tap do |h|
          h.profile_artists |= [@args.profile_artist_id]
          h.tags |= tags
        end.save
      end

      def recommendation
        Recommendation.where(
          profile_id: @profile.id,
          artist_id: artist.id
        ).first_or_initialize
      end

      def artist
        ::Artist.where(
          name: @args.similar_artist['name']
        ).first_or_initialize.tap { |h| artist_params(h) }
      end

      def artist_params(h)
        h.image = image
        h.mbid = mbid
        h.listeners = listeners
        h.playcount = playcount
        h.description = description
        h.tags = tags
        h.save
      end

      def image
        @args.similar_artist['image'][3]['#text']
      end

      def mbid
        info['mbid']
      end

      def info
        @info ||= Lastfm::Recommendations::ArtistInfoImporter.call(
          artist_name: @args.similar_artist['name']
        )
      end

      def listeners
        info['stats']['listeners'].to_i
      end

      def playcount
        info['stats']['playcount'].to_i
      end

      def description
        info.try(:[], 'bio').try(:[], 'content')
      end

      def tags
        @tags ||= tag_names.map do |tag_name|
          Tag.where(name: tag_name.downcase).first_or_create.id
        end
      end

      def tag_names
        info['tags']['tag'].pluck('name')
      end
    end
  end
end
