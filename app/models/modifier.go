package models

import (
	"fmt"

	"github.com/jmoiron/sqlx"
)

type Modifier struct {
	ID            int    `json:"id"`
	ModifierTitle string `json:"modifier_title" db:"modifier_title"`
	ModifierItems string `json:"modifier_items" db:"modifier_items"`
}

//GetModifiers get all modifiers
func GetModifiers(db *sqlx.DB) ([]Modifier, error) {

	objects := []Modifier{}

	err := db.Select(&objects, "SELECT * FROM modifiers")

	if err != nil {
		return nil, err
	}

	return objects, nil
}

//GetModifier get one modifier
func GetModifier(db *sqlx.DB, id int) (Modifier, error) {
	var modifier Modifier

	err := db.Get(&modifier, "SELECT * FROM modifiers WHERE id=$1", id)

	if err != nil {
		return Modifier{}, err
	}

	return modifier, nil
}

//StoreModifier create new modifier
func StoreModifier(db *sqlx.DB, modifier *Modifier) (int64, error) {

	insertModifier := `INSERT INTO modifiers (modifier_title, modifier_items) VALUES ($1, $2) RETURNING id`
	_, err := db.Exec(insertModifier, modifier.ModifierTitle, modifier.ModifierItems)

	fmt.Println(modifier.ModifierItems)

	if err != nil {
		return 404, err
	}

	return 200, nil
}

//DestroyModifier delete modifier by id
func DestroyModifier(db *sqlx.DB, id int) (int64, error) {
	_, err := db.Exec("DELETE FROM modifiers WHERE id=$1", id)

	if err != nil {
		return 400, err
	}

	return 200, nil
}
