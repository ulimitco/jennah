package models

import (
	"math/rand"

	"github.com/jmoiron/sqlx"
	"github.com/uniplaces/carbon"
)

type Transfer struct {
	ID               int    `json:"id"`
	TransferSTN      string `json:"transfer_stn"`
	TransferDatetime string `json:"transfer_datetime"`
	BranchID         int    `json:"branch_id"`
}

//GetTransfers get all transfers
func GetTransfers(db *sqlx.DB) ([]Transfer, error) {

	objects := []Transfer{}

	err := db.Select(&objects, "SELECT * FROM transfers")

	if err != nil {
		return nil, err
	}

	return objects, nil
}

//GetTransfer get one transfer
func GetTransfer(db *sqlx.DB, id int) (Transfer, error) {
	var transfer Transfer

	err := db.Get(&transfer, "SELECT * FROM transfers WHERE id=$1", id)

	if err != nil {
		return Transfer{}, err
	}

	return transfer, nil
}

//StoreTransfer create new transfer
func StoreTransfer(db *sqlx.DB, branchID int) (int64, error) {

	insertTransfer := "INSERT INTO transfers (transfer_stn, transfer_datetime, branch_id) VALUES ($1, $2, $3) returning id"

	var id int64

	err := db.QueryRow(insertTransfer, rand.Intn(100), carbon.Now().DateTimeString(), branchID).Scan(&id)

	if err != nil {
		return 404, err
	}

	return id, nil
}

//DestroyTransfer delete transfer by id
func DestroyTransfer(db *sqlx.DB, id int) (int64, error) {
	_, err := db.Exec("DELETE FROM transfers WHERE id=$1", id)

	if err != nil {
		return 400, err
	}

	return 200, nil
}
