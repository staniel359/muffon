module Muffon
  class Base
    NETWORK_ERRORS = [
      RestClient::BadGateway,
      RestClient::InternalServerError
    ].freeze

    def self.call(args)
      new(args).call
    end

    def initialize(args)
      @args = OpenStruct.new(args)
      @profile = profile
    end

  private

    def profile
      return unless @args.profile_id.present?

      Profile.find_by(id: @args.profile_id)
    end

    def secrets
      Rails.application.credentials
    end

    def page
      @args.page || 1
    end

    def concurrent_loader
      ActiveSupport::Dependencies.interlock.permit_concurrent_loads { yield }
    end

    def convert_to_seconds(time)
      time.split(':').map(&:to_i).inject { |m, s| m * 60 + s }
    end
  end
end
