module Artists
  class TracksController < ArtistsController
    before_action :set_artist, :check_correct_artist

    def index
      title
      tracks
    end

    def show
      track
      check_correct_track
      title
      audio_link
      process_similar_tracks
      comments
    end

    def tags
      track
      title
      retrieve_tags
    end

    def wiki
      track
      title
    end

    def similar_tracks
      track
      title
      similar_tracks_paginated
    end

    def board
      track
      title
      comments
    end

  private

    def title
      @title = t(
        "artists.tracks.#{params[:action]}",
        artist: @artist.name,
        track: @track&.title
      )
    end

    def tracks
      @tracks = paginate_array(processed_tracks, 1000, 50)

      redirect_to artists_tracks_path if @tracks.empty?
    end

    def processed_tracks
      Muffon::Processor::Tracks.call(
        params.slice(:artist_name, :page)
      )
    end

    def track
      @track = process_track&.decorate
    end

    def process_track
      Muffon::Processor::Track.call(
        params.slice(:artist_name, :track_title)
      )
    end

    def audio_link
      @audio_link = VK::Track.call(vk_id: @track&.vk_id)
    end

    def process_similar_tracks
      @similar_tracks = Muffon::Processor::SimilarTracks.call(
        artist_name: @track.artist_name,
        track_title: @track.title,
        limit: similar_tracks_limit,
        page: params[:page]
      ) || []
    end

    def similar_tracks_limit
      params[:action] == 'similar_tracks' ? 250 : 5
    end

    def similar_tracks_paginated
      @similar_tracks = paginate_array(
        process_similar_tracks, 250, 25
      )

      redirect_to artists_tracks_similar_tracks_path if
          @similar_tracks.empty?
    end

    def comments
      @comments =
        @track.comments.created_desc.includes(:profile)
    end

    def retrieve_tags
      @tags = LastFM::Tags.call(
        params.slice(
          :artist_name, :track_title
        ).merge!(model_name: 'track')
      )
    end
  end
end
