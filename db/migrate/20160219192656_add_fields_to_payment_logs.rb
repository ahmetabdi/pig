class AddFieldsToPaymentLogs < ActiveRecord::Migration[5.0]
  def change
    remove_column :payment_logs, :log
    add_column :payment_logs, :paypal_email, :string
    add_column :payment_logs, :paypal_transaction_number, :string
    add_column :payment_logs, :payment_date, :string
    add_column :payment_logs, :payment_status, :string
  end
end
