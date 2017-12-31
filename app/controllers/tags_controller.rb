class TagsController < ApplicationController
  before_action :set_profile
  before_action :set_tags_page_title, only: :index
  before_action :set_tag_page_title, except: :index
  before_action :set_tag, except: :index
  before_action :set_artist_taggings, only: %i[show artists]
  before_action :set_album_taggings, only: %i[show albums]
  before_action :set_track_taggings, only: %i[show tracks]

  def index
    @tags = @profile.profile_tags.includes(:tag).page(params[:page])
  end

  def show; end

  def artists; end

  def albums; end

  def tracks; end

private

  def set_profile
    @profile ||= Profile.find_by_id(params[:id])
  end

  def set_tag
    @tag ||= @profile.profile_tags.joins(:tag).find_by(
      'tags.name = ?', params[:name]
    )
  end

  def set_artist_taggings
    @artist_taggings ||= @tag.artist_taggings.includes(
      :artist, :profile_artist
    ).page(params[:page]).per(20)
  end

  def set_album_taggings
    @album_taggings ||= @tag.album_taggings.includes(
      :album, :profile_album
    ).page(params[:page]).per(20)
  end

  def set_track_taggings
    @track_taggings ||= @tag.track_taggings.includes(
      :track, :profile_track
    ).page(params[:page]).per(20)
  end

  def set_tags_page_title
    @title = "#{@profile.nickname}'s tags"
  end

  def set_tag_page_title
    @title = "#{@profile.nickname}'s tags"\
      " | #{@tag.present? ? @tag.tag.name : params[:name]}"
  end
end
