Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'users/registrations' }

  devise_scope :user do
    get "/login" => "devise/sessions#new"
    get "/register" => "devise/registrations#new"
  end

  get '/download', to: 'pages#download'
  get '/support', to: 'pages#support'
  get '/launcher', to: 'launcher#home'

  post '/hook', to: 'pages#hook'
  post '/', to: 'pages#home', as: 'paypal_return'

  # root to: "holder#holder"
  root to: "pages#home"
end
