require 'rails_helper'

RSpec.describe Muffon::Radio::Tag do
  subject { described_class }

  describe 'successful processing' do
    context 'when tag exists' do
      let(:output) {
        VCR.use_cassette 'muffon_radio_tag_success' do
          subject.call(tag_name: 'dream pop')
        end
      }
      let(:instance) { subject.new(tag_name: 'dream pop') }

      before {
        allow(described_class).to receive(:new).with(
          tag_name: 'dream pop'
        ).and_return(instance)
        allow(instance).to receive(
          :sample_track
        ).and_return(Helpers::Radio.sample_track)
        allow(instance).to receive(
          :artist_image
        ).and_return(Helpers::Radio.artist_image)
        allow(instance).to receive(:page_number).and_return(1)
      }

      it { expect(output).to eq(Helpers::Radio.tag_track_data) }
    end
  end

  describe 'no processing' do
    context 'when no tag name given' do
      let(:output) { subject.call(tag_name: nil) }

      it { expect(output).to eq(track: {}) }
    end

    context 'when wrong tag name' do
      let(:output) {
        VCR.use_cassette 'muffon_radio_tag_wrong_name' do
          subject.call(tag_name: Helpers::RANDOM_STRING)
        end
      }
      let(:instance) {
        subject.new(tag_name: Helpers::RANDOM_STRING)
      }

      before {
        allow(described_class).to receive(:new).with(
          tag_name: Helpers::RANDOM_STRING
        ).and_return(instance)
        allow(instance).to receive(:page_number).and_return(1)
      }

      it { expect(output).to eq(track: {}) }
    end
  end
end
