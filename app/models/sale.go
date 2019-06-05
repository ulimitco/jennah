package models

import (
	"fmt"
	"strconv"

	"github.com/jmoiron/sqlx"
)

type Sale struct {
	ID                   int    `json:"id"`
	SaleDateTime         string `json:"sale_datetime" db:"sale_datetime"`
	SaleDispenseLocation string `json:"sale_dispense_location" db:"sale_dispense_location"`
	SaleDispenseDateTime string `json:"sale_dispense_datetime" db:"sale_dispense_datetime"`
	SaleNo               string `json:"sale_no" db:"sale_no"`
	SaleDetails          string `json:"sale_details" db:"sale_details"`
	SaleStatus           string `json:"sale_status" db:"sale_status"`
	CustomerID           string `json:"customer_id" db:"customer_id"`
}

type SaleWithItems struct {
	ID                   int    `json:"id"`
	SaleDateTime         string `json:"sale_datetime" db:"sale_datetime"`
	SaleDispenseLocation string `json:"sale_dispense_location" db:"sale_dispense_location"`
	SaleDispenseDateTime string `json:"sale_dispense_datetime" db:"sale_dispense_datetime"`
	SaleNo               string `json:"sale_no" db:"sale_no"`
	SaleDetails          string `json:"sale_details" db:"sale_details"`
	SaleStatus           string `json:"sale_status" db:"sale_status"`
	Customer             Customer
	SaleItems            []SaleItem
}

//GetSales get all sales
func GetSales(db *sqlx.DB) ([]SaleWithItems, error) {

	objects := []Sale{}
	objectsWithItems := []SaleWithItems{}

	err := db.Select(&objects, "SELECT * FROM sales")

	if err != nil {
		return nil, err
	}

	for _, obj := range objects {

		cID, _ := strconv.Atoi(obj.CustomerID)
		customer, _ := GetCustomer(db, cID)
		items, _ := GetSaleItemsBySaleID(db, obj.ID)

		objectsWithItems = append(objectsWithItems, SaleWithItems{
			ID:                   obj.ID,
			SaleDateTime:         obj.SaleDateTime,
			SaleDispenseLocation: obj.SaleDispenseLocation,
			SaleDispenseDateTime: obj.SaleDispenseDateTime,
			SaleNo:               obj.SaleNo,
			SaleDetails:          obj.SaleDetails,
			SaleStatus:           obj.SaleStatus,
			Customer:             customer,
			SaleItems:            items,
		})
	}

	return objectsWithItems, nil
}

//GetSale get one sale
func GetSale(db *sqlx.DB, id int) (Sale, error) {
	var sale Sale

	err := db.Get(&sale, "SELECT * FROM sales WHERE id=$1", id)

	if err != nil {
		return Sale{}, err
	}

	return sale, nil
}

//UpdateSaleStatus - update sale status
func UpdateSaleStatus(db *sqlx.DB, saleID int, status string) (int, error) {

	fmt.Println(status)
	fmt.Println(saleID)

	_, err := db.Exec("UPDATE sales SET sale_status=$1 WHERE id=$2", status, saleID)

	if err != nil {
		return 400, err
	}

	return 200, nil
}

//StoreSale create new sale
func StoreSale(db *sqlx.DB, sale *Sale) (int, error) {

	var SaleID int

	insertSale := `INSERT INTO sales (
		sale_datetime, 
		sale_dispense_location, 
		sale_dispense_datetime, 
		sale_no,
		sale_details,
		sale_status,
		customer_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`
	err := db.QueryRowx(insertSale,
		sale.SaleDateTime,
		sale.SaleDispenseLocation,
		sale.SaleDispenseDateTime,
		sale.SaleNo,
		sale.SaleDetails,
		sale.SaleStatus,
		sale.CustomerID).Scan(&SaleID)

	if err != nil {
		return 404, err
	}

	return SaleID, nil
}

//DestroySale delete sale by id
func DestroySale(db *sqlx.DB, id int) (int64, error) {
	_, err := db.Exec("DELETE FROM sales WHERE id=$1", id)

	if err != nil {
		return 400, err
	}

	return 200, nil
}
