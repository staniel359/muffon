class TaggingDecorator < Draper::Decorator
  delegate_all

  def model_image
    taggable.decorate.image
  end

  def model_name
    taggable.name
  end

  def model_artist_image
    taggable.decorate.artist_image
  end

  def model_artist_name
    taggable.decorate.artist_name
  end

  def model_cover
    taggable.decorate.cover
  end

  def model_title
    taggable.title
  end

  def tag_name
    profile_tag.tag.name
  end
end
