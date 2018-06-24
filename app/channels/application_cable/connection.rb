module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_profile

    def connect
      self.current_profile = profile
    end

  private

    def profile
      Profile.find_by(id: cookies.signed[:profile_id])
    end
  end
end
