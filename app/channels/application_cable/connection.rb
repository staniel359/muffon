module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

  protected

    def find_verified_user
      current_user = Profile.find_by(id: cookies.signed[:profile_id])
      current_user ? current_user : reject_unauthorized_connection
    end
  end
end
