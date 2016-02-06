class PagesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:hook]

  def home
    @page = 'home-page'
  end

  def download
    @page = 'download-page'
  end

  # Instant Payment Notification - notify_url
  def hook
    user = User.find_by(email: params["custom"]) # Get user by callback email (Devise email)

    if user
      # if params["payment_status"] == "Completed"
      #   # Do a susessful payment confirmation
      # end
      PaymentLog.create!(log: params, user: user)
    end
  end
end
