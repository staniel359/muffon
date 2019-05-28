module Muffon
  module Processor
    class Search
      class Model < Muffon::Processor::Base
        def call
          process_model
        end

      private

        def process_model
          return [] unless search_data.present?

          search_data[model_key].map { |m| update_model(m) }
        rescue NoMethodError
          []
        end

        def search_data
          @search_data ||= model_service&.call(@args)
        end

        def model_service
          "LastFM::Search::#{model_class}".safe_constantize
        end

        def model_class
          @args.model.pluralize.capitalize
        end

        def model_key
          @args.model.pluralize.to_sym
        end

        def update_model(model)
          send("update_#{@args.model}", model)
        end
      end
    end
  end
end
