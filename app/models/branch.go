package models

import (
	"github.com/jmoiron/sqlx"
)

//Branch - Branch struct
type Branch struct {
	ID   int    `json:"id"`
	Code string `json:"code"`
	Name string `json:"name"`
}

//GetBranches get all branches
func GetBranches(db *sqlx.DB) ([]Branch, error) {

	objects := []Branch{}

	err := db.Select(&objects, "SELECT * FROM branches")

	if err != nil {
		return nil, err
	}

	return objects, nil
}

//GetBranch get one branch
func GetBranch(db *sqlx.DB, id int) (Branch, error) {
	var branch Branch

	err := db.Get(&branch, "SELECT * FROM branches WHERE id=$1", id)

	if err != nil {
		return Branch{}, err
	}

	return branch, nil
}

//StoreBranch create new branch
func StoreBranch(db *sqlx.DB, branch *Branch) (int64, error) {

	if branch.ID != 0 {
		insertBranch := `UPDATE branches SET code = $1, name = $2 WHERE id = $3`
		_, err := db.Exec(insertBranch, branch.Code, branch.Name, branch.ID)

		if err != nil {
			return 404, err
		}

	} else {
		insertBranch := `INSERT INTO branches (code, name) VALUES ($1, $2) RETURNING id`
		_, err := db.Exec(insertBranch, branch.Code, branch.Name)

		if err != nil {
			return 404, err
		}
	}

	return 200, nil
}

//DestroyBranch delete branch by id
func DestroyBranch(db *sqlx.DB, id int) (int64, error) {

	_, err := db.Exec("DELETE FROM branches WHERE id=$1", id)

	if err != nil {
		return 400, err
	}

	return 200, nil
}
