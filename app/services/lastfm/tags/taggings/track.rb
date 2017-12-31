module Lastfm
  module Tags
    module Taggings
      class Track < Service
        def call
          process_tagging
        end

      private

        def process_tagging
          Tagging.where(
            profile_id: @profile.id,
            model_type: 'Track',
            model_id: track.id,
            profile_model_id: profile_track&.id,
            profile_model_type: 'ProfileTrack',
            tag_id: @args.tag_id,
            profile_tag_id: @args.profile_tag_id
          ).first_or_create
        end

        def track
          @track ||= ::Track.where(
            title: @args.tagging['name'],
            artist_id: artist.id
          ).first_or_create
        end

        def artist
          ::Artist.where(
            name: @args.tagging['artist']['name']
          ).first_or_create
        end

        def profile_track
          ProfileTrack.find_by(
            profile_id: @profile.id,
            track_id: track.id
          )
        end
      end
    end
  end
end
