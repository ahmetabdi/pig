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
        if !user.approved? # Dont approve them if they are already approved
          user.update_attribute(:approved, true) # Approve the user
          ContactMailer.new_member(user).deliver # Send email notification on download instructions
          PaymentLog.create!(payment_status: params["payment_status"], payment_date: params["payment_date"], paypal_email: params["payer_email"], paypal_transaction_number: params["txn_id"], user: user)
        end
      end
    end
    render nothing: true
  end


  private

  def is_approved?
    if current_user.approved?
      true
    else
      render text: 'Your payment is currently pending check back in 5-10 minutes, you should receive an email notification soon!'
    end
  end
end
