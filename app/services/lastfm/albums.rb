module LastFM
  class Albums < LastFM::Base
    def call
      retrieve_albums_data
    end

  private

    def retrieve_albums_data
      return [] unless @args.album_titles.present?

      albums_data.sort.transpose[1]
    end

    def albums_data
      albums_data_array = threads = []
      @args.album_titles.each_with_index.each do |a, i|
        threads << Thread.new do
          albums_data_array << [i, album_data(a)]
        end
      end
      concurrent_loader { threads.each(&:join) }
      albums_data_array
    end

    def album_data(album)
      LastFM::Album.call(
        artist_name: album[0],
        album_title: album[1]
      )
    end
  end
end
