module Library
  class ArtistTags < Muffon::Base
    def call
      retrieve_artist_tags
    end

  private

    def retrieve_artist_tags
      sorted_tag_ids.transpose.yield_self do |a|
        [Tag.where(id: a[0]).pluck(:name), a[1]]
      end.compact.transpose
    end

    def sorted_tag_ids
      grouped_tag_ids.sort_by { |a| a[1] }.reverse
    end

    def grouped_tag_ids
      tags_array.sort.chunk(&:itself).map { |t, c| [t, c.length] }
    end

    def tags_array
      @profile.artists.pluck(:tag_ids).flatten
    end
  end
end
