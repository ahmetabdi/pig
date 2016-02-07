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
    params.extract!(:controller, :action) # Remove these from params as they are not needed

    user = User.find_by(email: params["custom"]) # Get user by callback email (Devise email)

    if user
      # if params["payment_status"] == "Completed"
      #   # Do a susessful payment confirmation
      # end
      PaymentLog.create!(log: params.permit!.to_h, user: user)
    end
    render nothing: true
  end
end
