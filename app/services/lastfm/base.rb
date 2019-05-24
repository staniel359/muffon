module LastFM
  class Base < Muffon::Base
  private

    def lastfm_api_key
      secrets[:lastfm][:key][Rails.env.to_sym]
    end

    def lastfm_api_link
      'http://ws.audioscrobbler.com/2.0/'
    end

    def artist_page_link
      "https://www.last.fm/music/#{CGI.escape(@args.artist_name)}"
    end

    def album_page_link
      "#{artist_page_link}/#{CGI.escape(@args.album_title)}"
    end

    def tag_page_link
      "https://www.last.fm/tag/#{CGI.escape(@args.tag_name)}"
    end

    def array_offset
      (page.to_i - 1) * array_limit
    end
  end
end
