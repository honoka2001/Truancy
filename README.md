# Truancy
モチベーションを管理し継続をサポートするアプリ

![Truancy-画面](https://user-images.githubusercontent.com/80940288/204319287-0e60cc0b-5a65-4b9e-a403-026b5d54fe72.png)

<details>

<summary>実行手順</summary>

`docker-compose build`

`docker-compose run --rm front sh -c "yarn upgrade"`

`docker-compose up`

`docker-compose run api sh -c "rails db:create"`

`docker-compose run api sh -c "rails db:migrate"`

`docker-compose down`

`docker-compose up`

</details>

<details>

<summary>モチベーション算出方法</summary>

## 前提条件

- 記録開始から 3 日間はモチベーションを算出しない

## PID 算出方法

### 偏差の算出方法

前日のコミット数 - target(目標コミット数)

### 傾きの算出方法

1 日前のコミット数 / 2 日前のコミット数

### 継続量の算出方法

3 日前〜1 日前の平均コミット数

## 重み

- 偏差 1.5
- 傾き 10
- 継続量 1

## モチベーション参考値

偏差 * 1.5 + 傾き * 10 + 継続量 \* 1

## モチベーション算出方法

本日のモチベーション参考値 / 本日を含めた 3 日分の最大モチベーション参考値 \* 100

</details>
