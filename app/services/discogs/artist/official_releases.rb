module Discogs
  module Artist
    class OfficialReleases < Service
      def call
        process_official_releases
      end

    private

      def process_official_releases
        @args.discogs_ids.map do |discogs_id|
          { discogs_id => official_albums_ids(discogs_id) }
        end
      end

      def official_albums_ids(discogs_id)
        main_releases(discogs_id).map do |release|
          process_release(release)
        end
      end

      def main_releases(discogs_id)
        releases(discogs_id).select do |release|
          release['role'] == 'Main'
        end
      end

      def releases(discogs_id)
        JSON.parse(releases_json(discogs_id))['releases']
      end

      def releases_json(discogs_id)
        RestClient.get(
          'https://api.discogs.com/artists/'\
          "#{discogs_id}/releases?per_page=500"
        ).body
      end

      def process_release(release)
        ::Album.where(
          artist_id: @args.artist_id,
          title: release['title'],
          discogs_id: discogs_id_of(release)
        ).first_or_initialize.tap do |h|
          h.role = 'official'
          h.format = format_of(release)
          h.save
        end.id
      end

      def discogs_id_of(release)
        release['type'] == 'master' ? release['main_release'] : release['id']
      end

      def format_of(release)
        return release['format'] unless release['type'] == 'master'

        JSON.parse(
          release_json(release)
        )['formats'][0]['descriptions'].join(', ')
      end

      def release_json(release)
        RestClient.get(
          "https://api.discogs.com/releases/#{release['main_release']}"\
          "?key=#{ENV['DISCOGS_KEY']}&secret=#{ENV['DISCOGS_SECRET']}"
        ).body
      end
    end
  end
end
