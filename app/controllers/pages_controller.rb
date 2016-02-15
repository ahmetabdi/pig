class PagesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:hook]
  before_action :authenticate_user!, only: [:download]
  before_action :is_approved?, only: [:download]

  def home
  end

  def hacks
  end

  def download
  end

  def faqs
  end

  # Instant Payment Notification - notify_url
  def hook
    params.extract!(:controller, :action) # Remove these from params as they are not needed

    user = User.find_by(email: params["custom"]) # Get user by callback email (Devise email)

    if user
      if params["payment_status"] == "Completed"
        # Approve the user
        user.update_attribute(:approved, true)
        # Send email notification on download instructions
        ContactMailer.new_member(@message).deliver
        # TODO
      end
      PaymentLog.create!(log: params.permit!.to_h, user: user)
    end
    render nothing: true
  end


  private

  def is_approved?
    if current_user.approved?
      true
    else
      render text: 'Your payment is currently pending check back in 5-10 minutes!'
    end
  end
end
