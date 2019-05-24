module VK
  class Tracks < Muffon::Base
    def call
      retrieve_tracks
    end

  private

    def retrieve_tracks
      matched_tracks.map { |t| full_id(t) }
    end

    def full_id(track)
      audio_data = JSON.parse(track['data-audio'])
      first_ids = audio_data.values_at(1, 0)
      last_ids = audio_data[13].split(%r{\/}).reject(&:empty?)[1..2]
      (first_ids + last_ids).join('_')
    end

    def matched_tracks
      tracks_list.select { |t| matched_track?(t) }
    end

    def tracks_list
      parsed_search_page.css('.audio_row')
    end

    def parsed_search_page
      Nokogiri::HTML(search_page_response).css('.audio_row')
    end

    def search_page_response
      RestClient.get(
        "https://vk.com/search?c[section]=audio&c[q]=#{query_string}",
        cookies: { remixsid: remixsid }
      )
    end

    def query_string
      formatted_string(@args.artist_name) + '+' +
        formatted_string(@args.track_title)
    end

    def formatted_string(string)
      CGI.escape(string.split(' ').uniq.join(' '))
    end

    def remixsid
      secrets[:vk][:remixsid][Rails.env.to_sym]
    end

    def matched_track?(track)
      artist_names_match?(track) &&
        track_titles_match?(track) &&
        !remix?(track)
    end

    def artist_names_match?(track)
      search_track_artist(track).casecmp(
        @args.artist_name.gsub(' & ', ' and ')
      ).zero?
    end

    def search_track_artist(track)
      track.css('.audio_row__performers').text.gsub(' & ', ' and ')
    end

    def track_titles_match?(track)
      search_track_title(track).casecmp(
        @args.track_title.gsub(', ', ' ')
      ).zero?
    end

    def search_track_title(track)
      track.css('.audio_row__title_inner').text.strip.gsub(', ', ' ')
    end

    def remix?(track)
      track.css(
        '.audio_row__title_inner_subtitle'
      ).text.downcase.include?('remix')
    end
  end
end
