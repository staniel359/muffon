module Lastfm
  module Tags
    module Taggings
      class Album < Service
        def call
          process_tagging
        end

      private

        def process_tagging
          Tagging.where(
            profile_id: @profile.id,
            model_type: 'Album',
            model_id: album.id,
            profile_model_id: profile_album&.id,
            profile_model_type: 'ProfileAlbum',
            tag_id: @args.tag_id,
            profile_tag_id: @args.profile_tag_id
          ).first_or_create
        end

        def album
          @album ||= ::Album.where(
            title: @args.tagging['name'],
            artist_id: artist.id
          ).first_or_create(
            cover: @args.tagging['image'][3]['#text']
          )
        end

        def artist
          ::Artist.where(
            name: @args.tagging['artist']['name']
          ).first_or_create
        end

        def profile_album
          ProfileAlbum.find_by(
            profile_id: @profile.id,
            album_id: album.id
          )
        end
      end
    end
  end
end
