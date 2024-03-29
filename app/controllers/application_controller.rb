class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  http_basic_authenticate_with name: 'admin', password: 'admin' if Rails.env.staging?

  layout :layout

  def after_sign_in_path_for(resource)
    if params["launcher"]
      launcher_path
    else
      root_path
    end
  end

  def after_sign_out_path_for(resource)
    root_path
  end

  private

  def layout
    "application"
  end
end
