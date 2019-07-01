module Recommendations
  class Filter < Muffon::Base
    def call
      filter_recommendations
    end

  private

    def filter_recommendations
      @profile.recommendations.not_deleted.joins(
        'LEFT JOIN artists ON artists.id = recommendations.artist_id'
      ).where(queries).includes(:artist).artists_count_desc
    end

    def queries
      %w[artist tag days].map do |q|
        send("#{q}_query")
      end.compact.join(' AND ')
    end

    def artist_query
      return unless @args.artist_name.present?

      "#{profile_artist_id} = ANY(profile_artist_ids)"
    end

    def profile_artist_id
      @profile.profile_artists.find_by(
        artist_id: artist_id
      )&.id.to_i
    end

    def artist_id
      Artist.with_name(@args.artist_name).first&.id.to_i
    end

    def tag_query
      return unless @args.tag_name.present?

      "#{tag_id} = ANY(artists.tag_ids)"
    end

    def tag_id
      Tag.with(name: @args.tag_name).first&.id.to_i
    end

    def days_query
      return unless @args.days.present?

      'profile_artist_ids && '\
        "ARRAY#{time_scoped_profile_artist_ids}::integer[]"
    end

    def time_scoped_profile_artist_ids
      @profile.plays.where(
        'plays.created_at > ?', @args.days.to_i.days.ago
      ).select(:profile_artist_id).distinct.pluck(
        :profile_artist_id
      )
    end
  end
end
