Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'users/registrations' } do
  	get "/sign_in" => "devise/sessions#new"
  	get "/sign_up" => "devise/sessions#new", as: "new_user_registration"
  end

  get '/download', to: 'pages#download'
  get '/launcher', to: 'launcher#home'

  root to: "holder#holder"
end
