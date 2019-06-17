class ReleasesController < ApplicationController
  def index
    title
    new_releases
    upcoming_releases
  end

  def new
    title
    new_releases_paginated
  end

  def upcoming
    title
    upcoming_releases_paginated
  end

private

  def title
    @title = t("releases.#{params[:action]}")
  end

  def new_releases
    @new_releases = LastFM::Releases.call(
      scope: 'new', page: params[:page]
    )[:albums]
  end

  def upcoming_releases
    @upcoming_releases = LastFM::Releases.call(
      scope: 'upcoming', page: params[:page]
    )[:albums]
  end

  def new_releases_paginated
    @new_releases_paginated =
      paginate_array(new_releases, 1000, 20)
  end

  def upcoming_releases_paginated
    @upcoming_releases_paginated =
      paginate_array(upcoming_releases, 1000, 20)
  end
end
