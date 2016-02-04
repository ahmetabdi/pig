class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  layout :layout

  def after_sign_in_path_for(resource)
    launcher_path
  end

  def after_sign_out_path_for(resource)
    launcher_path
  end

  private

  def layout
    if devise_controller? || is_a?(LauncherController)
      "launcher"
    elsif is_a?(HolderController)
      "holder"
    else
      "application"
    end
  end

end
