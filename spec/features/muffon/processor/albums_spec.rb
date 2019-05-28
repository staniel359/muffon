require 'rails_helper'

RSpec.describe Muffon::Processor::Albums do
  subject { described_class }

  describe 'successful processing' do
    context 'when artist exists' do
      let(:albums) {
        VCR.use_cassette 'muffon_processor_albums_success' do
          subject.call(
            artist_name: 'wild nothing', limit: 4
          )
        end
      }

      it { expect { albums }.to change(Album, :count).by(4) }
    end
  end

  describe 'no processing' do
    context 'when no artist name given' do
      let(:albums) {
        VCR.use_cassette 'muffon_processor_albums_no_artist_name' do
          subject.call(artist_name: nil, album_title: 'nocturne')
        end
      }

      it { expect(albums).to be_empty }
      it { expect { albums }.to change(Album, :count).by(0) }
    end

    context 'when wrong artist name' do
      let(:albums) {
        VCR.use_cassette 'muffon_processor_albums_wrong_artist_name' do
          subject.call(
            artist_name: Helpers::RANDOM_STRING,
            album_title: 'nocturne'
          )
        end
      }

      it { expect(albums).to be_empty }
      it { expect { albums }.to change(Album, :count).by(0) }
    end
  end
end
