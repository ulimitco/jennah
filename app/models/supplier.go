package models

import (
	"github.com/jmoiron/sqlx"
)

//Supplier struct Supplier
type Supplier struct {
	ID              int    `json:"id" db:"id"`
	SupplierCode    string `json:"supplier_code" db:"supplier_code"`
	SupplierDesc    string `json:"supplier_description" db:"supplier_description"`
	SupplierPerson  string `json:"supplier_contact_person" db:"supplier_contact_person"`
	SupplierContact string `json:"supplier_contact" db:"supplier_contact"`
	SupplierEmail   string `json:"supplier_email" db:"supplier_email"`
}

//GetSuppliers get all suppliers
func GetSuppliers(db *sqlx.DB) ([]Supplier, error) {

	objects := []Supplier{}

	err := db.Select(&objects, "SELECT * FROM suppliers")

	if err != nil {
		return nil, err
	}

	return objects, nil
}

//GetSupplier get one supplier
func GetSupplier(db *sqlx.DB, id int) (Supplier, error) {
	var supplier Supplier

	err := db.Get(&supplier, "SELECT * FROM suppliers WHERE id=$1", id)

	if err != nil {
		return Supplier{}, err
	}

	return supplier, nil
}

//StoreSupplier create new supplier
func StoreSupplier(db *sqlx.DB, supplier *Supplier) (int64, error) {

	insertSupplier := `INSERT INTO suppliers (supplier_code, supplier_description, supplier_contact_person, supplier_contact, supplier_email) VALUES ($1, $2, $3, $4, $5) RETURNING id`
	_, err := db.Exec(insertSupplier, supplier.SupplierCode, supplier.SupplierDesc, supplier.SupplierPerson, supplier.SupplierContact, supplier.SupplierEmail)

	if err != nil {
		return 404, err
	}

	return 200, nil
}

//DestroySupplier delete supplier by id
func DestroySupplier(db *sqlx.DB, id int) (int64, error) {
	_, err := db.Exec("DELETE FROM suppliers WHERE id=$1", id)
	if err != nil {
		return 400, err
	}
	return 200, nil
}
