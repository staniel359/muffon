module LastFM
  class Artists < LastFM::Base
    def call
      retrieve_artists_data
    end

  private

    def retrieve_artists_data
      return {} unless @args.artist_names.present?

      { artists: artists_data_sorted }
    end

    def artists_data_sorted
      artist_data_service
      artists_data.sort_by { |a| a[0] }.transpose[1]
    end

    def artist_data_service
      LastFM::Artist # Preload constant
    end

    def artists_data
      artists_data_array = []
      threads = []
      @args.artist_names.each_with_index do |a, i|
        threads << Thread.new do
          artists_data_array << [i, artist_data(a)]
        end
      end
      concurrent_loader { threads.each(&:join) }
      artists_data_array
    end

    def artist_data(artist_name)
      artist_data_service.call(artist_name: artist_name)
    end
  end
end
