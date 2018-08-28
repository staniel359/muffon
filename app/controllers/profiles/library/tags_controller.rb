module Profiles
  module Library
    class TagsController < ApplicationController
      before_action :set_profile
      before_action :set_tag, only: :show
      before_action :set_title

      def index
        @tags = tags
      end

      def show
        @pagy, @artists = pagy(artists)
      end

    private

      def set_title
        @title = t(
          "profiles.library.tags.#{params[:action]}",
          profile: @profile.nickname,
          tag:     @tag&.name
        )
      end

      def tags
        ::Library::ArtistTags.call(profile_id: @profile.id)
      end

      def set_tag
        @tag = Tag.with(name: params[:tag_name]).first_or_create
      end

      def artists
        @profile.profile_artists.joins(
          'JOIN "artists" ON "artists"."id" = "profile_artists"."artist_id"'
        ).where(
          "#{@tag.id} = ANY(artists.tag_ids)"
        ).includes(:artist)
      end
    end
  end
end
