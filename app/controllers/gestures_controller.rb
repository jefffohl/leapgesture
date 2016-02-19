class GesturesController < ApplicationController
  before_action :set_gesture, only: [:show, :update, :destroy]

  # GET /gestures
  # GET /gestures.json
  def index
    @gestures = Gesture.all

    render json: @gestures
  end

  # GET /gestures/1
  # GET /gestures/1.json
  def show
    render json: @gesture
  end

  # POST /gestures
  # POST /gestures.json
  def create
    @gesture = Gesture.new(gesture_params)

    if @gesture.save
      render json: @gesture, status: :created, location: @gesture
    else
      render json: @gesture.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /gestures/1
  # PATCH/PUT /gestures/1.json
  def update
    @gesture = Gesture.find(params[:id])

    if @gesture.update(gesture_params)
      head :no_content
    else
      render json: @gesture.errors, status: :unprocessable_entity
    end
  end

  # DELETE /gestures/1
  # DELETE /gestures/1.json
  def destroy
    @gesture.destroy

    head :no_content
  end

  private

    def set_gesture
      @gesture = Gesture.find(params[:id])
    end

    def gesture_params
      params.require(:gesture).permit(:gesture)
    end
end
