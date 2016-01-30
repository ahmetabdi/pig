Rails.application.routes.draw do
  devise_for :users

  get '/download', to: 'pages#download'
  get '/launcher', to: 'launcher#home'

  root to: "holder#holder"
end
