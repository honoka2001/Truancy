# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Color.create!(
  name: '青',
  code: '#55555FF'
)
Color.create!(
  name: '赤',
  code: '#ff5555'
)
Color.create!(
  name: '緑',
  code: '#55ff55'
)

User.create(
    name: 'yopipi',
    pass: 'yossi',
    target: '10'
)

Color.create(
    name: 'green',
    code: '4db56a'
)

Definition.create(
    name: '数学',
    detail: '大問1つ',
    color_id: 1,
    user_id: 1
)

Commit.create(
    user_id: 1,
    definition_id: 1,
    message: 'つかれた'
)
