require 'rails_helper'

RSpec.describe LastFM::Track do
  subject { described_class }

  describe 'successful processing' do
    context 'when track exists' do
      let(:output) {
        VCR.use_cassette 'lastfm_artist_track_success' do
          subject.call(
            artist_name: 'wild nothing',
            track_title: 'chinatown'
          )
        end
      }

      it {
        expect(output).to eq(
          Helpers::WildNothing::Chinatown.track_data
        )
      }
    end
  end

  describe 'no processing' do
    context 'when no artist name given' do
      let(:output) {
        VCR.use_cassette 'lastfm_artist_track_no_artist_name' do
          subject.call(artist_name: nil, track_title: 'chinatown')
        end
      }

      it { expect(output).to eq(track: {}) }
    end

    context 'when no track title given' do
      let(:output) {
        VCR.use_cassette 'lastfm_artist_track_no_track_title' do
          subject.call(artist_name: 'wild nothing', track_title: nil)
        end
      }

      it { expect(output).to eq(track: {}) }
    end

    context 'when wrong artist name' do
      let(:output) {
        VCR.use_cassette 'lastfm_artist_track_wrong_artist_name' do
          subject.call(
            artist_name: Helpers::RANDOM_STRING,
            track_title: 'chinatown'
          )
        end
      }

      it { expect(output).to eq(track: {}) }
    end

    context 'when wrong track title' do
      let(:output) {
        VCR.use_cassette 'lastfm_artist_track_wrong_track_title' do
          subject.call(
            artist_name: 'wild nothing',
            track_title: Helpers::RANDOM_STRING
          )
        end
      }

      it { expect(output).to eq(track: {}) }
    end
  end
end
