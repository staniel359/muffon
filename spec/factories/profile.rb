FactoryBot.define do
  factory :profile do
  	id { 1 }
  	email { 'email@mail.com' }
  	password { '101010' }
  	password_confirmation { '101010' }
  	nickname { 'cornwell_93' }
  	lastfm_id { 'cornwell_93' }
  end
end
