class AddDetailsToMotivations < ActiveRecord::Migration[5.2]
  def change
    add_column :motivations, :sub_param, :float
    add_column :motivations, :diff_param, :float
    add_column :motivations, :avg_param, :float
  end
end
