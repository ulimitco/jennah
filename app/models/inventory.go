package models

import (
	"strconv"

	"github.com/jmoiron/sqlx"
)

type Inventory struct {
	ID            int     `json:"id" db:"id"`
	InventoryType string  `json:"inventory_type" db:"inventory_type"`
	QtyIN         int64   `json:"qty_in" db:"qty_in"`
	QtyOUT        int     `json:"qty_out" db:"qty_out"`
	UnitCost      float64 `json:"unit_cost" db:"unit_cost"`
	SRP           float64 `json:"srp" db:"srp"`
	ItemID        int64   `json:"item_id" db:"item_id"`
	BranchID      int64   `json:"branch_id" db:"branch_id"`
	TransferID    int64   `json:"transfer_id" db:"transfer_id"`
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
	ID int `json:"inv_id" db:"inv_id"`
	Inventory
	Item
}

//GetInventories get all inventories
func GetInventories(db *sqlx.DB) ([]InventoryDTO, error) {

	objects := []InventoryDTO{}

	err := db.Select(&objects, "SELECT *, inv.id AS inv_id FROM inventories inv, items i WHERE inv.item_id = i.id")

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
		item, err2 := GetItem(db, val.ID)

		if err2 != nil {
			return 404, err2
		}

		qtyIn, err3 := strconv.Atoi(val.Value)

		if err3 != nil {
			return 404, err3
		}

		unitCost, _ := strconv.ParseFloat(item.DefaultUnitCost, 64)
		unitSRP, _ := strconv.ParseFloat(item.DefaultSRP, 64)

		inventory := Inventory{
			InventoryType: "PRODUCTION",
			QtyIN:         int64(qtyIn),
			QtyOUT:        0,
			UnitCost:      unitCost,
			SRP:           unitSRP,
			ItemID:        int64(item.ID),
			BranchID:      int64(binv.BranchTo),
			TransferID:    id,
		}

		StoreInventory(db, &inventory)
	}

	return 200, nil
}

//StoreInventory create new inventory
func StoreInventory(db *sqlx.DB, inventory *Inventory) (int64, error) {

	insertInventory := `INSERT INTO inventories (
		inventory_type, 
		qty_in, 
		qty_out,
		unit_cost,
		srp,
		item_id,
		branch_id,
		transfer_id
		) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`

	_, err := db.Exec(insertInventory,
		inventory.InventoryType,
		inventory.QtyIN,
		inventory.QtyOUT,
		inventory.UnitCost,
		inventory.SRP,
		inventory.ItemID,
		inventory.BranchID,
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
