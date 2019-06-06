class ArtistsController < ApplicationController
  before_action :set_artist, :check_correct_artist, :set_title,
                except: :index

  def show
    process_artist
    check_correct_artist
    set_title
    set_current_artist_ids
    set_profile_instances
    set_taggings
    set_profile_artist
    comments
  end

  def images
    set_images
  end

  def tags
    set_tags
  end

  def wiki; end

  def listeners
    set_listeners
  end

  def plays
    set_plays
  end

  def similar_artists
    set_current_artist_ids
    set_profile_instances
    set_similar_artists
  end

  def board
    comments
  end

private

  def process_artist
    @artist = Muffon::Processor::Artist.call(
      params.slice(:artist_name)
    )&.decorate
  end

  def set_title
    @title = t(
      "artists.#{params[:action]}",
      artist: @artist&.name
    )
  end

  def set_artist
    find_artist || process_artist
  end

  def find_artist
    @artist = Artist.with_name(
      params[:artist_name]
    ).first&.decorate
  end

  def set_current_artist_ids
    @current_artist_ids = @artist.similar_artist_ids + [@artist.id]
  end

  def set_taggings
    @taggings = current_profile.decorate.artist_taggings(@artist.id)
  end

  def set_profile_artist
    @profile_artist = current_profile.profile_artists.find_by(
      artist_id: @artist.id
    )
  end

  def comments
    @comments = @artist.comments.created_desc.includes(:profile)
  end

  def set_images
    @images = paginate_array(
      images_data[:data], images_data[:total_count], 40
    )
  end

  def images_data
    @images_data ||= LastFM::Artist::Images.call(
      params.slice(:artist_name, :page)
    )
  end

  def set_tags
    @tags = LastFM::Tags.call(
      params.slice(:artist_name).merge!(model_name: 'artist')
    )
  end

  def set_listeners
    @listeners = paginate(@artist.listeners.created_desc, 20)
  end

  def set_plays
    @plays = paginate(@artist.plays.associated.created_desc, 20)
  end

  def set_similar_artists
    @similar_artists = paginate_array(
      processed_similar_artists, 200, 10
    )
  end

  def processed_similar_artists
    Muffon::Processor::SimilarArtists.call(
      params.slice(:artist_name, :page)
    )
  end
end
