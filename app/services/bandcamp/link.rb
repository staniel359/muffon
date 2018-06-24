module Bandcamp
  class Link < Muffon::Base
    def call
      retrieve_link
    end

  private

    def retrieve_link
      actual_bandcamp_links.find { |l| matched_album(l) }.try(:[], :url)
    end

    def actual_bandcamp_links
      bandcamp_links.each { |l| l[:url] = actual_bandcamp_url(l) }
    end

    def bandcamp_links
      google_links.select { |l| bandcamp_link(l[:url]).present? }
    end

    def google_links
      parsed_google_page.css('.g').map { |l| process_google_link(l) }
    end

    def parsed_google_page
      Nokogiri::HTML.parse(google_page)
    end

    def google_page
      google_page_response
    rescue RestClient::ServiceUnavailable
      retry
    end

    def google_page_response
      RestClient.get(
        'google.com/search', params: { q: search_query }
      )
    end

    def search_query
      "#{@args.artist_name} #{@args.album_title} bandcamp"
    end

    def process_google_link(link)
      {
        name:        link.css('.r').text,
        url:         link.css('a').first['href'],
        description: link.css('.st').text.remove("\n")
      }
    end

    def bandcamp_link(link)
      link.match(album_regexp).try(:[], 0)
    end

    def album_regexp
      %r{http(s?)://\w+(\-\w+)*\.bandcamp.com/(album/((?!\&|\.|\s).)+|releases)}
    end

    def actual_bandcamp_url(link)
      bandcamp_link(link[:description]) || bandcamp_link(link[:url])
    end

    def matched_album(link)
      link[:name].casecmp(full_album_title).zero?
    end

    def full_album_title
      "#{@args.album_title.strip} - #{@args.artist_name.strip} - Bandcamp"
    end
  end
end
