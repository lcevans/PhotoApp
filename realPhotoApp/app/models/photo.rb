class Photo < ActiveRecord::Base
  attr_accessible :owner_id, :url, :title

  belongs_to :user, :foreign_key => :owner_id, :class_name => "User"
  has_many :photo_taggings
  has_many :tagged_users, :through => :photo_taggings, :source => :user
end
