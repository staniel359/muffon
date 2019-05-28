require 'rails_helper'

RSpec.describe Muffon::Album do
  subject { described_class }

  describe 'successful processing' do
    context 'when album exists' do
      let(:output) {
        VCR.use_cassette 'muffon_album_success' do
          subject.call(
            artist_name: 'wild nothing',
            album_title: 'nocturne'
          )
        end
      }

      it {
        expect(output).to eq(
          Helpers::WildNothing::Nocturne.data
        )
      }
    end
  end

  describe 'no processing' do
    context 'when no artist name given' do
      let(:output) {
        VCR.use_cassette 'muffon_album_artist_no_name' do
          subject.call(artist_name: nil, album_title: 'nocturne')
        end
      }

      it { expect(output).to be_empty }
    end

    context 'when no album title given' do
      let(:output) {
        VCR.use_cassette 'muffon_album_title_no_name' do
          subject.call(artist_name: 'wild nothing', album_title: nil)
        end
      }

      it { expect(output).to be_empty }
    end

    context 'when wrong artist name' do
      let(:output) {
        VCR.use_cassette 'muffon_album_artist_wrong_name' do
          subject.call(
            artist_name: Helpers::RANDOM_STRING,
            album_title: 'nocturne'
          )
        end
      }

      it { expect(output).to be_empty }
    end

    context 'when wrong album title' do
      let(:output) {
        VCR.use_cassette 'muffon_album_wrong_title' do
          subject.call(
            artist_name: 'wild nothing',
            album_title: Helpers::RANDOM_STRING
          )
        end
      }

      it { expect(output).to be_empty }
    end
  end
end
