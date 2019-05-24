module Bandcamp
  class Album < Muffon::Base
    def call
      album_data
    end

  private

    def album_data
      return {} unless link.present?

      { album: album_data_hash }
    end

    def link
      @link ||= @args.link || retrieve_link
    end

    def retrieve_link
      Bandcamp::Link.call(@args).dig(:album, :link)
    end

    def album_data_hash
      {
        title: title,
        artist: { name: artist_name },
        link: link,
        cover: cover,
        release_date: release_date,
        description: description,
        tracks: tracks
      }
    end

    def title
      parsed_album_data['title']
    end

    def parsed_album_data
      JSON.parse(parsed_page.to_s.match(/current: ({.+})/)[1])
    end

    def parsed_page
      @parsed_page ||= Nokogiri::HTML.parse(page_response)
    end

    def page_response
      RestClient.get(link)
    end

    def artist_name
      parsed_page.to_s.match(/artist: \"(.+)\"/)[1]
    end

    def cover
      "https://f4.bcbits.com/img/a#{parsed_album_data['art_id']}_10.jpg"
    end

    def release_date
      parsed_album_data['release_date'].to_time.strftime('%d-%m-%Y')
    end

    def description
      parsed_album_data['about']
    end

    def tracks
      parsed_tracks.map { |t| process_track(t) }
    end

    def parsed_tracks
      JSON.parse(parsed_page.to_s.match(/trackinfo: (\[.+\])/)[1])
    end

    def process_track(track)
      {
        title: track['title'],
        artist: { name: artist_name },
        duration: track['duration'].ceil,
        link: track.dig('file', 'mp3-128')
      }
    end
  end
end
