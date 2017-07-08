module ArtistsHelper
  def update_artist_image(lastfm_artist)
    artist = Artist.find_by('lower(name) = lower(?)', params[:id])
    artist.update!(image: lastfm_artist['image'][3]['#text']) if artist
  end

  def get_tracks_from_musicbrainz(album)
    release = CGI.escape(album['name'].gsub('/', ' '))
    artist = CGI.escape(album['artist'])
    releases = JSON.parse(open("http://musicbrainz.org/ws/2/release/?query=release:#{release}&artist:#{artist}&fmt=json", 'User-Agent' => 'muffon').read)['releases']
    release = releases.find { |r| (convert_string(r['title'].downcase) == convert_string(album['name'].downcase)) && (convert_string(r['artist-credit'][0]['artist']['name'].downcase) == convert_string(album['artist'].downcase)) }
    release_id = release['id'] if release
    @tracks = JSON.parse(open("http://musicbrainz.org/ws/2/release/#{release_id}?inc=artist-credits+labels+discids+recordings&fmt=json", 'User-Agent' => 'muffon').read)['media'][0]['tracks'].each { |t| t['name'] = t['title'] }
  end

  def convert_string(str)
    str.tr('ÀÁÂÃÄÅàáâãäåĀāĂăĄąÇçĆćĈĉĊċČčÐðĎďĐđÈÉÊËèéêëĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħÌÍÎÏìíîïĨĩĪīĬĭĮįİıĴĵĶķĸĹĺĻļĽľĿŀŁłÑñŃńŅņŇňŉŊŋÒÓÔÕÖØòóôõöøŌōŎŏŐőŔŕŖŗŘřŚśŜŝŞşŠšſŢţŤťŦŧÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųŴŵÝýÿŶŷŸŹźŻżŽž', 'AAAAAAaaaaaaAaAaAaCcCcCcCcCcDdDdDdEEEEeeeeEeEeEeEeEeGgGgGgGgHhHhIIIIiiiiIiIiIiIiIiJjKkkLlLlLlLlLlNnNnNnNnnNnOOOOOOooooooOoOoOoRrRrRrSsSsSsSssTtTtTtUUUUuuuuUuUuUuUuUuUuWwYyyYyYZzZzZz')
  end
end
