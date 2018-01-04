module Recommendations
  class Filter < Service
    def call
      process_recommendations
    end

  private

    def process_recommendations
      Kaminari.paginate_array(recommendations)
    end

    def recommendations
      filtered_recommendations.each do |rec|
        rec.profile_artists &= profile_artist_ids if scoped_artists?
      end.sort_by { |r| r.profile_artists.length }.reverse
    end

    def filtered_recommendations
      @profile.recommendations.where(artist_query)
        .where(tag_query).where(days_query).where(deleted: nil)
    end

    def artist_query
      return nil unless @args.params[:artist].present?

      "#{profile_artist_id} = any(profile_artists)"
    end

    def profile_artist_id
      @profile.profile_artists.joins(:artist).find_by(
        'lower(artists.name) = lower(?)', @args.params[:artist]
      )&.id.to_i
    end

    def tag_query
      return nil unless @args.params[:tag].present?

      "#{tag_id} = any(tags)"
    end

    def tag_id
      Tag.find_by(
        'lower(name) = lower(?)', @args.params[:tag]
      )&.id.to_i
    end

    def days_query
      return nil unless @args.params[:days].present?

      "profile_artists && array#{profile_artist_ids}::integer[]"
    end

    def profile_artist_ids
      @profile_artist_ids ||= @profile.plays.where(
        'created_at > ?', @args.params[:days].to_i.days.ago
      ).pluck(:profile_artist_id).uniq
    end

    def scoped_artists?
      @args.params[:days].present? && profile_artist_ids.any?
    end
  end
end
