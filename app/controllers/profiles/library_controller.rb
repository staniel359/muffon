module Profiles
  class LibraryController < ApplicationController
    before_action :set_profile
    before_action :set_title, only: :show

    def show
      @artists = artists
      @albums = albums
      @tracks = tracks
      @tags = tags
      @plays = plays
      @taggings = taggings
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

    def artists
      scoped_collection('artists').includes(
        :artist
      ).limit(8).decorate
    end

    def scoped_collection(collection_name)
      ::Library::Collection.call(
        profile_id:      @profile.id,
        collection_name: collection_name,
        scope:           params[:scope]
      )
    end

    def albums
      scoped_collection('albums').includes(
        :album, :artist
      ).limit(8).decorate
    end

    def tracks
      {
        top:   top_tracks,
        loved: loved_tracks,
        new:   new_tracks
      }
    end

    def top_tracks
      scoped_collection('tracks').includes(
        :artist, [track: :artist]
      ).limit(10).decorate
    end

    def loved_tracks
      @profile.profile_tracks.loved.loved_desc.includes(
        :artist, [track: :artist]
      ).limit(5).decorate
    end

    def new_tracks
      @profile.profile_tracks.created_desc.includes(
        :artist, [track: :artist]
      ).limit(5).decorate
    end

    def plays
      @profile.plays.created_desc.includes(
        :artist, [track: :artist], :album, :profile_track
      ).limit(10).decorate
    end

    def tags
      ::Library::ArtistTags.call(
        profile_id: @profile.id,
        limit:      15
      )
    end

    def taggings
      @profile.profile_tags.includes(
        :tag
      ).taggings_count_desc.limit(15)
    end

    def change_default_scope
      check_correct_profile
      @profile.update(
        "#{params[:collection]}_scope" => params[:scope].to_i
      )
    end

    def change_scope
      instance_variable_set(
        "@#{params[:collection]}", send(params[:collection])
      )
    end
  end
end
