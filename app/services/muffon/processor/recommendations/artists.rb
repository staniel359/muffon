module Muffon
  module Processor
    class Recommendations
      class Artists < Muffon::Processor::Base
        def call
          process_artists
        end

      private

        def process_artists
          return [] unless artists_data.present?

          artists_data.map { |a| process_artist(a) }
        end

        def artists_data
          @artists_data ||= LastFM::Artists.call(
            artists: @args.artists
          )
        end

        def process_artist(artist)
          init_artist(artist).tap do |a|
            a.update(artist_attributes(artist))
          end
        end

        def artist_attributes(artist)
          artist.slice(
            :name, :image, :description, :mbid,
            :lastfm_listeners_count, :lastfm_plays_count
          ).merge(tag_ids: tag_ids(artist))
        end

        def tag_ids(artist)
          artist[:tags].map { |t| process_tag(t) }.pluck(:id)
        end
      end
    end
  end
end
