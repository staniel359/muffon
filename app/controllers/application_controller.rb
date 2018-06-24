class ApplicationController < ActionController::Base
  include SessionsHelper
  ORDERS = %w[
    plays_count_desc plays_count_asc
    created_desc created_asc
  ].freeze

private

  def redis
    @redis ||= Redis.new(url: 'redis://localhost:6379')
  end

  def profile
    @profile ||= Profile.find_by(id: params[:profile_id])
  end

  def respond_with_js_and_html
    respond_to do |format|
      format.html
      format.js { render layout: false }
    end
  end

  def respond_with_js
    respond_to { |format| format.js { render layout: false } }
  end

  def paginate_array(collection, total)
    Kaminari.paginate_array(collection, total_count: total)
  end

  def paginate(collection, limit)
    collection.page(params[:page]).per(limit)
  end

  def check_correct_profile
    redirect_to root_path unless current_profile?(@profile)
  end
end
