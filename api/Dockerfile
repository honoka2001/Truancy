

FROM ruby:2.5.3

# 必要なパッケージのインストール（基本的に必要になってくるものだと思うので削らないこと）
RUN apt-get update -qq && \
	apt-get install -y build-essential \
	libpq-dev \
	nodejs

# 作業ディレクトリの作成、設定
RUN mkdir /app_name
##作業ディレクトリ名をAPP_ROOTに割り当てて、以下$APP_ROOTで参照
ENV APP_ROOT /app_name
WORKDIR $APP_ROOT

# ホスト側（ローカル）のGemfileを追加する（ローカルのGemfileは【３】で作成）
ADD ./Gemfile $APP_ROOT/Gemfile
ADD ./Gemfile.lock $APP_ROOT/Gemfile.lock

# Gemfileのbundle install
RUN bundle install
ADD . $APP_ROOT

# docker-compose run api rails new . --force --database=mysql --skip-bundle
# docker-compose run api rails new back --force --database=mysql --skip-bundle --api
# docker-compose run api sh -c 'cd api && rails new . --force --database=mysql --skip-bundle --api'有力
# docker-compose run api sh -c 'cd api && docker-compose run api rails new . --force --database=mysql --skip-bundle --api'有力
# DBの設定を変更
# docker-compose run --rm front sh -c 'npx create-next-app app'
# docker-compose run api sh -c "cd api && rails db:create";