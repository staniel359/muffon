Rails.application.config.middleware.use OmniAuth::Builder do
  provider :lastfm,
    Rails.application.credentials.lastfm[:key][Rails.env.to_sym],
    Rails.application.credentials.lastfm[:secret][Rails.env.to_sym]
end
