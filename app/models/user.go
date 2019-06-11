package models

import (
	"fmt"
	"jennah/app/tools"

	"github.com/jmoiron/sqlx"
)

type User struct {
	ID       int    `json:"id" db:"id"`
	Email    string `json:"email" db:"email"`
	Username string `json:"username" db:"username"`
	Name     string `json:"name" db:"name"`
	Password string `json:"password" db:"password"`
	Role     string `json:"role" db:"role"`
	BranchID int    `json:"branch_id" db:"branch_id"`
}

type UserDTO struct {
	ID         int    `json:"id" db:"id"`
	Email      string `json:"email" db:"email"`
	Username   string `json:"username" db:"username"`
	Name       string `json:"name" db:"name"`
	Role       string `json:"role" db:"role"`
	BranchCode string `json:"branch_code" db:"branch_code"`
	BranchName string `json:"branch_name" db:"branch_name"`
	BranchID   int    `json:"branch_id" db:"branch_id"`
}

//ValidateCredentials authenticates credentials
func ValidateCredentials(db *sqlx.DB, username string, password string) (User, error) {

	var foundUser User

	err := db.Get(&foundUser, "SELECT * FROM users WHERE username=$1", username)

	if err != nil {
		return User{}, err
	}

	match, hashErr := tools.CheckPasswordHash(password, foundUser.Password)

	if match {
		return foundUser, nil
	}

	return User{}, hashErr
}

//GetUsers get all users
func GetUsers(db *sqlx.DB) ([]UserDTO, error) {

	users := []UserDTO{}

	err := db.Select(&users, "SELECT u.id, u.email, u.username, u.name, u.role, b.code AS branch_code, b.name AS branch_name, b.id AS branch_id FROM users u LEFT JOIN branches b ON u.branch_id = b.id")

	if err != nil {
		return nil, err
	}

	return users, nil
}

//GetUsersByBranch get all users by branch
func GetUsersByBranch(db *sqlx.DB, branchID int) ([]User, error) {

	users := []User{}

	err := db.Select(&users, "SELECT * FROM users where branch_id=$1", branchID)

	if err != nil {
		return nil, err
	}

	return users, nil
}

//GetUser get one user
func GetUser(db *sqlx.DB, id int) (User, error) {
	var user User

	err := db.Get(&user, "SELECT * FROM users WHERE id=$1", id)

	if err != nil {
		return User{}, err
	}

	return user, nil
}

//StoreUser create new user
func StoreUser(db *sqlx.DB, user *User) (int64, error) {

	fmt.Println(user)

	if user.ID != 0 {
		insertUser := `UPDATE users SET name = $1, branch_id = $2, role = $3 WHERE id = $4`
		_, err := db.Exec(insertUser, user.Name, user.BranchID, user.Role, user.ID)

		if err != nil {
			return 404, err
		}

	} else {
		insertUser := `INSERT INTO users (email, username, name, role, branch_id, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`

		hashedPassword, err := tools.HashPassword(user.Password)

		_, err = db.Exec(insertUser, user.Email, user.Username, user.Name, user.Role, user.BranchID, hashedPassword)

		if err != nil {
			return 404, err
		}
	}

	return 200, nil
}

//DestroyUser delete user by id
func DestroyUser(db *sqlx.DB, id int) (int64, error) {
	_, err := db.Exec("DELETE FROM users WHERE id=$1", id)

	if err != nil {
		return 400, err
	}
	return 200, nil
}
