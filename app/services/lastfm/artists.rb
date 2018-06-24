module LastFM
  class Artists < LastFM::Base
    def call
      retrieve_artists_data
    end

  private

    def retrieve_artists_data
      return [] unless @args.artist_names.present?

      artists_data.sort.transpose[1]
    end

    def artists_data
      artists_data_hash = {}
      threads = []
      @args.artist_names.each_with_index.each do |a, i|
        threads << Thread.new do
          artists_data_hash.merge!(i.to_s => artist_data(a))
        end
      end
      threads.each(&:join)
      artists_data_hash
    end

    def artist_data(artist_name)
      LastFM::Artist.call(artist_name: artist_name)
    end
  end
end
