class PhotoTagging < ActiveRecord::Base
  attr_accessible :user_id, :photo_id, :x_pos, :y_pos

  belongs_to :user
  bleongs_to :photo
end
