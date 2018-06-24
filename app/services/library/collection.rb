module Library
  class Collection < Service
    def call
      process_collection
    end

  private

    def process_collection
      return collection unless scope_or_order?
      return scoped_collection if scope_and_no_order?
      return ordered_collection if order_and_no_scope?
      scoped_and_ordered_collection
    end

    def scope_or_order?
      scope.positive? || @args.order.present?
    end

    def scope
      return @args.scope.to_i if @args.scope.present?

      @profile.send("top_#{@args.collection_name}_scope".to_sym).to_i
    end

    def collection
      @collection ||= @profile.send("profile_#{@args.collection_name}".to_sym)
    end

    def scope_and_no_order?
      scope.positive? && !@args.order.present?
    end

    def scoped_collection
      collection.where(
        'plays.created_at > ?', scope.days.ago
      ).joins(:plays).group(
        "profile_#{@args.collection_name}.id"
      ).select(
        "profile_#{@args.collection_name}.*,
        count(*) as playcount"
      ).reorder(order)
    end

    def order_and_no_scope?
      @args.order.present? && !scope.positive?
    end

    def ordered_collection
      collection.joins(:plays).group(
        "profile_#{@args.collection_name}.id"
      ).select(
        "profile_#{@args.collection_name}.*, count(*)"
      ).reorder(order)
    end

    def order
      case @args.order
      when '1', nil
        'count(*) desc, id desc'
      when '2'
        'count(*) asc, id asc'
      when '3'
        'created_at desc, id desc'
      when '4'
        'created_at asc, id desc'
      end
    end

    def scoped_and_ordered_collection
      scoped_collection.reorder(order)
    end
  end
end
