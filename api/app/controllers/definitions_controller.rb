class DefinitionsController < ApplicationController
  def index
    # userのインスタンス)(レコード(行))を取得
    # user = User.find_by(uid: uid)
    user = User.find_by(definition_index_params)
    # userが複数持ってる(has_many)Definition
    definitions = user.definitions # 複数形はs
    render json: definitions
  end

  def create
    definition = Difinition.new(definitions_create_params)
    if definition.save
      render json: definition
    else
      render json: definition.errors, status: 422
    end
  end

  private

  # index用
  def definition_index_params
    params.require(:user).permit(:uid)
  end

  # create用
  def definitions_create_params
    params.require(:definition).permit(:name, :detail, :color_id, :user_id)
  end
  # uid = フロントから渡されたuid
end
