module Library
  class Order < Service
    def call
      process_order
    end

  private

    def process_order
      return collection unless @args.order.present?

      collection.reorder(order)
    end

    def collection
      @profile.send("profile_#{@args.model_name.downcase}s".to_sym)
    end

    def order
      case @args.order
      when '1'
        "profile_#{@args.model_name.downcase}s.playcount desc"
      when '2'
        "profile_#{@args.model_name.downcase}s.playcount asc"
      when '3'
        'created_at desc'
      when '4'
        'created_at asc'
      end
    end
  end
end
