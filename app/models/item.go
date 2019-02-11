package models

import (
	"github.com/jmoiron/sqlx"
)

type Item struct {
	ID               int     `json:"id" db:"id"`
	Item             string  `json:"item" db:"item"`
	Description      string  `json:"description" db:"description"`
	StockCode        string  `json:"stock_code" db:"stock_code"`
	Barcode          string  `json:"barcode" db:"barcode"`
	CategoryID       int     `json:"category_id" db:"category_id"`
	UOM              string  `json:"uom" db:"uom"`
	Packaging        string  `json:"packaging" db:"packaging"`
	PackageQty       int     `json:"package_qty" db:"package_qty"`
	MarkupPercent    float64 `json:"markup_percent" db:"markup_percent"`
	MarkupAmount     float64 `json:"markup_amount" db:"markup_amount"`
	StockNotifyLimit int     `json:"stock_notify_limit" db:"stock_notify_limit"`
	StockLimit       int     `json:"stock_limit" db:"stock_limit"`
}

type ItemDTO struct {
	ID                  int     `json:"id" db:"id"`
	Item                string  `json:"item" db:"item"`
	Description         string  `json:"description" db:"description"`
	StockCode           string  `json:"stock_code" db:"stock_code"`
	Barcode             string  `json:"barcode" db:"barcode"`
	CategoryCode        string  `json:"category_code" db:"category_code"`
	CategoryDescription string  `json:"category_description" db:"category_description"`
	UOM                 string  `json:"uom" db:"uom"`
	Packaging           string  `json:"packaging" db:"packaging"`
	PackageQty          int     `json:"package_qty" db:"package_qty"`
	MarkupPercent       float64 `json:"markup_percent" db:"markup_percent"`
	MarkupAmount        float64 `json:"markup_amount" db:"markup_amount"`
	StockNotifyLimit    int     `json:"stock_notify_limit" db:"stock_notify_limit"`
	StockLimit          int     `json:"stock_limit" db:"stock_limit"`
}

//GetItems get all items
func GetItems(db *sqlx.DB) ([]ItemDTO, error) {

	objects := []ItemDTO{}

	err := db.Select(&objects, "SELECT i.id, i.item, i.description, i.stock_code, i.barcode, c.code AS category_code, c.description AS category_description FROM items i LEFT JOIN categories c ON i.category_id = c.id")

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

	insertItem := `INSERT INTO items (item, description, stock_code, barcode, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING id`
	_, err := db.Exec(insertItem, item.Item, item.Description, item.StockCode, item.Barcode, item.CategoryID)

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
