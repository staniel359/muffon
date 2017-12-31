class Service
  def self.call(args)
    new(args).call
  end

  def initialize(args)
    @args = OpenStruct.new(args)
    @profile = Profile.find(@args.profile_id) if
        @args.profile_id.present?
    @redis = Redis.new(url: 'redis://localhost:6379')
  end

private

  def query_name(name)
    return name if name.include?('%2F')

    CGI.escape(name)
  end

  def page
    @args.page || 1
  end
end
