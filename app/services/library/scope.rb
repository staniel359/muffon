module Library
  class Scope < Service
    def call
      process_scope
    end

  private

    def process_scope
      return collection if scope.zero?

      scope_collection
    end

    def scope
      return @args.days.to_i if @args.days.present?

      @profile.send("top_#{@args.model_name}s_scope".to_sym)
    end

    def collection
      @profile.send("profile_#{@args.model_name}s".to_sym)
    end

    def scope_collection
      collection.joins(:plays).where(
        'plays.created_at > ?', scope.days.ago
      ).group("profile_#{@args.model_name}s.id").select(
        "profile_#{@args.model_name}s.*,
        count(*) as playcount"
      ).reorder('count(*) desc')
    end
  end
end
