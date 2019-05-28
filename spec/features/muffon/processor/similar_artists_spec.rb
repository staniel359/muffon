require 'rails_helper'

RSpec.describe Muffon::Processor::SimilarArtists do
  subject { described_class }

  describe 'successful processing' do
    context 'when artist exists' do
      let(:artists) {
        VCR.use_cassette 'muffon_processor_similar_artist_success' do
          subject.call(artist_name: 'wild nothing')
        end
      }
      let(:similar_artist) { artists.first }

      it { expect { artists }.to change(Artist, :count).by(10) }
      # 1 + 10 similar artists
      it { expect(similar_artist.name).to eq('Craft Spells') }
      it {
        expect(similar_artist.description).to start_with(
          'After a dormant period following the release '\
            'of the Gallery EP in 2012'
        )
      }
      it { expect(similar_artist.lastfm_listeners_count).to eq(278_796) }
      it { expect(similar_artist.lastfm_plays_count).to eq(4_732_209) }
      it { expect(similar_artist.tag_ids.length).to eq(5) }
    end
  end

  describe 'no processing' do
    context 'when no artist name given' do
      let(:artists) {
        VCR.use_cassette 'muffon_processor_similar_no_artist_name' do
          subject.call(artist_name: nil)
        end
      }

      it { expect(artists).to be_empty }
      it { expect { artists }.to change(Artist, :count).by(0) }
    end

    context 'when wrong artist name' do
      let(:artists) {
        VCR.use_cassette 'muffon_processor_similar_wrong_artist_name' do
          subject.call(artist_name: Helpers::RANDOM_STRING)
        end
      }

      it { expect(artists).to be_empty }
      it { expect { artists }.to change(Artist, :count).by(0) }
    end
  end
end
