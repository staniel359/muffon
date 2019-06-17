require 'rails_helper'

RSpec.describe Muffon::Processor::Track do
  subject { described_class }

  describe 'successful processing' do
    context 'when track exists' do
      let(:track) {
        VCR.use_cassette 'muffon_processor_track_success' do
          subject.call(
            artist_name: 'wild nothing',
            track_title: 'chinatown'
          )
        end
      }

      it { expect { track }.to change(Track, :count).by(1) }
      it { expect { track }.to change(Artist, :count).by(1) }
      it { expect { track }.to change(Album, :count).by(1) }
      it { expect { track }.to change(Tag, :count).by(5) }
      it {
        expect(no_timestamp_hash(track)).to eq(
          Helpers::WildNothing::Chinatown.persisted_data
        )
      }
    end
  end

  describe 'no processing' do
    context 'when no artist name given' do
      let(:track) {
        VCR.use_cassette 'muffon_processor_track_no_artist_name' do
          subject.call(artist_name: nil, track_title: 'chinatown')
        end
      }

      it { expect(track).to be_nil }
      it { expect { track }.to change(Track, :count).by(0) }
    end

    context 'when no track title given' do
      let(:track) {
        VCR.use_cassette 'muffon_processor_track_no_track_title' do
          subject.call(artist_name: 'wild nothing', track_title: nil)
        end
      }

      it { expect(track).to be_nil }
      it { expect { track }.to change(Track, :count).by(0) }
    end

    context 'when wrong artist name' do
      let(:track) {
        VCR.use_cassette 'muffon_processor_track_wrong_artist_name' do
          subject.call(
            artist_name: Helpers::RANDOM_STRING,
            track_title: 'chinatown'
          )
        end
      }

      it { expect(track).to be_nil }
      it { expect { track }.to change(Track, :count).by(0) }
    end

    context 'when wrong track title' do
      let(:track) {
        VCR.use_cassette 'muffon_processor_track_wrong_track_title' do
          subject.call(
            artist_name: 'wild nothing',
            track_title: Helpers::RANDOM_STRING
          )
        end
      }

      it { expect(track).to be_nil }
      it { expect { track }.to change(Track, :count).by(0) }
    end
  end
end
