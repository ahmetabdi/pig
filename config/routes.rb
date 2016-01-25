Rails.application.routes.draw do
  devise_for :users

  get '/launcher', to: 'launcher#home'

  root to: "launcher#home"
end
