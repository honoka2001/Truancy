# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
srand(88)
Color.create!(
  name: '青',
  code: '#55555FF'
)
Color.create!(
  name: '緑',
  code: '#555FF55'
)
Color.create!(
  name: '赤',
  code: '#FF5555'
)

Definition.create!(
  name: '数学の勉強',
  detail: '100問正答したら1commit',
  color_id: 3,
  user_id: 1
)
Definition.create!(
  name: '環境学の勉強',
  detail: '参考書10ページで1commit',
  color_id: 2,
  user_id: 1
)

Definition.create!(
  name: 'Rubyの勉強',
  detail: '1commitで1commit',
  color_id: 1,
  user_id: 1
)
1..20.times do |n|
  rand(1..10).times do |i|
    Commit.create!(
      date: Time.parse("2021/08/#{n+1}"),
      message: "test#{i + 1}@test.com",
      definition_id: rand(1..3),
      user_id: 1
    )
  end
end
