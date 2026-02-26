class PersonTypesController < ApplicationController
  def index
    render json: PersonType.all
  end
end
