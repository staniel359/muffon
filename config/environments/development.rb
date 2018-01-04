Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports.
  config.consider_all_requests_local = true

  # Enable/disable caching. By default caching is disabled.
  if Rails.root.join('tmp/caching-dev.txt').exist?
    config.action_controller.perform_caching = false

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => 'public, max-age=172800'
    }
  else
    config.action_controller.perform_caching = true

    config.cache_store = :memory_store
  end

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  config.action_mailer.perform_caching = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # Suppress logger output for asset requests.
  config.assets.quiet = true

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true

  # Use an evented file watcher to asynchronously detect changes in source code,
  # routes, locales, etc. This feature depends on the listen gem.
  config.file_watcher = ActiveSupport::EventedFileUpdateChecker

  config.action_cable.url = 'ws://localhost:3000/cable'
  
  ENV['LASTFM_KEY'] = '146fa01985acd46b23f4e6c5f660f199'
  ENV['LASTFM_SECRET'] = '4608a06d1f929b77f2567d7645145270'
  ENV['DISCOGS_KEY'] = 'lmqIHGxJzwqEFiLBLxwu'
  ENV['DISCOGS_SECRET'] = 'aPSJTqPRwVuzxxZkPOdsNWKmQIyVSpDs'
  ENV['SOUNDCLOUD_KEY'] = 'bbbf2c698cb8351905814f00bcf58118'
  ENV['SOUNDCLOUD_SECRET'] = '1174ac08925b31d99b718d0b35c73dba'
  ENV['VK_REMIXSID'] = '13cb0185b6eb7d4769bab317a85cb8189188e95032bd949174850'
end
