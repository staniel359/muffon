require 'rails_helper'

RSpec.describe Muffon::Processor::Tag::Artists do
  subject { described_class }

  describe 'successful processing' do
    context 'when tag exists' do
      let(:artists) {
        VCR.use_cassette 'muffon_processor_tag_artists_success' do
          subject.call(tag_name: 'synthwave')
        end
      }
      let(:artist) { artists.second }

      it { expect { artists }.to change(Artist, :count).by(21) }
      it { expect(artist.name).to eq('Carpenter Brut') }
      it {
        expect(artist.description).to include(
          'Carpenter Brut is a French electronic music artist'
        )
      }
      it { expect(artist.tag_ids.length).to eq(5) }
      it { expect(artist.lastfm_listeners_count).to eq(142_971) }
      it { expect(artist.lastfm_plays_count).to eq(5_954_681) }
    end
  end

  describe 'no processing' do
    context 'when no tag name given' do
      let(:artists) {
        VCR.use_cassette 'muffon_processor_tag_artists_no_name' do
          subject.call(tag_name: nil)
        end
      }

      it { expect(artists).to be_empty }
    end

    context 'when wrong tag name' do
      let(:artists) {
        VCR.use_cassette 'muffon_processor_tag_artists_wrong_name' do
          subject.call(tag_name: Helpers::RANDOM_STRING)
        end
      }

      it { expect(artists).to be_empty }
    end
  end
end
