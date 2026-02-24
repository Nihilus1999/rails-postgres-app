Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # "origins" define quién tiene permiso. 
    # "*" permite a cualquier aplicación (útil para desarrollo).
    # Si quieres ser específico, usa "http://localhost:5173" (Vite/React).
    origins "*" 

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end