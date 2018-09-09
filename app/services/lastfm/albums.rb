module LastFM
  class Albums < LastFM::Base
    def call
      retrieve_albums_data
    end

  private

    def retrieve_albums_data
      return [] unless @args.albums.present?

      albums_data.sort.transpose[1]
    end

    def albums_data
      albums_data_hash = {}
      threads = []
      @args.albums.each_with_index.each do |a, i|
        threads << Thread.new do
          albums_data_hash.merge!(i.to_s => album_data(a))
        end
      end
      concurrent_loader { threads.each(&:join) }
      albums_data_hash
    end

    def album_data(album_data)
      LastFM::Album.call(
        artist_name: album_data[0],
        album_title: album_data[1]
      )
    end
  end
end
