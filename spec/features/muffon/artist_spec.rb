require 'rails_helper'

RSpec.describe Muffon::Artist do
  subject { described_class }

  describe 'successful processing' do
    context 'when artist exists' do
      let(:output) {
        VCR.use_cassette 'muffon_artist_success' do
          subject.call(artist_name: 'wild nothing')
        end
      }

      it { expect(output).to eq(Helpers::WildNothing.data) }
    end
  end

  describe 'no processing' do
    let(:no_data_hash) {
      {
        image: nil,
        similar_artists: [],
        top_albums: [],
        top_tracks: []
      }
    }

    context 'when no artist name given' do
      let(:output) {
        VCR.use_cassette 'muffon_artist_no_name' do
          subject.call(artist_name: nil)
        end
      }

      it { expect(output).to eq(no_data_hash) }
    end

    context 'when wrong artist name' do
      let(:output) {
        VCR.use_cassette 'muffon_artist_wrong_name' do
          subject.call(artist_name: Helpers::RANDOM_STRING)
        end
      }

      it { expect(output).to eq(no_data_hash) }
    end
  end
end
