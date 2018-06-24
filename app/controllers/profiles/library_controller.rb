module Profiles
  class LibraryController < ApplicationController
    def show
      @page_data = {
        title:        title,
        artists:      artists,
        albums:       albums,
        tracks:       tracks,
        plays:        plays,
        tags:         tags,
        taggings:     taggings
      }
    end

    def search
      search_in_library
      respond_with_js
    end

    def scope
      params[:default] ? change_default_scope : change_scope
      respond_with_js
    end

    def change_scope
      @page_data = {
        params[:collection].to_sym => send(params[:collection_name])
      }
    end

    def change_default_scope
      check_correct_profile
      profile.update(
        "#{params[:collection]}_scope" => params[:scope].to_i
      )
    end

  private

    def title
      t(
        "library.#{params[:action]}",
        profile: profile.nickname
      )
    end

    def artists
      scoped_collection('artists').includes(:artist).first(8)
    end

    def scoped_collection(collection_name)
      Library::TimeScope.call(
        profile_id:      profile.id,
        collection_name: collection_name,
        scope:           params[:scope]
      )
    end

    def albums
      scoped_collection('albums').includes(:artist, :album).first(4)
    end

    def tracks
      {
        top_tracks:   top_tracks,
        loved_tracks: loved_tracks,
        new_tracks:   new_tracks
      }
    end

    def top_tracks
      scoped_collection('tracks').first(10)
    end

    def profile_tracks
      @profile_tracks ||=
        profile.profile_tracks.includes(:artist, :track)
    end

    def loved_tracks
      profile_tracks.loved.created_desc.first(4)
    end

    def new_tracks
      profile_tracks.created_asc.first(4)
    end

    def plays
      profile.plays.created_asc.first(10)
    end

    def tags
      Library::ArtistTags.call(profile_id: profile.id)
    end

    def taggings
      profile.profile_tags.includes(:tag).taggings_count_desc
    end

    def search_in_library
      Library::Search.call(
        profile_id: profile.id, q: params[:q]
      )
    end
  end
end
