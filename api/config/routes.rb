# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :commits
  resources :users
  resources :definitions
  resources :colors
  resources :motivations
end
