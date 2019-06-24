class StatsController < ApplicationController
  before_action :should_login, :title, :data

private

  def title
    @title = t("stats.#{params[:action]}")
  end

  def data
    stat_names.each { |s| stat_data(s) }
  end

  def stat_names
    %w[
      plays artists tracks tags new_tracks
      new_artists tags_timeline
    ]
  end

  def stat_data(stat)
    instance_variable_set(
      "@#{stat}_data",
      stats_data["#{stat}_data".to_sym]
    )
  end

  def stats_data
    @stats_data ||= Muffon::Stats::Data.call(
      profile_id: current_profile.id
    )
  end
end
