package models

import (
	"github.com/jmoiron/sqlx"
)

type Category struct {
	ID                  int    `json:"id" db:"id"`
	Code                string `json:"code" db:"code"`
	CategoryDescription string `json:"category_description" db:"category_description"`
}

//GetCategories get all categories
func GetCategories(db *sqlx.DB) ([]Category, error) {

	objects := []Category{}

	err := db.Select(&objects, "SELECT * FROM categories")

	if err != nil {
		return nil, err
	}

	return objects, nil
}

//GetCategory get one category
func GetCategory(db *sqlx.DB, id int) (Category, error) {
	var category Category

	err := db.Get(&category, "SELECT * FROM categories WHERE id=$1", id)

	if err != nil {
		return Category{}, err
	}

	return category, nil
}

//StoreCategory create new category
func StoreCategory(db *sqlx.DB, category *Category) (int64, error) {
	if category.ID != 0 {
		insertCategory := `UPDATE categories SET code=$1, category_description=$2 WHERE id=$3`
		_, err := db.Exec(insertCategory, category.Code, category.CategoryDescription, category.ID)

		if err != nil {
			return 404, err
		}
	} else {
		insertCategory := `INSERT INTO categories (code, category_description) VALUES ($1, $2) RETURNING id`
		_, err := db.Exec(insertCategory, category.Code, category.CategoryDescription)

		if err != nil {
			return 404, err
		}
	}

	return 200, nil
}

//DestroyCategory delete category by id
func DestroyCategory(db *sqlx.DB, id int) (int64, error) {
	_, err := db.Exec("DELETE FROM categories WHERE id=$1", id)
	if err != nil {
		return 400, err
	}
	return 200, nil
}
