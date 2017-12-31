module Lastfm
  module Tags
    module Taggings
      class Artist < Service
        def call
          process_tagging
        end

      private

        def process_tagging
          Tagging.where(
            profile_id: @profile.id,
            model_type: 'Artist',
            model_id: artist.id,
            profile_model_id: profile_artist&.id,
            profile_model_type: 'ProfileArtist',
            tag_id: @args.tag_id,
            profile_tag_id: @args.profile_tag_id
          ).first_or_create
        end

        def artist
          @artist ||= ::Artist.where(
            name: @args.tagging['name']
          ).first_or_create(
            image: @args.tagging['image'][3]['#text']
          )
        end

        def profile_artist
          ProfileArtist.find_by(
            profile_id: @profile.id,
            artist_id: artist.id
          )
        end
      end
    end
  end
end
