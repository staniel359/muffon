module VK
  class GetTracks < Service
    def call
      retrieve_tracks
    end

  private

    def retrieve_tracks
      tracks.present? ? tracks : retry_tracks
    end

    def tracks
      @tracks ||= page(
        query_string(
          artist_name, track_title
        )
      ).css('.audio_row').select do |track|
        matched_track(track)
      end
    end

    def page(query)
      Nokogiri::HTML(
        RestClient.get(
          "https://vk.com/search?c[section]=audio&c[q]=#{query}",
          cookies: { remixsid: ENV['VK_REMIXSID'] }
        )
      )
    end

    def artist_name
      CGI.escape(@args.artist.split(' ').uniq.join(' '))
    end

    def track_title
      CGI.escape(@args.track.split(', ').uniq.join(' '))
    end

    def query_string(artist, track)
      artist + '+' + track
    end

    def matched_track(track)
      artists_match?(track) && tracks_match?(track)
    end

    def artists_match?(track)
      track_creds(track)[0].strip.match(regex_artist_name)
    end

    def track_creds(track)
      track.css('.audio_row__performer_title').text.split("\n")[1, 2]
    end

    def regex_artist_name
      /#{Regexp.quote(CGI.unescape(@args.artist))}/i
    end

    def tracks_match?(track)
      track_creds(track)[1].strip.delete(',').match(regex_track_title)
    end

    def regex_track_title
      /#{Regexp.quote(CGI.unescape(@args.track)).delete(',')}(?! \(live\))/i
    end

    def retry_tracks
      page(retry_query_string).css('.audio_row').select do |track|
        retry_matched_track(track)
      end
    end

    def retry_query_string
      CGI.escape(retry_artist_name) + '+' + CGI.escape(retry_track_title)
    end

    def retry_matched_track(track)
      track_creds(track)[0].strip.match(retry_artist_name) &&
        track_creds(track)[1].strip.delete(',').match(retry_track_title)
    end

    def retry_artist_name
      @args.artist.split(/[\s,]/).uniq.first
    end

    def retry_track_title
      @args.track.split(/[\s,]/).uniq.first
    end
  end
end
