package models

import (
	"github.com/jmoiron/sqlx"
)

type Inventory struct {
	ID            int     `json:"id" db:"id"`
	InventoryType string  `json:"inventory_type" db:"inventory_type"`
	QtyIN         int     `json:"qty_in" db:"qty_in"`
	QtyOUT        int     `json:"qty_out" db:"qty_out"`
	UnitCost      float64 `json:"unit_cost" db:"unit_cost"`
	SRP           float64 `json:"srp" db:"srp"`
	ItemID        int     `json:"item_id" db:"item_id"`
	BranchID      int     `json:"branch_id" db:"branch_id"`
	PodelID       int     `json:"podel_id" db:"podel_id"`
	TransferID    int     `json:"transfer_id" db:"transfer_id"`
}

type BatchInventory struct {
	BranchFrom int `json:"branch_from"`
	BranchTo   int `json:"branch_to"`
	Data       []BatchItem
}

type BatchItem struct {
	ID    int    `json:"id"`
	Value string `json:"value"`
}

type InventoryDTO struct {
	ID            int     `json:"id" db:"id"`
	InventoryType string  `json:"inventory_type" db:"inventory_type"`
	QtyIN         int     `json:"qty_in" db:"qty_in"`
	QtyOUT        int     `json:"qty_out" db:"qty_out"`
	UnitCost      float64 `json:"unit_cost" db:"unit_cost"`
	SRP           float64 `json:"srp" db:"srp"`
	Item          Item
}

//GetInventories get all inventories
func GetInventories(db *sqlx.DB) ([]InventoryDTO, error) {

	objects := []InventoryDTO{}

	err := db.Select(&objects, "SELECT inv.id, inv.inventory_type, inv.qty_in, inv.qty_out, inv.unit_cost, inv.srp, i.uom, i.packaging, i.package_qty, i.default_unit_cost, i.default_srp, i.item AS item, i.markup_percent, i.markup_amount, i.stock_notify_limit, i.stock_limit FROM inventories inv LEFT JOIN items i ON inv.item_id = i.id")

	if err != nil {
		return nil, err
	}

	return objects, nil
}

//GetInventory get one inventory
func GetInventory(db *sqlx.DB, id int) (Inventory, error) {
	var inventory Inventory

	err := db.Get(&inventory, "SELECT * FROM inventories WHERE id=$1", id)

	if err != nil {
		return Inventory{}, err
	}

	return inventory, nil
}

//StoreInventories create new item
func StoreInventories(db *sqlx.DB, binv *BatchInventory) (int64, error) {

	id, err := StoreTransfer(db, binv.BranchFrom)

	if err != nil {
		return 404, err
	}

	for _, val := range binv.Data {

	}

	// _, err := db.Exec(insertItem, item.Item, item.Description, item.StockCode, item.Barcode, item.CategoryID)

	// if err != nil {
	// 	return 404, err
	// }

	return 200, nil
}

//StoreInventory create new inventory
func StoreInventory(db *sqlx.DB, inventory *Inventory) (int64, error) {

	insertInventory := `INSERT INTO inventories (
		inventory_type, 
		uom, 
		qty_pmeasure, 
		qty_in, 
		qty_out,
		unit_cost,
		srp,
		item_id,
		branch_id,
		podel_id,
		transfer_id
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`

	_, err := db.Exec(insertInventory,
		inventory.InventoryType,
		inventory.UOM,
		inventory.QtyPMeasure,
		inventory.QtyIN,
		inventory.QtyOUT,
		inventory.UnitCost,
		inventory.SRP,
		inventory.ItemID,
		inventory.BranchID,
		inventory.PodelID,
		inventory.TransferID,
	)

	if err != nil {
		return 404, err
	}

	return 200, nil
}

//DestroyInventory delete inventory by id
func DestroyInventory(db *sqlx.DB, id int) (int64, error) {
	_, err := db.Exec("DELETE FROM inventories WHERE id=$1", id)
	if err != nil {
		return 400, err
	}
	return 200, nil
}
