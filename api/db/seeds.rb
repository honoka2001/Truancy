# frozen_string_literal: true

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
  code: '#5555FF'
)
Color.create!(
  name: '緑',
  code: '#55FF55'
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
(Date.parse("2020/08/1")..Date.parse("2021/08/31")).each do |n|
  rand(1..5).times do |i|
    Commit.create!(
      date: n,
      message: "test#{i + 1}@test.com",
      definition_id: rand(1..3),
      count: rand(1..10),
      user_id: 1
    )
  end
end
cnt = 1
(Date.parse("2020/08/1")..Date.parse("2021/08/31")).each do |n|
	cnt+=1
  motivation = Motivation.create!(
    date: n,
    user_id: 1,
    daily_total_commits: Commit.where(user_id: 1, date: n).sum(:count)
  )
  motivation.get_motivation if cnt >= 4
end
