class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  layout :layout

  private

  def layout
    if is_a?(Devise::SessionsController)
      false
    elsif is_a?(LauncherController)
      "launcher"
    else
      "application"
    end
  end

end
