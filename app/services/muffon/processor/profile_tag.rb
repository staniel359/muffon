module Muffon
  module Processor
    class ProfileTag < Muffon::Processor::Base
      def call
        process_profile_tag
      end

    private

      def process_profile_tag
        models_list.each { |m| process_model_taggings(m) }
      end

      def models_list
        %w[artist album track]
      end

      def process_model_taggings(model)
        page = 0
        loop do
          page_taggings = taggings_of(model, page += 1)
          break if page_taggings.empty?
          page_taggings.each { |t| process_model_tagging(model, t) }
        end
      end

      def taggings_of(model, page)
        LastFM::User::Taggings.call(
          lastfm_id:  @profile.lastfm_id,
          tag_name:   @args.tag_name,
          model_name: model,
          page:       page
        )
      end

      def process_model_tagging(model, tagging)
        Muffon::Processor::Taggings.call(
          profile_id: @args.profile_id,
          model_name: model,
          tag_name:   @args.tag_name,
          tagging:    tagging
        )
      end
    end
  end
end
