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

  def devise_error_messages!
    return "" if resource.errors.empty?

    messages = resource.errors.full_messages.map { |msg| content_tag(:li, msg) }.join
    sentence = I18n.t("errors.messages.not_saved",
                      count: resource.errors.count,
                      resource: resource.class.model_name.human.downcase)

    html = <<-HTML
    <div id="error_explanation errEmptyEmail" class="wrapError">
      <h2>#{sentence}</h2>
      <ul>#{messages}</ul>
    </div>
    HTML

    html.html_safe
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
    "https://www.sandbox.paypal.com/cgi-bin/webscr?" + values.to_query
    # "https://www.paypal.com/cgi-bin/webscr"
  end
end
