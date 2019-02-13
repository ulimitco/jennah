package models

import (
	"github.com/jmoiron/sqlx"
)

type Item struct {
	ID               int     `json:"id" db:"id"`
	Item             string  `json:"item" db:"item"`
	Description      string  `json:"description,omitempty" db:"description"`
	StockCode        string  `json:"stock_code,omitempty" db:"stock_code"`
	Barcode          string  `json:"barcode,omitempty" db:"barcode"`
	CategoryID       int     `json:"category_id" db:"category_id"`
	UOM              string  `json:"uom,omitempty" db:"uom"`
	Packaging        string  `json:"packaging,omitempty" db:"packaging"`
	PackageQty       int     `json:"package_qty,omitempty" db:"package_qty"`
	DefaultUnitCost  float64 `json:"default_unit_cost,omitempty" db:"default_unit_cost"`
	DefaultSRP       float64 `json:"default_srp,omitempty" db:"default_srp"`
	MarkupPercent    float64 `json:"markup_percent,omitempty" db:"markup_percent"`
	MarkupAmount     float64 `json:"markup_amount,omitempty" db:"markup_amount"`
	StockNotifyLimit int     `json:"stock_notify_limit,omitempty" db:"stock_notify_limit"`
	StockLimit       int     `json:"stock_limit,omitempty" db:"stock_limit"`
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

	insertItem := `INSERT INTO items (item, description, stock_code, barcode, category_id, uom, packaging, package_qty, default_unit_cost, default_srp, markup_percent, markup_amount, stock_notify_limit, stock_limit) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id`
	_, err := db.Exec(insertItem, item.Item, item.Description, item.StockCode, item.Barcode, item.CategoryID, item.UOM, item.Packaging, item.PackageQty, item.DefaultUnitCost, item.DefaultSRP, item.MarkupPercent, item.MarkupAmount, item.StockNotifyLimit, item.StockLimit)

	if err != nil {
		return 404, err
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
