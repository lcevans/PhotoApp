class Api::PhotosController < ApplicationController
  def create
    p "***************"
    p params[:attr]
    p "****************"
    @photo = Photo.new(params[:attr])

    begin
      if @photo.save
        render :json => @photo
      else
        render :json => @photo.errors.full_messages, :status => 422
      end
    rescue Errno::ECONNRESET => e
      puts "ignore it"
    end
  end

  def show
    @photo = Photo.find(params[:id])
    render :json => @photo
  end

  def index
    @photos = Photo.where(:owner_id => params[:user_id])
    respond_to do |format|
      format.html { render :index }
      format.json { render :json => @photos }
    end
  end

end