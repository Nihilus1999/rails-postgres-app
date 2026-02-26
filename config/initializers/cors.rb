Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Aquí le decimos que permita peticiones desde cualquier origen ("*").
    # Para entorno de desarrollo local, esto es lo más rápido y seguro para no tener bloqueos.
    origins "*"

    resource "*",
      headers: :any,
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ]
  end
end
