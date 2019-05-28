require 'rails_helper'

RSpec.describe Muffon::Processor::Tag do
  subject { described_class }

  describe 'successful processing' do
    context 'when tag exists' do
      let(:tag) {
        VCR.use_cassette 'muffon_processor_tag_success' do
          subject.call(tag_name: 'dream pop')
        end
      }

      it { expect { tag }.to change(Artist, :count).by(9) }
      # 6 + 3 artists from albums
      it { expect { tag }.to change(Album, :count).by(6) }
      it { expect { tag }.to change(Track, :count).by(10) }
    end
  end

  describe 'no processing' do
    let(:empty_hash) { { artists: [], albums: [], tracks: [] } }

    context 'when no tag name given' do
      let(:tag) {
        VCR.use_cassette 'muffon_processor_tag_no_name' do
          subject.call(tag_name: nil)
        end
      }

      it { expect(tag).to eq(empty_hash) }
    end

    context 'when wrong tag name' do
      let(:tag) {
        VCR.use_cassette 'muffon_processor_tag_wrong_name' do
          subject.call(tag_name: Helpers::RANDOM_STRING)
        end
      }

      it { expect(tag).to eq(empty_hash) }
    end
  end
end
