class DropAuditTable < ActiveRecord::Migration[6.1]
  def change
    drop_table :audits
  end
end
