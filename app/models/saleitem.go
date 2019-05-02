package models

import (
	"github.com/jmoiron/sqlx"
)

type SaleItem struct {
	ID     int     `json:"id"`
	SRP    float32 `json:"srp" db:"srp"`
	Qty    int     `json:"qty" db:"qty"`
	Status string  `json:"status" db:"status"`
	Item   string  `json:"item" db:"item"`
	ItemID string  `json:"item_id" db:"item_id"`
	SaleID string  `json:"sale_id" db:"sale_id"`
}

//GetSaleItems get all SaleItems
func GetSaleItems(db *sqlx.DB) ([]SaleItem, error) {

	objects := []SaleItem{}

	err := db.Select(&objects, "SELECT * FROM sale_items")

	if err != nil {
		return nil, err
	}

	return objects, nil
}

//GetSaleItem get one SaleItem
func GetSaleItem(db *sqlx.DB, id int) (SaleItem, error) {
	var saleItem SaleItem

	err := db.Get(&saleItem, "SELECT * FROM sale_items WHERE id=$1", id)

	if err != nil {
		return SaleItem{}, err
	}

	return saleItem, nil
}

//StoreSaleItem create new SaleItem
func StoreSaleItem(db *sqlx.DB, SaleItem *SaleItem) (int64, error) {

	insertSaleItem := `INSERT INTO sale_items (
		qty, 
		status, 
		srp, 
		item_id,
		sale_id) VALUES ($1, $2, $3, $4, $5) RETURNING id`
	_, err := db.Exec(insertSaleItem,
		SaleItem.Qty,
		SaleItem.Status,
		SaleItem.SRP,
		SaleItem.ItemID,
		SaleItem.SaleID)

	if err != nil {
		return 404, err
	}

	return 200, nil
}

//DestroySaleItem delete SaleItem by id
func DestroySaleItem(db *sqlx.DB, id int) (int64, error) {
	_, err := db.Exec("DELETE FROM sale_items WHERE id=$1", id)

	if err != nil {
		return 400, err
	}

	return 200, nil
}
