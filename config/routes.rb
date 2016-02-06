Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'users/registrations' } do
  	get "/sign_in" => "devise/sessions#new"
  	get "/sign_up" => "devise/sessions#new", as: "new_user_registration"
  end

  get '/download', to: 'pages#download'
  get '/support', to: 'pages#support'
  get '/launcher', to: 'launcher#home'
  get '/hook', to: 'pages#hook'

  # root to: "holder#holder"
  root to: "pages#home"
end
