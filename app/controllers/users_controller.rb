class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_user, only: [ :show, :update, :destroy ]

  # GET all
  def index
    @users = User.includes(:person_type, :document_type).all
    render json: @users.as_json(include: {
      person_type: { only: :name },
      document_type: { only: :name }
    })
  end

  # GET by user
  def show
    render json: @user.as_json(include: {
      person_type: { only: :name },
      document_type: { only: :name }
    })
  end

  # POST
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE
  def destroy
    @user.destroy
    render json: { message: "Usuario eliminado correctamente" }
  end

  private

  def set_user
    @user = User.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Usuario no encontrado" }, status: :not_found
  end

  def user_params
    params.require(:user).permit(
      :person_type_id,
      :document_type_id,
      :document_number,
      :document_issue_date,
      :document_expiration_date,
      :name,
      :email,
      :primary_phone,
      :secondary_phone
    )
  end
end
