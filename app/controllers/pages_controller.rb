class PagesController < ApplicationController
  def home
    @page = 'home-page'
  end

  def download
    @page = 'download-page'
  end

  # Instant Payment Notification - notify_url
  def hook
  	raise params
  end
end
