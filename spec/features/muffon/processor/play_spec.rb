require 'rails_helper'

RSpec.describe Muffon::Processor::Play do
  subject { described_class }

  let(:profile) { create(:profile) }

  describe 'successful processing' do
    let(:play) {
      VCR.use_cassette 'muffon_processor_get_play' do
        LastFM::User::Plays.call(
          lastfm_id: profile.lastfm_id
        )[:plays].first
      end
    }
    let(:process_play) {
      VCR.use_cassette 'muffon_processor_play' do
        subject.call(profile_id: profile.id, play: play)
      end
    }

    it {
      expect { process_play }.to change(
        profile.plays, :count
      ).by(1)
    }
  end

  describe 'no processing' do
    context 'when no play' do
      let(:process_play) {
        subject.call(profile_id: 1, play: nil)
      }

      it {
        expect { process_play }.to change(
          profile.plays, :count
        ).by(0)
      }
    end

    context 'when no profile artist' do
      let(:process_play) { subject.call(profile_artist_id: nil) }

      it {
        expect { process_play }.to change(
          profile.plays, :count
        ).by(0)
      }
    end
  end
end
