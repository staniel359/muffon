Rails.application.config.middleware.use OmniAuth::Builder do
  provider :lastfm, ENV['LASTFM_KEY'], ENV['LASTFM_SECRET']
end
