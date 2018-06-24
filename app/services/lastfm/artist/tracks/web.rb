module LastFM
  class Artist
    class Tracks
      class Web < LastFM::Base
        def call
          retrieve_webpage_tracks
        end

      private

        def retrieve_webpage_tracks
          tracks_list.css('.link-block-target').map(&:text)
        end

        def tracks_list
          parsed_tracks.css('tr[itemprop="track"]')
        end

        def parsed_tracks
          Nokogiri::HTML.parse(tracks_page_response)
        end

        def tracks_page_response
          RestClient.get(
            "#{artist_page_link}/+tracks",
            params: { date_preset: 'ALL', page: page }
          )
        rescue RestClient::NotFound
          {}
        end
      end
    end
  end
end
