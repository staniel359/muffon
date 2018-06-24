module Library
  class TimeScope < Muffon::Base
    def call
      process_collection
    end

  private

    def process_collection
      return collection unless scope.positive?

      time_scoped_collection
    end

    def scope
      @args.scope.to_i || default_scope.to_i
    end

    def default_scope
      @profile.send("#{collection_name}_scope")
    end

    def collection_name
      @args.collection_name
    end

    def collection
      @profile.send("profile_#{collection_name}").plays_count_desc
    end

    def time_scoped_collection
      collection.joins(:plays).where(
        'plays.created_at > ?', scope.days.ago
      ).group("profile_#{collection_name}.id").select(
        "profile_#{collection_name}.*, COUNT(*) as plays_count"
      )
    end
  end
end
