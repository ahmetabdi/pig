Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'users/registrations' }

  devise_scope :user do
    get "/login" => "devise/sessions#new"
    get "/register" => "devise/registrations#new"
  end

  get '/hacks', to: 'pages#hacks'
  get '/download', to: 'pages#download'
  get '/support', to: 'pages#support'
  get '/faqs', to: 'pages#faqs', as: 'faqs'

  get '/launcher', to: 'launcher#home'

  # PAYPAL endpoints
  post '/hook', to: 'pages#hook'
  post '/', to: 'pages#home', as: 'paypal_return'
  post '/download', to: 'pages#download'

  # Contact form
  get 'contact', to: 'messages#new', as: 'contact'
  post 'contact', to: 'messages#create'

  root to: "pages#home"
end
