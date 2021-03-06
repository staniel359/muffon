module Library
  class ArtistTags < Muffon::Base
    def call
      retrieve_artist_tags
    end

  private

    def retrieve_artist_tags
      return [] unless limited_tag_ids.any?

      limited_tag_ids.transpose.yield_self do |a|
        [Tag.find(a[0]).pluck(:name), a[1]]
      end.transpose
    end

    def limited_tag_ids
      return sorted_tag_ids unless @args.limit.present?

      sorted_tag_ids.first(@args.limit)
    end

    def sorted_tag_ids
      @sorted_tag_ids ||= grouped_tag_ids.sort_by { |a| a[1] }.reverse
    end

    def grouped_tag_ids
      tags_array.sort.chunk(&:itself).map { |t, c| [t, c.length] }
    end

    def tags_array
      @profile.artists.pluck(:tag_ids).flatten
    end
  end
end
