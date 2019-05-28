require 'rails_helper'

RSpec.describe Muffon::Processor::Artist do
  subject { described_class }

  describe 'successful processing' do
    context 'with artist exists' do
      let(:artist) {
        VCR.use_cassette 'muffon_processor_artist_success' do
          subject.call(artist_name: 'wild nothing')
        end
      }

      it { expect { artist }.to change(Artist, :count).by(7) }
      # 1 + 6 similar artists
      it {
        expect(no_timestamp_hash(artist)).to eq(
          Helpers::WildNothing.persisted_data
        )
      }
    end
  end

  describe 'no processing' do
    context 'with no artist name given' do
      let(:artist) {
        VCR.use_cassette 'muffon_processor_artist_no_name' do
          subject.call(artist_name: nil)
        end
      }

      it { expect(artist).to be_nil }
      it { expect { artist }.to change(Artist, :count).by(0) }
    end

    context 'with wrong artist name' do
      let(:artist) {
        VCR.use_cassette 'muffon_processor_artist_wrong_name' do
          subject.call(artist_name: Helpers::RANDOM_STRING)
        end
      }

      it { expect(artist).to be_nil }
      it { expect { artist }.to change(Artist, :count).by(0) }
    end
  end
end
