require 'rails_helper'

RSpec.describe Muffon::Processor::Search do
  subject { described_class }

  describe 'successful processing' do
    context 'when query is valid' do
      let(:results) {
        VCR.use_cassette 'muffon_processor_search_success' do
          subject.call(q: 'wild not')
        end
      }
      let(:albums_hash) {
        results[:albums].map { |r| no_timestamp_hash(r) }
      }
      let(:artists_hash) {
        results[:artists].map { |r| no_timestamp_hash(r) }
      }
      let(:tracks_hash) {
        results[:tracks].map { |r| no_timestamp_hash(r) }
      }

      it {
        expect(albums_hash).to eq(
          Helpers::Search.persisted_data[:albums]
        )
      }
      it {
        expect(artists_hash).to eq(
          Helpers::Search.persisted_data[:artists]
        )
      }
      it {
        expect(tracks_hash).to eq(
          Helpers::Search.persisted_data[:tracks]
        )
      }
    end
  end

  describe 'no processing' do
    let(:empty_hash) { { artists: [], albums: [], tracks: [] } }

    context 'when no query given' do
      let(:results) {
        VCR.use_cassette 'muffon_processor_search_no_query' do
          subject.call(q: nil)
        end
      }

      it { expect(results).to eq(empty_hash) }
    end

    context 'when no results' do
      let(:results) {
        VCR.use_cassette 'muffon_processor_search_no_results' do
          subject.call(q: Helpers::RANDOM_STRING)
        end
      }

      it { expect(results).to eq(empty_hash) }
    end
  end
end
