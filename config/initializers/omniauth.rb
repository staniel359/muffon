Rails.application.config.middleware.use OmniAuth::Builder do
  provider :lastfm, 'fb914bd85f85f89d750e93c8bfb70012', '4b935b89eb004ee0fb00025759829af9'
end