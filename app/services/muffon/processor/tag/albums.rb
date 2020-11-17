module Muffon
  module Processor
    class Tag
      class Albums < Muffon::Processor::Base
        def call
          process_albums
        end

      private

        def process_albums
          albums_data[:albums].map { |a| process_album(a) }
        end

        def albums_data
          LastFM::Tag::Albums.call(@args)
        end

        def process_album(album)
          update_album(
            album.except(:tags, :tracks).merge(
              tag_ids: tag_ids(album)
            )
          )
        end

        def tag_ids(album)
          album[:tags].map { |t| process_tag(t) }.pluck(:id)
        end
      end
    end
  end
end
