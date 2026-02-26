Rails.application.routes.draw do
  # Estas rutas crearán automáticamente los endpoints para el CRUD de usuarios
  resources :users

  # Estas rutas servirán para que React pueda pedir la lista de tipos de persona y documentos para llenar los <select>
  resources :person_types, only: [ :index ]
  resources :document_types, only: [ :index ]
end
