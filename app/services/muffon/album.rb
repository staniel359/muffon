module Muffon
  class Album < Muffon::Base
    def call
      retrieve_album_data
    end

  private

    def retrieve_album_data
      return {} unless lastfm_data.present?

      base_data.merge(extra_data)
    end

    def lastfm_data
      @lastfm_data ||= LastFM::Album.call(
        album_title: @args.album_title,
        artist_name: @args.artist_name
      )
    end

    def base_data
      {
        title:                  lastfm_data[:title],
        artist:                 lastfm_data[:artist],
        lastfm_listeners_count: lastfm_data[:lastfm_listeners_count],
        lastfm_plays_count:     lastfm_data[:lastfm_plays_count],
        description:            lastfm_data[:description],
        cover:                  cover
      }
    end

    def cover
      lastfm_data[:cover] || resources_data[:bandcamp][:cover]
    end

    def resources_data
      @resources_data ||= retrieve_resources_data
    end

    def retrieve_resources_data
      results_hash = {}
      threads = []
      services_list.each do |key, service|
        threads << Thread.new do
          results_hash.merge!(key => service.call(service_args))
        end
      end
      concurrent_loader { threads.each(&:join) }
      results_hash
    end

    def services_list
      {
        music_brainz: MusicBrainz::Album,
        lastfm_page:  LastFM::Album::PageData,
        discogs:      Discogs::Album,
        bandcamp:     Bandcamp::Album
      }
    end

    def service_args
      {
        album_title: lastfm_data[:title],
        artist_name: lastfm_data[:artist][:name],
        mbid:        lastfm_data[:mbid]
      }
    end

    def extra_data
      {
        release_date:  release_date,
        release_type:  resources_data[:music_brainz][:release_type],
        bandcamp_link: resources_data[:bandcamp][:link],
        labels:        labels,
        tags:          tags,
        tracks:        tracks
      }
    end

    def release_date
      return if release_dates.empty?
      return release_dates.min unless only_year? && dates_with_min_year.any?

      dates_with_min_year.min
    end

    def only_year?
      release_dates.min.length == 4
    end

    def release_dates
      services_list.keys.map do |r|
        resources_data[r][:release_date]
      end.reject(&:blank?).uniq
    end

    def dates_with_min_year
      release_dates.select { |d| date_with_min_year?(d) }
    end

    def date_with_min_year?(date)
      date.length > 4 && date.start_with?(release_dates.min)
    end

    def labels
      resources_data[:music_brainz][:labels] ||
        resources_data[:discogs][:labels]
    end

    def tags
      lastfm_data[:tags] | resources_data[:lastfm_page][:tags]
    end

    def tracks
      Muffon::Album::Tracks.call(
        lastfm_data:    lastfm_data,
        resources_data: resources_data
      )
    end
  end
end
