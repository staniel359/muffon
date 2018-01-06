class ArtistUpdateJob < ApplicationJob
  queue_as :default

  def perform(name)
    Lastfm::Artist::Processor.call(name: name, full: true)
  end
end
