Rails.application.routes.draw do
  devise_for :users

  get '/launcher', to: 'launcher#home'
  get '/download', to: 'launcher#download'

  root to: "launcher#home"
end
