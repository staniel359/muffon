module LastFM
  class Base < Muffon::Base
  private

    def api_key
      secrets[:lastfm][:key][Rails.env.to_sym]
    end

    def api_link
      'http://ws.audioscrobbler.com/2.0/'
    end

    def artist_page_link
      "https://www.last.fm/music/#{CGI.escape(@args.artist_name)}"
    end

    def tag_page_link
      "https://www.last.fm/tag/#{CGI.escape(@args.tag_name)}"
    end
  end
end
