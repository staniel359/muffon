module RadioHelper
  def radio_name
    @track.dig(:radio_artist, :name) ||
      @track.dig(:radio_tag, :name)
  end

  def artist_name
    @track.dig(:artist, :name)
  end

  def artist_image
    @track.dig(:artist, :image) || 'missing_artist.png'
  end

  def wrong_name
    if params[:artist_name].present?
      'Wrong artist name.'
    elsif params[:tag_name].present?
      'Wrong tag name.'
    end
  end
end
