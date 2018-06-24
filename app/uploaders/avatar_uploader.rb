class AvatarUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  process resize_to_limit: [400, 400]
  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def default_url
    "#{version_name}_avatar_default.png"
  end

  version :md do
    process resize_to_fill: [120, 120]
  end
  version :sm do
    process resize_to_fill: [50, 50]
  end
  version :xs do
    process resize_to_fill: [30, 30]
  end

  def extension_whitelist
    %w[jpg jpeg gif png]
  end
end
