class ArtistImageUpdateWorker
  include Sidekiq::Worker

  sidekiq_options retry: true, queue: 'artist_update'

  def perform(artist_name)
    artist = Artist.find_by_name(artist_name)
    image = LastFM::Artist::Images.call(
      artist_name: artist_name
    ).dig(:images, 0)
    artist.update(image: image)
    puts image
  end
end
