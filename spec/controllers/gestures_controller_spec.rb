require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to specify the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator.  If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails.  There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.
#
# Compared to earlier versions of this generator, there is very limited use of
# stubs and message expectations in this spec.  Stubs are only used when there
# is no simpler way to get a handle on the object needed for the example.
# Message expectations are only used when there is no simpler way to specify
# that an instance is receiving a specific message.

RSpec.describe GesturesController, type: :controller do

  # This should return the minimal set of attributes required to create a valid
  # Gesture. As you add validations to Gesture, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # GesturesController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe "GET #index" do
    it "assigns all gestures as @gestures" do
      gesture = Gesture.create! valid_attributes
      get :index, {}, valid_session
      expect(assigns(:gestures)).to eq([gesture])
    end
  end

  describe "GET #show" do
    it "assigns the requested gesture as @gesture" do
      gesture = Gesture.create! valid_attributes
      get :show, {:id => gesture.to_param}, valid_session
      expect(assigns(:gesture)).to eq(gesture)
    end
  end

  describe "GET #new" do
    it "assigns a new gesture as @gesture" do
      get :new, {}, valid_session
      expect(assigns(:gesture)).to be_a_new(Gesture)
    end
  end

  describe "GET #edit" do
    it "assigns the requested gesture as @gesture" do
      gesture = Gesture.create! valid_attributes
      get :edit, {:id => gesture.to_param}, valid_session
      expect(assigns(:gesture)).to eq(gesture)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Gesture" do
        expect {
          post :create, {:gesture => valid_attributes}, valid_session
        }.to change(Gesture, :count).by(1)
      end

      it "assigns a newly created gesture as @gesture" do
        post :create, {:gesture => valid_attributes}, valid_session
        expect(assigns(:gesture)).to be_a(Gesture)
        expect(assigns(:gesture)).to be_persisted
      end

      it "redirects to the created gesture" do
        post :create, {:gesture => valid_attributes}, valid_session
        expect(response).to redirect_to(Gesture.last)
      end
    end

    context "with invalid params" do
      it "assigns a newly created but unsaved gesture as @gesture" do
        post :create, {:gesture => invalid_attributes}, valid_session
        expect(assigns(:gesture)).to be_a_new(Gesture)
      end

      it "re-renders the 'new' template" do
        post :create, {:gesture => invalid_attributes}, valid_session
        expect(response).to render_template("new")
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested gesture" do
        gesture = Gesture.create! valid_attributes
        put :update, {:id => gesture.to_param, :gesture => new_attributes}, valid_session
        gesture.reload
        skip("Add assertions for updated state")
      end

      it "assigns the requested gesture as @gesture" do
        gesture = Gesture.create! valid_attributes
        put :update, {:id => gesture.to_param, :gesture => valid_attributes}, valid_session
        expect(assigns(:gesture)).to eq(gesture)
      end

      it "redirects to the gesture" do
        gesture = Gesture.create! valid_attributes
        put :update, {:id => gesture.to_param, :gesture => valid_attributes}, valid_session
        expect(response).to redirect_to(gesture)
      end
    end

    context "with invalid params" do
      it "assigns the gesture as @gesture" do
        gesture = Gesture.create! valid_attributes
        put :update, {:id => gesture.to_param, :gesture => invalid_attributes}, valid_session
        expect(assigns(:gesture)).to eq(gesture)
      end

      it "re-renders the 'edit' template" do
        gesture = Gesture.create! valid_attributes
        put :update, {:id => gesture.to_param, :gesture => invalid_attributes}, valid_session
        expect(response).to render_template("edit")
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested gesture" do
      gesture = Gesture.create! valid_attributes
      expect {
        delete :destroy, {:id => gesture.to_param}, valid_session
      }.to change(Gesture, :count).by(-1)
    end

    it "redirects to the gestures list" do
      gesture = Gesture.create! valid_attributes
      delete :destroy, {:id => gesture.to_param}, valid_session
      expect(response).to redirect_to(gestures_url)
    end
  end

end
