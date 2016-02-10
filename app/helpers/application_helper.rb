module ApplicationHelper

  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end

  def paypal_url(return_path)
    # https://developer.paypal.com/docs/classic/paypal-payments-standard/integration-guide/formbasics/
    values = {
      business: 'strixxd@gmail.com',
      custom: "customer_email_to_verify_payment@gmail.com",
      cmd: "_xclick",
      upload: 1,
      return: "http://www.pighack.com/",
      amount: 20,
      currency_code: 'USD',
      item_name: "PigHack Software (Lifetime)",
      item_number: 1,
      quantity: 1,
      notify_url: "http://www.pighack.com/hook"
    }
    # "https://www.sandbox.paypal.com/cgi-bin/webscr?" + values.to_query
    "https://www.paypal.com/cgi-bin/webscr" + values.to_query
  end
end
