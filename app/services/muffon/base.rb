module Muffon
  class Base
    def self.call(args)
      new(args).call
    end

    def initialize(args)
      @args = OpenStruct.new(args)
      @profile = profile
      @redis = Redis.new(url: 'redis://localhost:6379')
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
  end
end
