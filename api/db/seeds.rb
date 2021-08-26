# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
srand(88)
commit_message = %W[\u57FA\u790E\u3092\u56FA\u3081\u308B \u5FDC\u7528\u529B\u3092\u3064\u3051\u308B
                    \u3007\u3007\u304C\u3067\u304D\u308B\u3088\u3046\u306B \u5B9A\u671F\u8003\u67FB\u306E\u52C9\u5F37]
Color.create!(
  name: '青',
  code: '#6E77DB'
)
Color.create!(
  name: '緑',
  code: '#68E891'
)
Color.create!(
  name: '赤',
  code: '#EB5960'
)
Color.create!(
  name: '紫',
  code: '#CC6DF2'
)
Color.create!(
  name: '水色',
  code: '#6DDFF2'
)

Definition.create!(
  name: '数学の勉強',
  detail: '100問正答したら1commit',
  color_id: 1,
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
  color_id: 3,
  user_id: 1
)

Definition.create!(
  name: '趣味のお絵かき',
  detail: '1時間で1commit',
  color_id: 4,
  user_id: 1
)
Definition.create!(
  name: '部活(水泳)の練習',
  detail: '1時間で1commit',
  color_id: 4,
  user_id: 1
)
(Date.parse('2020/08/1')..Date.parse('2021/08/26')).each do |n|
  rand(1..5).times do |_i|
    Commit.create!(
      date: n,
      message: commit_message[rand(0..3)],
      definition_id: rand(1..5),
      count: rand(1..10),
      user_id: 1
    )
  end
end
cnt = 1
(Date.parse('2020/08/1')..Date.parse('2021/08/26')).each do |n|
  cnt += 1
  motivation = Motivation.create!(
    date: n,
    user_id: 1,
    daily_total_commits: Commit.where(user_id: 1, date: n).sum(:count)
  )
  motivation.get_motivation if cnt >= 4
end
