require 'rails_helper'

RSpec.describe Muffon::Processor::Tag::Albums do
  subject { described_class }

  describe 'successful processing' do
    context 'when tag exists' do
      let(:albums) {
        VCR.use_cassette 'muffon_processor_tag_albums_success' do
          subject.call(tag_name: 'dream pop')
        end
      }
      let(:album) { albums.first }

      it { expect { albums }.to change(Album, :count).by(20) }
      it { expect { albums }.to change(Artist, :count).by(10) }
      it { expect(album.title).to eq('Honeymoon') }
      it { expect(album.artist.name).to eq('Lana Del Rey') }
      it {
        expect(album.description).to include(
          'Honeymoon is the fourth studio album'
        )
      }
      it { expect(album.tag_ids.length).to eq(5) }
      it { expect(album.lastfm_listeners_count).to eq(262_498) }
      it { expect(album.lastfm_plays_count).to eq(12_757_083) }
    end
  end

  describe 'no processing' do
    context 'when no tag name given' do
      let(:albums) {
        VCR.use_cassette 'muffon_processor_tag_albums_no_name' do
          subject.call(tag_name: nil)
        end
      }

      it { expect(albums).to be_empty }
    end

    context 'when wrong tag name' do
      let(:albums) {
        VCR.use_cassette 'muffon_processor_tag_albums_wrong_name' do
          subject.call(tag_name: Helpers::RANDOM_STRING)
        end
      }

      it { expect(albums).to be_empty }
    end
  end
end
