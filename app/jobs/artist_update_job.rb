class ArtistUpdateJob < ApplicationJob
  queue_as :default

  def perform(artist_name)
    Lastfm::Artist::Processor.call(
      artist_name: artist_name, type: 'full'
    )
  end
end
