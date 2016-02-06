class CreatePaymentLogs < ActiveRecord::Migration[5.0]
  def change
    create_table :payment_logs do |t|
      t.hstore :log, default: {}, null: false, index: true
      t.references :user, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
