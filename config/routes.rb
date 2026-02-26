Rails.application.routes.draw do
  resources :users
  resources :person_types, only: [ :index ]
  resources :document_types, only: [ :index ]
end
