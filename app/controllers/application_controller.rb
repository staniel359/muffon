class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  private_class_method :local_prefixes
  include SessionsHelper
  include Pagy::Backend

  def self.local_prefixes
    [
      "js/#{controller_path}",
      "actions/#{controller_path}",
      "partials/#{controller_path}",
      "modals/#{controller_path}",
      controller_path
    ]
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
end
