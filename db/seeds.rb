# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Profile.create(
  [
    {
      lastfm_id: 'cornwell_93',
      password: '101010',
      password_confirmation: '101010',
      email: 'email@mail.com',
      nickname: 'staniel'
    },
    {
      lastfm_id: 'MrPolkovnik',
      password: '101010',
      password_confirmation: '101010',
      email: 'email2@mail.com',
      nickname: 'polkovnik'
    }
  ]
)
