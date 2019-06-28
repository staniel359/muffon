module API
  class Artist < Muffon::Processor::Base
    def call
      retrieve_artist
    end

  private

    def retrieve_artist
      return unless artist_data.present?

      update_artist(artist_data.except(:tags))
    end

    def artist_data
      @artist_data ||= LastFM::Artist.call(@args)
    end
  end
end
