class Api::PhotoTaggingsController < ApplicationController
  before_filter :ensure_own_photo, :only => [:create]

  def create
    @photo_tagging = PhotoTagging.new(params[:photo_tagging])

    if @photo_tagging.save
      render :json => @photo_tagging
    else
      render :json => @photo_tagging.errors.full_messages, :status => 422
    end
  end

  def index
    @photo_taggings = PhotoTagging.find_by_photo_id(params[:photo_id])

    render :json => @photo_taggings
  end

  def ensure_own_photo
    photo = Photo.find(params[:photo_tagging][:photo_id])
    unless (photo.owner_id == current_user.id) do
      render :json => "User must own the photo", :status => 422
    end
  end
end