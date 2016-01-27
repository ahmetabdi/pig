class LauncherController < ApplicationController
  def home
  	@page = 'home-page'
  end

  def download
  	@page = 'download-page'
  end
end
