class ContactMailer < ApplicationMailer
  def new_message(message)
    @message = message
    mail(:to => message.email,
         :from => message.email,
         :subject => "New message from #{message.name}" )
  end
end
