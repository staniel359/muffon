class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  private_class_method :local_prefixes
  include SessionsHelper

  def self.local_prefixes
    [
      "js/#{controller_path}",
      "actions/#{controller_path}",
      "partials/#{controller_path}",
      "modals/#{controller_path}",
      controller_path
    ]
  end

  def not_found
    @title = 'Not found'
    render file: '/exceptions/not_found', status: :not_found
  end

private

  def set_profile
    @profile = Profile.find_by(id: params[:profile_id])&.decorate
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

  def check_correct_profile
    redirect_to root_path unless current_profile?(@profile)
  end

  def paginate(collection, limit)
    (
      collection.page(params[:page]).per(limit).presence ||
        collection.page(params[:page].to_i - 1).per(limit)
    )
  end

  def check_correct_artist
    not_found if @artist.nil?
  end

  def check_correct_album
    not_found if @album.nil?
  end
end
