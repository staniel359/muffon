module Recommendations
  class Filter < Muffon::Base
    def call
      filter_recommendations
    end

  private

    def filter_recommendations
      @profile.recommendations.not_deleted.where(
        queries
      ).artists_count_desc
    end

    def queries
      queries_list.map { |q| send("#{q}_query") }.compact.join(' AND ')
    end

    def queries_list
      %w[artist tag days]
    end

    def artist_query
      return unless @args.artist_name.present?

      "#{profile_artist_id} = ANY(profile_artist_ids)"
    end

    def profile_artist_id
      @profile.profile_artists.joins(:artist).find_by(
        'LOWER(artists.name) = ?', @args.artist_name.downcase
      )&.id.to_i
    end

    def tag_query
      return unless @args.tag_name.present?

      "#{tag_id} = any(tag_ids)"
    end

    def tag_id
      Tag.find_by(
        'lower(name) = ?', @args.tag_name.downcase
      )&.id.to_i
    end

    def days_query
      return unless @args.days.present?

      'profile_artist_ids && '\
        "ARRAY#{time_scoped_profile_artist_ids}::integer[]"
    end

    def time_scoped_profile_artist_ids
      @profile.plays.where(
        'plays.created_at > ?', @args.days.days.ago
      ).select(
        :profile_artist_id
      ).distinct.pluck(:profile_artist_id)
    end
  end
end
