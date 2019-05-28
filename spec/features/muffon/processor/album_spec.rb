require 'rails_helper'

RSpec.describe Muffon::Processor::Album do
  subject { described_class }

  describe 'successful processing' do
    context 'when album exists' do
      let(:album) {
        VCR.use_cassette 'muffon_processor_album_success' do
          subject.call(
            artist_name: 'wild nothing',
            album_title: 'nocturne'
          )
        end
      }

      it { expect { album }.to change(Album, :count).by(1) }
      it {
        expect(no_timestamp_hash(album)).to eq(
          Helpers::WildNothing::Nocturne.persisted_data
        )
      }
    end
  end

  describe 'no processing' do
    context 'when no artist name given' do
      let(:album) {
        VCR.use_cassette 'muffon_processor_album_no_artist_name' do
          subject.call(artist_name: nil, album_title: 'nocturne')
        end
      }

      it { expect(album).to be_nil }
      it { expect { album }.to change(Album, :count).by(0) }
    end

    context 'when no album title given' do
      let(:album) {
        VCR.use_cassette 'muffon_processor_album_no_title' do
          subject.call(artist_name: 'wild nothing', album_title: nil)
        end
      }

      it { expect(album).to be_nil }
      it { expect { album }.to change(Album, :count).by(0) }
    end

    context 'when wrong artist name' do
      let(:album) {
        VCR.use_cassette 'muffon_processor_album_wrong_artist_name' do
          subject.call(
            artist_name: Helpers::RANDOM_STRING,
            album_title: 'nocturne'
          )
        end
      }

      it { expect(album).to be_nil }
      it { expect { album }.to change(Album, :count).by(0) }
    end

    context 'when wrong album title' do
      let(:album) {
        VCR.use_cassette 'muffon_processor_album_wrong_title' do
          subject.call(
            artist_name: 'wild nothing',
            album_title: Helpers::RANDOM_STRING
          )
        end
      }

      it { expect(album).to be_nil }
      it { expect { album }.to change(Album, :count).by(0) }
    end
  end
end
