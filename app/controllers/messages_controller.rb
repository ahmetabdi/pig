class MessagesController < ApplicationController

  def new
    @message = Message.new
  end

  def create
    @message = Message.new(message_params)

    if verify_recaptcha(model: @message) && @message.valid?
      ContactMailer.new_message(@message).deliver
      redirect_to contact_path, notice: "Your messages has been sent."
    else
      render :new
    end
  end

  private

  def message_params
    params.require(:message).permit(:name, :email, :content)
  end
end
