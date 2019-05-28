module LastFM
  class Tags < LastFM::Base
    def call
      retrieve_tags
    end

  private

    def retrieve_tags
      parsed_tags_data.map { |t| process_tag(t) }
    end

    def parsed_tags_data
      JSON.parse(tags_response)['toptags']['tag']
    end

    def tags_response
      RestClient.get(lastfm_api_link, params: request_params)
    end

    def request_params
      {
        method: "#{@args.model_name}.getTopTags",
        artist: @args.artist_name,
        album: @args.album_title,
        track: @args.track_title,
        api_key: lastfm_api_key,
        format: 'json'
      }
    end

    def process_tag(tag)
      { name: tag['name'], count: tag['count'] }
    end
  end
end
