package models

import (
	"github.com/jmoiron/sqlx"
)

type Customer struct {
	ID              int    `json:"id" db:"id"`
	CustomerName    string `json:"customer_name" db:"customer_name"`
	CustomerNumber  string `json:"customer_number" db:"customer_number"`
	CustomerEmail   string `json:"customer_email" db:"customer_email"`
	CustomerAddress string `json:"customer_address" db:"customer_address"`
}

//GetCustomers get all customers
func GetCustomers(db *sqlx.DB) ([]Customer, error) {

	objects := []Customer{}

	err := db.Select(&objects, "SELECT * FROM customers")

	if err != nil {
		return nil, err
	}

	return objects, nil
}

//GetCustomer get one customer
func GetCustomer(db *sqlx.DB, id int) (Customer, error) {
	var customer Customer

	err := db.Get(&customer, "SELECT * FROM customers WHERE id=$1", id)

	if err != nil {
		return Customer{}, err
	}

	return customer, nil
}

//StoreCustomer create new customer
func StoreCustomer(db *sqlx.DB, customer *Customer) (int, error) {

	insertCustomer := `INSERT INTO customers (customer_name, customer_number, customer_email, customer_address) VALUES ($1, $2, $3, $4) RETURNING id`

	var customerID int

	err := db.QueryRowx(insertCustomer, customer.CustomerName, customer.CustomerNumber, customer.CustomerEmail, customer.CustomerAddress).Scan(&customerID)

	if err != nil {
		return 404, err
	}

	return customerID, nil
}

//DestroyCustomer delete customer by id
func DestroyCustomer(db *sqlx.DB, id int) (int64, error) {
	_, err := db.Exec("DELETE FROM customers WHERE id=$1", id)

	if err != nil {
		return 400, err
	}

	return 200, nil
}
