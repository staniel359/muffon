module LastFM
  class Tag < LastFM::Base
    def call
      process_tag_data
    end

  private

    def process_tag_data
      {
        artists: process_artists,
        albums:  process_albums,
        tracks:  process_tracks
      }
    end

    def process_artists
      artists_list.map { |a| process_artist(a) }
    end

    def artists_list
      parsed_tag_page.css(
        'div[data-selectable-range-options="top_artists"]'
      ).css('.grid-items-item').first(4)
    end

    def parsed_tag_page
      @parsed_tag_page ||= Nokogiri::HTML.parse(tag_page)
    end

    def tag_page
      RestClient.get(tag_page_link)
    end

    def process_artist(artist)
      {
        name: artist.css('.link-block-target').text,
        image: artist.css('img').attr('src').value,
        lastfm_listeners_count: lastfm_listeners_count(artist)
      }
    end

    def lastfm_listeners_count(model)
      model.css('.grid-items-item-aux-text').text.scan(/\d/).join.to_i
    end

    def process_albums
      albums_list.map { |a| process_album(a) }
    end

    def albums_list
      parsed_tag_page.css(
        'div[data-selectable-range-options="top_albums"]'
      ).css('.grid-items-item').first(4)
    end

    def process_album(album)
      {
        title: album.css('.link-block-target').text,
        artist: { name: album.css('.grid-items-item-aux-block').text },
        cover: album.css('img').attr('src').value,
        lastfm_listeners_count: lastfm_listeners_count(album)
      }
    end

    def process_tracks
      tracks_list.map { |t| process_track(t) }
    end

    def tracks_list
      parsed_tag_page.css(
        'div[data-selectable-range-options="top_tracks"]'
      ).css('tr[itemprop="track"]')
    end

    def process_track(track)
      {
        title: track.css('.link-block-target').text,
        artist: { name: track.css('.chartlist-artists').css('a').text }
      }
    end
  end
end
