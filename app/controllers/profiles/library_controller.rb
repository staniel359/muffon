module Profiles
  class LibraryController < ApplicationController
    before_action :set_profile

    def show
      set_title
      set_library_collections
    end

    def scope
      params[:default] ? change_default_scope : change_scope
      respond_with_js
    end

  private

    def set_title
      @title = t(
        "profiles.library.#{params[:action]}",
        profile: @profile.nickname
      )
    end

    def set_library_collections
      set_artists
      set_albums
      set_tracks
      set_top_tags
      set_plays
      set_loved_tracks
      set_taggings
    end

    def set_artists
      @artists = scoped_collection(
        'artists'
      ).associated.limit(6).decorate
    end

    def scoped_collection(collection_name)
      ::Library::Collection.call(
        profile_id: @profile.id,
        collection_name: collection_name,
        scope: params[:scope]
      )
    end

    def set_albums
      @albums = scoped_collection(
        'albums'
      ).associated.limit(6).decorate
    end

    def set_tracks
      @tracks = scoped_collection(
        'tracks'
      ).associated.limit(10).decorate
    end

    def set_top_tags
      @top_tags = ::Library::ArtistTags.call(
        profile_id: @profile.id, limit: 15
      )
    end

    def set_plays
      @plays =
        @profile.plays.created_desc.associated.limit(10).decorate
    end

    def set_loved_tracks
      @loved_tracks =
        @profile.profile_tracks.loved.loved_desc.associated.limit(10).decorate
    end

    def set_taggings
      @taggings =
        @profile.profile_tags.taggings_count_desc.associated.limit(15)
    end

    def change_default_scope
      check_correct_profile
      @profile.update(
        "#{params[:collection]}_scope" => params[:scope].to_i
      )
    end

    def change_scope
      send("set_#{params[:collection]}")
    end
  end
end
