module Lastfm
  module Album
    class Processor < Service
      def call
        process_album
      end

    private

      def process_album
        album.tap do |h|
          base_params(h)
          discogs_params(h)
          full_params(h)
        end
      end

      def album
        @album ||= ::Album.where(
          title: CGI.unescape(@args.album_title),
          artist_id: ::Artist.find_by(
            name: CGI.unescape(@args.artist_name)
          ).id
        ).first_or_initialize
      end

      def base_params(h)
        h.cover = cover
        h.mbid = lastfm_data['mbid']
        h.listeners = lastfm_data['listeners'].to_i
        h.playcount = lastfm_data['playcount'].to_i
        h.description = lastfm_data['wiki'].try(:[], 'content')
        h.save
      end

      def cover
        return bandcamp_data[:cover] if bandcamp_data[:cover].present?

        lastfm_data['image'][3]['#text']
      end

      def bandcamp_data
        @bandcamp_data ||= Bandcamp::Album::Data.call(
          artist_name: @args.artist_name,
          album_title: @args.album_title,
          bandcamp_link: album.bandcamp_link
        )
      end

      def lastfm_data
        @lastfm_data ||= JSON.parse(
          RestClient.get(
            'http://ws.audioscrobbler.com/2.0/'\
            '?method=album.getinfo'\
            "&artist=#{query_name(@args.artist_name)}"\
            "&album=#{query_name(@args.album_title)}"\
            "&api_key=#{ENV['LASTFM_KEY']}&format=json"
          ).body
        )['album']
      end

      def discogs_params(h)
        h.discogs_main_id = discogs_data[:discogs_main_id]
        h.format = discogs_data[:format]
        h.labels = discogs_data[:labels]
      end

      def discogs_data
        @discogs_data ||= Discogs::Album::Data.call(
          album_title: @args.album_title,
          artist_name: @args.artist_name
        )
      end

      def full_params(h)
        h.tags = tags
        h.tracks = tracks_ids
        h.bandcamp_link = bandcamp_data[:link]
        h.released_at = released_at if update_released_at?
        h.full = true
        h.save
      end

      def tags
        lastfm_data['tags']['tag'].map do |t|
          ::Tag.where(name: t['name'].downcase).first_or_create.id
        end
      end

      def tracks_ids
        tracks.each_with_index.map do |track, index|
          process_track(track, index).id
        end
      end

      def tracks
        return lastfm_tracks if lastfm_tracks.present?
        return discogs_tracks if discogs_tracks.present?
        bandcamp_data[:tracks]
      end

      def lastfm_tracks
        tracks_array = []
        lastfm_page.css('tr[itemprop="track"]').map do |t|
          tracks_array << {
            'title' => t.css('.link-block-target').text,
            'listeners' => track_listeners(t)
          }
        end
        tracks_array
      end

      def lastfm_page
        @lastfm_page ||= Nokogiri::HTML.parse(
          RestClient.get(
            "https://www.last.fm/music/#{query_name(@args.artist_name)}"\
            "/#{query_name(@args.album_title)}"
          )
        )
      end

      def track_listeners(t)
        t.css('.countbar-bar-value').text.strip.split(' ')[0]&.tr(',', '')&.to_i
      end

      def discogs_tracks
        return [] unless album.discogs_main_id.present?

        JSON.parse(
          RestClient.get(
            "https://api.discogs.com/releases/#{album.discogs_main_id}"
          ).body
        )['tracklist']
      end

      def process_track(track, index)
        ::Track.where(
          title: track['title'],
          artist_id: album.artist_id
        ).first_or_initialize.tap do |h|
          h.albums |= [album.id]
          h.listeners = track['listeners']
          h.bandcamp_link = bandcamp_data[:tracks][index]['bandcamp_link'] if
              bandcamp_data[:tracks].present?
          h.save
        end
      end

      # def track_bandcamp_link(track, index)
      #   return unless bandcamp_data[:tracks].present?

      #   bandcamp_data[:tracks].find do |t|
      #     process_track_bandcamp_link(track, t)
      #   end.try(:[], 'bandcamp_link')
      # end

      # def process_track_bandcamp_link(track, t)
      #   return matched_titles?(track, t) if matched_titles?(track, t)

      #   (t['title'].downcase.squeeze.split(' ') &
      #     track['title'].downcase.squeeze.split(' ')).any?
      # end

      # def matched_titles?(track, t)
      #   t['title'].downcase.squeeze.match(track['title'].downcase.squeeze) ||
      #     track['title'].downcase.squeeze.match(t['title'].downcase.squeeze)
      # end

      def update_released_at?
        return true if album.released_at.nil? || album.released_at.is_a?(String)

        released_at < album.released_at
      end

      def released_at
        return lastfm_released_at if lastfm_released_at.present?
        return discogs_data[:released_at] if discogs_data[:released_at].present?
        bandcamp_data[:released_at]
      end

      def lastfm_released_at
        lastfm_page.css('.metadata-display').first&.text&.to_time
      end
    end
  end
end
