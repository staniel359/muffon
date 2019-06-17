module LastFM
  class Releases < LastFM::Base
    def call
      { albums: albums_data }
    end

  private

    def albums_data
      return {} unless @args.scope.present?

      albums_list.map { |a| format_album(a) }
    end

    def albums_list
      Nokogiri::HTML.parse(
        page_response
      ).css('.col-main .album-grid-item-wrap')
    end

    def page_response
      RestClient.get(
        lastfm_link, params: { page: page }
      )
    end

    def lastfm_link
      "https://www.last.fm/music/+releases/#{scope}/popular"
    end

    def scope
      case @args.scope
      when 'new' then 'out-now'
      when 'upcoming' then 'coming-soon'
      end
    end

    def format_album(album)
      {
        title: title(album),
        artist: artist(album),
        cover: cover(album),
        release_date: release_date(album)
      }
    end

    def title(album)
      album.css('.album-grid-item-title a').text
    end

    def artist(album)
      { name: album.css('.album-grid-item-artist a').text }
    end

    def cover(album)
      album.css('.album-grid-album-art img')[0]['src']
    end

    def release_date(album)
      album.css(
        '.album-grid-item-date'
      ).text.strip.to_time.strftime('%d-%m-%Y')
    end
  end
end
