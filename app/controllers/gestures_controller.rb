class GesturesController < ApplicationController
  respond_to :json, :lz
  before_action :set_gesture, only: [:show, :update, :destroy]

  # GET /gestures
  # GET /gestures.json
  def index
    @gestures = Gesture.select('id,created_at,updated_at')

    render json: {:data => @gestures}
  end

  # GET /gestures/1
  # GET /gestures/1.json
  def show
    render json: {:data => @gesture}
  end

  # GET /gestures?fields=
  # GET /gestures.json?fields=

  def data
    @gesturedata = Gesture.select('data').where("id =?" , params[:id])
    render json: @gesturedata[0][:data]
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
      params.permit(:data)
    end
end
