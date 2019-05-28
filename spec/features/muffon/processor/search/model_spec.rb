require 'rails_helper'

RSpec.describe Muffon::Processor::Search::Model do
  subject { described_class }

  describe 'successful processing' do
    context 'when artists search' do
      let(:artists) {
        VCR.use_cassette 'muffon_processor_search_artists_success' do
          subject.call(model: 'artist', q: 'wild not', limit: 6)
        end
      }
      let(:artist) { artists.first }

      it { expect { artists }.to change(Artist, :count).by(6) }
      it { expect(artist.name).to eq('Wild Nothing') }
      it { expect(artist.lastfm_listeners_count).to eq(499_550) }
    end

    context 'when albums search' do
      let(:albums) {
        VCR.use_cassette 'muffon_processor_search_albums_success' do
          subject.call(model: 'album', q: 'nocturne', limit: 6)
        end
      }
      let(:album) { albums.first }

      it { expect { albums }.to change(Album, :count).by(6) }
      it { expect { albums }.to change(Artist, :count).by(6) }
      it { expect(album.title).to eq('Nocturne') }
      it { expect(album.artist.name).to eq('Wild Nothing') }
    end

    context 'when tracks search' do
      let(:tracks) {
        VCR.use_cassette 'muffon_processor_search_tracks_success' do
          subject.call(model: 'track', q: 'only heather', limit: 10)
        end
      }
      let(:track) { tracks.first }

      it { expect { tracks }.to change(Track, :count).by(10) }
      it { expect { tracks }.to change(Artist, :count).by(7) }
      it { expect(track.title).to eq('Only Heather') }
      it { expect(track.artist.name).to eq('Wild Nothing') }
      it { expect(track.lastfm_listeners_count).to eq(99_926) }
    end
  end

  describe 'no processing' do
    context 'when no query given' do
      let(:models) {
        VCR.use_cassette 'muffon_processor_search_model_no_query' do
          subject.call(model: 'artist', q: nil)
        end
      }

      it { expect(models).to be_empty }
    end

    context 'when no model name given' do
      let(:models) {
        VCR.use_cassette 'muffon_processor_search_model_no_model' do
          subject.call(model: nil, q: 'a')
        end
      }

      it { expect(models).to be_empty }
    end

    context 'when no results' do
      let(:models) {
        VCR.use_cassette 'muffon_processor_search_model_no_results' do
          subject.call(model: 'artist', q: Helpers::RANDOM_STRING)
        end
      }

      it { expect(models).to be_empty }
    end

    context 'when wrong model' do
      let(:models) {
        VCR.use_cassette 'muffon_processor_search_model_wrong_model' do
          subject.call(model: 'releases', q: 'a')
        end
      }

      it { expect(models).to be_empty }
    end
  end
end
