module API
  class Album < Muffon::Processor::Base
    def call
      retrieve_album
    end

  private

    def retrieve_album
      return unless album_data.present?

      update_album(album_data.except(:tags, :tracks))
    end

    def album_data
      @album_data ||= LastFM::Album.call(@args)[:album]
    end
  end
end
