module Muffon
  class Track < Muffon::Base
    def call
      { track: track_data }
    end

  private

    def track_data
      return {} unless lastfm_data.present?

      [lastfm_data, vk_id, youtube_link].inject(:merge)
    end

    def lastfm_data
      @lastfm_data ||=
        LastFM::Track.call(@args)[:track]
    end

    def vk_id
      { vk_id: VK::Tracks.call(@args)[0] }
    end

    def youtube_link
      { youtube_link: YouTube::Link.call(@args) }
    end
  end
end
