module Bandcamp
  class Album < Muffon::Base
    def call
      process_album_data
    end

  private

    def process_album_data
      return {} unless link.present?

      {
        title:        title,
        artist:       album_artist_data,
        link:         link,
        cover:        cover,
        release_date: release_date,
        tracks:       tracks
      }
    end

    def link
      @link ||= @args.link || retrieve_link
    end

    def retrieve_link
      Bandcamp::Link.call(
        album_title: @args.album_title,
        artist_name: @args.artist_name
      )
    end

    def title
      parsed_page.css('#name-section').css('.trackTitle').text.strip
    end

    def parsed_page
      @parsed_page ||= Nokogiri::HTML.parse(page_response)
    end

    def page_response
      RestClient.get(link)
    end

    def album_artist_data
      { name: artist_name }
    end

    def artist_name
      parsed_page.css('#name-section').css(
        'span[itemprop="byArtist"]'
      ).text.strip
    end

    def cover
      parsed_page.css('.popupImage').first['href']
    end

    def release_date
      raw_release_date.insert(4, '-').insert(7, '-')
    end

    def raw_release_date
      parsed_page.css('meta[itemprop="datePublished"]')[0]['content']
    end

    def tracks
      Bandcamp::Tracks.call(
        script: parsed_page.css('script')
      ).map { |t| t.merge(artist: album_artist_data) }
    end
  end
end
