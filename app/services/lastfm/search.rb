module LastFM
  class Search < LastFM::Base
    def call
      process_search_data
    end

  private

    def process_search_data
      return {} unless @args.q.present?

      retrieve_search_data
    end

    def retrieve_search_data
      threads = []
      search_data = models_list.each_with_object({}) do |m, h|
        threads << Thread.new do
          h.merge!(m.pluralize.to_sym => search_model(m))
        end
      end
      concurrent_loader { threads.each(&:join) }
      search_data
    end

    def models_list
      %w[artist album track]
    end

    def search_model(model)
      "LastFM::Search::#{model.capitalize}s".constantize.call(
        q: @args.q, limit: limits[model]
      )[:data]
    end

    def limits
      {
        'artist' => 6,
        'album'  => 6,
        'track'  => 10
      }
    end
  end
end
