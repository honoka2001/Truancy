class DefinitionsController < ApplicationController
  def index
    # userのインスタンス)(レコード(行))を取得
    # user = User.find_by(uid: uid)
    # user = User.find_by(definition_index_params)
    # userが複数持ってる(has_many)Definition
    # definitions = user.definitions # 複数形はs
    definitions = Definition.joins(:color).select('definitions.id, definitions.name definitions_name, definitions.detail, colors.code, colors.name colors_name').where(user_id: params[:id])
    render json: definitions
  end

  def create
    definition = Definition.new(definitions_create_params)
    if definition.save
      render json: definition
    else
      render json: { error: definition.errors, status: 422 }
    end
  end

  private

  # index用
  def definition_index_params
    params.require(:user).permit(:uid)
  end

  # create用
  def definitions_create_params
    params.require(:definition).permit(:user_id, :name, :detail, :color_id)
  end
  # uid = フロントから渡されたuid
end
