# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_210_810_072_156) do
  create_table 'colors', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8', force: :cascade do |t|
    t.string 'name'
    t.string 'code'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'commits', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8', force: :cascade do |t|
    t.bigint 'user_id'
    t.bigint 'definition_id'
    t.string 'message'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.date 'date'
    t.index ['definition_id'], name: 'index_commits_on_definition_id'
    t.index ['user_id'], name: 'index_commits_on_user_id'
  end

  create_table 'definitions', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8', force: :cascade do |t|
    t.string 'name'
    t.string 'detail'
    t.bigint 'color_id'
    t.bigint 'user_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['color_id'], name: 'index_definitions_on_color_id'
    t.index ['user_id'], name: 'index_definitions_on_user_id'
  end

  create_table 'motivations', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8', force: :cascade do |t|
    t.integer 'daily_total_commits'
    t.integer 'motivation'
    t.date 'date'
    t.integer 'total_param'
    t.bigint 'user_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['user_id'], name: 'index_motivations_on_user_id'
  end

  create_table 'relationships', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8', force: :cascade do |t|
    t.integer 'follower_id'
    t.integer 'followed_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'users', options: 'ENGINE=InnoDB DEFAULT CHARSET=utf8', force: :cascade do |t|
    t.string 'name'
    t.string 'pass'
    t.integer 'target'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'uid'
  end

  add_foreign_key 'commits', 'definitions'
  add_foreign_key 'commits', 'users'
  add_foreign_key 'definitions', 'colors'
  add_foreign_key 'definitions', 'users'
  add_foreign_key 'motivations', 'users'
end
