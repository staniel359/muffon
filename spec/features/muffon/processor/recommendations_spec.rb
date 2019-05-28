require 'rails_helper'

RSpec.describe Muffon::Processor::Recommendations do
  subject { described_class }

  before { create(:artist) }

  let(:profile) { create(:profile) }
  let(:profile_artist) { create(:profile_artist) }

  describe 'successful processing' do
    let(:recommendations) {
      VCR.use_cassette 'muffon_processor_recommendations' do
        subject.call(profile_artist_id: profile_artist.id)
      end
    }

    it {
      expect { recommendations }.to change(
        profile.recommendations, :count
      ).by(50)
    }
  end

  describe 'no processing' do
    context 'when wrong profile artist' do
      let(:recommendations) { subject.call(profile_artist_id: 'foo') }

      it {
        expect { recommendations }.to change(
          profile.recommendations, :count
        ).by(0)
      }
    end

    context 'when no profile artist' do
      let(:recommendations) { subject.call(profile_artist_id: nil) }

      it {
        expect { recommendations }.to change(
          profile.recommendations, :count
        ).by(0)
      }
    end
  end
end
