package models

import (
	"strconv"

	"github.com/jmoiron/sqlx"
)

type Item struct {
	ID                  int     `json:"id" db:"id"`
	Item                string  `json:"item" db:"item"`
	Description         string  `json:"description" db:"description"`
	CategoryDescription string  `json:"category_description" db:"category_description"`
	Brand               string  `json:"brand" db:"brand"`
	Barcode             string  `json:"barcode" db:"barcode"`
	CategoryID          int     `json:"category_id" db:"category_id"`
	UOM                 string  `json:"uom" db:"uom"`
	DefaultUnitCost     string  `json:"default_unit_cost" db:"default_unit_cost"`
	DefaultSRP          string  `json:"default_srp" db:"default_srp"`
	MarkupPercent       float64 `json:"markup_percent" db:"markup_percent"`
	MarkupAmount        float64 `json:"markup_amount" db:"markup_amount"`
	StockNotifyLimit    int     `json:"stock_notify_limit" db:"stock_notify_limit"`
	StockLimit          int     `json:"stock_limit" db:"stock_limit"`
}

type ItemDTO struct {
	ID int `json:"item_id,omitempty" db:"item_id"`
	Item
	Category
}

//GetItems get all items
func GetItems(db *sqlx.DB) ([]ItemDTO, error) {

	objects := []ItemDTO{}

	err := db.Select(&objects, "SELECT *, i.id AS item_id FROM items i, categories c WHERE i.category_id = c.id")

	if err != nil {
		return nil, err
	}

	return objects, nil
}

//GetItem get one item
func GetItem(db *sqlx.DB, id int) (Item, error) {
	var item Item

	err := db.Get(&item, "SELECT * FROM items WHERE id=$1", id)

	if err != nil {
		return Item{}, err
	}

	return item, nil
}

//StoreItem create new item
func StoreItem(db *sqlx.DB, item *Item) (int64, error) {

	unitCost, _ := strconv.ParseFloat(item.DefaultUnitCost, 64)
	unitSRP, _ := strconv.ParseFloat(item.DefaultSRP, 64)

	if item.ID != 0 {
		updateQuery := `UPDATE items SET 
			item=$1,
			description=$2,
			brand=$3,
			barcode=$4,
			category_id=$5, 
			uom=$6,
			default_unit_cost=$7,
			default_srp=$8,
			markup_percent=$9, 
			markup_amount=$10,
			stock_notify_limit=$11,
			stock_limit=$12 WHERE id=$13`

		_, err := db.Exec(updateQuery,
			item.Item,
			item.Description,
			item.Brand,
			item.Barcode,
			item.CategoryID,
			item.UOM,
			unitCost,
			unitSRP,
			item.MarkupPercent,
			item.MarkupAmount,
			item.StockNotifyLimit,
			item.StockLimit,
			item.ID)

		if err != nil {
			return 404, err
		}
	} else {
		insertQuery := `INSERT INTO items (
			item, 
			description, 
			brand, 
			barcode, 
			category_id, 
			uom, 
			default_unit_cost,
			default_srp,
			markup_percent, 
			markup_amount, 
			stock_notify_limit, 
			stock_limit) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`
		_, err := db.Exec(insertQuery,
			item.Item,
			item.Description,
			item.Brand,
			item.Barcode,
			item.CategoryID,
			item.UOM,
			unitCost,
			unitSRP,
			item.MarkupPercent,
			item.MarkupAmount,
			item.StockNotifyLimit,
			item.StockLimit)

		if err != nil {
			return 404, err
		}
	}

	return 200, nil
}

//DestroyItem delete item by id
func DestroyItem(db *sqlx.DB, id int) (int64, error) {
	_, err := db.Exec("DELETE FROM items WHERE id=$1", id)
	if err != nil {
		return 400, err
	}
	return 200, nil
}
