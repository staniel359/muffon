module YouTube
  class Link < Muffon::Base
    def call
      retrieve_youtube_link
    end

  private

    def retrieve_youtube_link
      return unless youtube_id.present?

      "https://www.youtube.com/embed/#{youtube_id}?rel=0&autoplay=1"
    end

    def youtube_id
      @youtube_id ||= JSON.parse(youtube_response).dig(
        'items', 0, 'id', 'videoId'
      )
    end

    def youtube_response
      RestClient.get(
        'https://www.googleapis.com/youtube/v3/search',
        params: request_params
      )
    end

    def request_params
      {
        part:       'snippet',
        q:          query,
        maxResults: 10,
        key:        secrets[:youtube][:key]
      }
    end

    def query
      "#{@args.artist_name} #{@args.track_title}"
    end
  end
end
