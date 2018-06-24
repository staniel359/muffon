class ProfilesController < ApplicationController
  def index
    should_login
    @page_data = {
      title:    title,
      profiles: profiles
    }
  end

  def show
    @page_data = {
      title:         title,
      plays:         plays,
      artists:       artists,
      albums:        albums,
      tracks:        tracks,
      compatibility: compatibility
    }
  end

  def update
    should_login
    check_correct_profile
    profile.update(profile_params)
    flash.now[:success] = t('profiles.updated')
    respond_with_js
  end

  def destroy
    should_login
    check_correct_profile
    profile.destroy
    redirect_to root_path
  end

private

  def title
    t(
      "profiles.#{params[:action]}",
      profile: profile&.nickname
    )
  end

  def profiles
    paginate(Profile.created_desc, 20)
  end

  def plays
    profile.plays.includes(
      profile_track:  :track,
      profile_artist: :artist,
      profile_album:  :album
    ).created_desc
  end

  def artists
    profile.profile_artists.includes(
      :artist
    ).plays_count_desc.first(8)
  end

  def albums
    profile.profile_albums.includes(
      :album, profile_artist: :artist
    ).plays_count_desc.first(8)
  end

  def tracks
    profile.profile_tracks.includes(
      :track, profile_artist: :artist
    ).plays_count_desc.first(10)
  end

  def process_compatibility
    return unless other_profile?(profile)

    Muffon::Compatibility.call(
      current_profile_id: current_profile.id,
      other_profile_id:   profile.id
    )
  end

  def primary_params
    params.require(:profile).permit(primary_params_list)
  end

  def primary_params_list
    %i[email password password_confirmation lastfm_id nickname]
  end

  def profile_params
    params.require(:profile).permit(
      primary_params_list + profile_params_list
    )
  end

  def profile_params_list
    %i[avatar remote_avatar_url name gender country city birthdate]
  end
end
