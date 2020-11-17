module Profiles
  module Library
    class SearchController < ApplicationController
      before_action :set_profile

      def index
        set_search_data
        respond_with_js
      end

    private

      def set_search_data
        @artists = search_data[:artists]
        @albums  = search_data[:albums]
        @tracks  = search_data[:tracks]
      end

      def search_data
        @search_data ||= ::Library::Search.call(
          profile_id: @profile.id, q: params[:q]
        )
      end
    end
  end
end
