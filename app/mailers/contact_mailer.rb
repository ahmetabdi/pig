class ContactMailer < ApplicationMailer
  def new_message(message)
    @message = message
    mail(:from => message.email,
         :subject => "New message from #{message.name}" )
  end

  def new_member(user)
    @user = user
    mail(:from => 'pighackk@gmail.com',
         :to => user.email,
         :subject => "Account has been approved")
  end
end
