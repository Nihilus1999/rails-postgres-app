class DocumentTypesController < ApplicationController
  def index
    render json: DocumentType.all
  end
end
