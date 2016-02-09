class ContactMailer < ApplicationMailer
  def new_message(message)
    @message = message
    mail(:from => message.email,
         :subject => "New message from #{message.name}" )
  end
end
