require 'rails_helper'

RSpec.describe Muffon::Processor::Tag::Tracks do
  subject { described_class }

  describe 'successful processing' do
    context 'when tag exists' do
      let(:tracks) {
        VCR.use_cassette 'muffon_processor_tag_tracks_success' do
          subject.call(tag_name: 'new wave')
        end
      }
      let(:track) { tracks.fourth }

      it { expect { tracks }.to change(Track, :count).by(50) }
      it { expect { tracks }.to change(Artist, :count).by(26) }
      it { expect(track.title).to eq('Take On Me') }
      it { expect(track.artist.name).to eq('a-ha') }
    end
  end

  describe 'no processing' do
    context 'when no tag name given' do
      let(:tracks) {
        VCR.use_cassette 'muffon_processor_tag_tracks_no_name' do
          subject.call(tag_name: nil)
        end
      }

      it { expect(tracks).to be_empty }
    end

    context 'when wrong tag name' do
      let(:tracks) {
        VCR.use_cassette 'muffon_processor_tag_tracks_wrong_name' do
          subject.call(tag_name: Helpers::RANDOM_STRING)
        end
      }

      it { expect(tracks).to be_empty }
    end
  end
end
