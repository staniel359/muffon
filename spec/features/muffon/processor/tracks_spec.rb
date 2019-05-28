require 'rails_helper'

RSpec.describe Muffon::Processor::Tracks do
  subject { described_class }

  describe 'successful processing' do
    context 'when artist exists' do
      let(:tracks) {
        VCR.use_cassette 'muffon_processor_tracks_success' do
          subject.call(artist_name: 'wild nothing', limit: 10)
        end
      }
      let(:track) { tracks.first }

      it { expect { tracks }.to change(Artist, :count).by(1) }
      it { expect { tracks }.to change(Track, :count).by(10) }
      it { expect(track.title).to eq('Chinatown') }
      it { expect(track.artist.name).to eq('Wild Nothing') }
      it { expect(track.lastfm_listeners_count).to eq(189_359) }
      it { expect(track.lastfm_plays_count).to eq(1_096_361) }
    end
  end

  describe 'no processing' do
    context 'when no artist name given' do
      let(:tracks) {
        VCR.use_cassette 'muffon_processor_tracks_no_artist_name' do
          subject.call(artist_name: nil)
        end
      }

      it { expect(tracks).to be_empty }
      it { expect { tracks }.to change(Artist, :count).by(0) }
      it { expect { tracks }.to change(Track, :count).by(0) }
    end

    context 'when wrong artist name' do
      let(:tracks) {
        VCR.use_cassette 'muffon_processor_tracks_wrong_artist_name' do
          subject.call(artist_name: Helpers::RANDOM_STRING)
        end
      }

      it { expect(tracks).to be_empty }
      it { expect { tracks }.to change(Artist, :count).by(0) }
      it { expect { tracks }.to change(Track, :count).by(0) }
    end
  end
end
