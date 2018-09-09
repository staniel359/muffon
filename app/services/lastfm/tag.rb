module LastFM
  class Tag < LastFM::Base
    def call
      process_tag_data
    end

  private

    def process_tag_data
      return {} unless @args.tag_name.present?

      {
        artists: artists_data,
        albums:  albums_data,
        tracks:  tracks_data
      }
    end

    def tag_data
      threads = []
      tag_data_hash = collections.each_with_object({}) do |c, h|
        threads << Thread.new do
          h.merge!(c => send("#{collection}_data"))
        end
      end
      concurrent_loader { threads.each(&:join) }
      tag_data_hash
    end

    def collections
      %w[artists albums tracks]
    end

    def artists_data
      artists_list.map { |a| artist_data(a) }
    end

    def artists_list
      parsed_page('artists').css('.big-artist-list-item').first(6)
    end

    def parsed_page(collection)
      Nokogiri::HTML.parse(page_response(collection))
    end

    def page_response(collection)
      RestClient.get("#{tag_page_link}/#{collection}")
    rescue RestClient::NotFound
      nil
    end

    def artist_data(artist)
      {
        name:                   artist.css('.link-block-target').text,
        image:                  artist_image(artist),
        lastfm_listeners_count: artist_lastfm_listeners_count(artist)
      }
    end

    def artist_image(artist)
      artist.css('img').attr('src').value.sub('avatar70s', '300x300')
    end

    def artist_lastfm_listeners_count(artist)
      artist.css(
        '.big-artist-list-listeners'
      ).text.scan(/\d/).join.to_i
    end

    def albums_data
      albums_list.map { |a| album_data(a) }
    end

    def albums_list
      parsed_page('albums').css('.album-grid-item').first(6)
    end

    def album_data(album)
      {
        title:                  album.css('.link-block-target').text,
        artist:                 album_artist_data(album),
        cover:                  album.css('img').attr('src').value,
        lastfm_listeners_count: album_lastfm_listeners_count(album)
      }
    end

    def album_artist_data(album)
      { name: album.css('.album-grid-item-artist').text.strip }
    end

    def album_lastfm_listeners_count(album)
      album.css(
        '.album-grid-item-aux-text'
      ).first.text.scan(/\d/).join.to_i
    end

    def tracks_data
      tracks_list.map { |t| track_data(t) }
    end

    def tracks_list
      parsed_page('tracks').css(
        '.chartlist-ellipsis-wrap'
      ).first(10)
    end

    def track_data(track)
      {
        title:  track.css('.link-block-target').text,
        artist: track_artist_data(track)
      }
    end

    def track_artist_data(track)
      { name: track.css('.chartlist-artists').css('a').text }
    end
  end
end
