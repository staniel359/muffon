module LastFM
  module User
    class Taggings < LastFM::Base
      def call
        retrieve_tags_data
      end

    private

      def retrieve_tags_data
        parsed_taggings_data.map { |t| process_tagging(t) }.uniq
      end

      def parsed_taggings_data
        JSON.parse(taggings_response).dig(
          'taggings', "#{@args.model_name}s", @args.model_name
        ) || []
      end

      def taggings_response
        RestClient.get(api_link, params: request_params)
      end

      def request_params
        {
          method:      'user.getPersonalTags',
          user:        @args.lastfm_id,
          tag:         @args.tag_name,
          taggingtype: @args.model_name,
          page:        page,
          limit:       200,
          api_key:     api_key,
          format:      'json'
        }
      end

      def process_tagging(tagging)
        send("#{@args.model_name}_attributes", tagging)
      end

      def artist_attributes(tagging)
        {
          name:  tagging['name'],
          mbid:  tagging['mbid'].presence,
          image: tagging['image'][3]['#text'].presence
        }
      end

      def album_attributes(tagging)
        {
          title:  tagging['name'],
          mbid:   tagging['mbid'].presence,
          cover:  tagging['image'][3]['#text'].presence,
          artist: album_artist_attributes(tagging)
        }
      end

      def album_artist_attributes(tagging)
        {
          name: tagging['artist']['name'],
          mbid: tagging['artist']['mbid'].presence
        }
      end

      def track_attributes(tagging)
        {
          title:    tagging['name'],
          duration: tagging['duration'].to_i,
          mbid:     tagging['mbid'].presence,
          artist:   track_artist_attributes(tagging)
        }
      end

      def track_artist_attributes(tagging)
        {
          name:  tagging['artist']['name'],
          mbid:  tagging['artist']['mbid'].presence,
          image: tagging['image'][3]['#text'].presence
        }
      end
    end
  end
end
