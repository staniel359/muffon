require 'rails_helper'

RSpec.describe Muffon::Radio::Artist do
  subject { described_class }

  describe 'successful processing' do
    context 'when artist exists' do
      let(:output) {
        VCR.use_cassette 'muffon_radio_artist_success' do
          subject.call(artist_name: 'wild nothing')
        end
      }
      let(:instance) { subject.new(artist_name: 'wild nothing') }

      before {
        allow(described_class).to receive(:new).with(
          artist_name: 'wild nothing'
        ).and_return(instance)
        allow(instance).to receive(
          :sample_track
        ).and_return(Helpers::Radio.sample_track)
        allow(instance).to receive(
          :artist_image
        ).and_return(Helpers::Radio.artist_image)
      }

      it { expect(output).to eq(Helpers::Radio.artist_track_data) }
    end
  end

  describe 'no processing' do
    context 'when no artist name given' do
      let(:output) { subject.call(artist_name: nil) }

      it { expect(output).to eq(track: {}) }
    end

    context 'when wrong artist name' do
      let(:output) {
        VCR.use_cassette 'muffon_radio_artist_wrong_name' do
          subject.call(artist_name: Helpers::RANDOM_STRING)
        end
      }

      it { expect(output).to eq(track: {}) }
    end
  end
end
