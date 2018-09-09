module LastFM
  class Artists < LastFM::Base
    def call
      retrieve_artists_data
    end

  private

    def retrieve_artists_data
      return [] unless @args.artists.present?

      artists_data.sort_by { |a| a[0] }.transpose[1]
    end

    def artists_data
      artists_data_array = []
      threads = []
      @args.artists.each_with_index do |a, i|
        threads << Thread.new do
          artists_data_array << [i, artist_data(a)]
        end
      end
      concurrent_loader { threads.each(&:join) }
      artists_data_array
    end

    def artist_data(artist_name)
      LastFM::Artist.call(artist_name: artist_name)
    end
  end
end
