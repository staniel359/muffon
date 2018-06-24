class Player
  class Source
    def create(profile_id, source_with_id)
      redis.set("#{profile_id}:source", source_with_id)
    end

    def delete(profile_id)
      redis.del("#{profile_id}:source")
    end
  end
end
