class CreateEdits < ActiveRecord::Migration[6.1]
  def change
    create_table :edits do |t|
      t.references :user, null: false, foreign_key: true
      t.references :contact, null: false, foreign_key: true

      t.timestamps
    end
  end
end
