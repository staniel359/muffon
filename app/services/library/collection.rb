module Library
  class Collection < Muffon::Base
    def call
      process_collection
    end

  private

    def process_collection
      return collection unless scope.to_i.positive?

      time_scoped_collection
    end

    def scope
      @scope ||= @args.scope || default_scope
    end

    def default_scope
      @profile.send("#{@args.collection_name}_scope")
    end

    def collection
      @profile.send(
        "profile_#{@args.collection_name}"
      ).send(orders_array[@args.order.to_i])
    end

    def orders_array
      %w[plays_count_desc plays_count_asc created_desc created_asc]
    end

    def time_scoped_collection
      collection.joins(:plays).where(
        'plays.created_at > ?', scope.to_i.days.ago
      ).group("profile_#{@args.collection_name}.id").select(
        "profile_#{@args.collection_name}.*, COUNT(*) as plays_count"
      )
    end
  end
end
