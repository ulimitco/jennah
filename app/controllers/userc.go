package controllers

import (
	"database/sql"
	"fmt"
	model "jennah/app/models"
	"jennah/app/tools"
	. "jennah/app/tools"
	"net/http"
	"strconv"

	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo"
)

//Authenticate - function that gets all users
func Authenticate(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {

		username := c.FormValue("username")
		password := c.FormValue("password")

		var user model.User

		user, err := model.ValidateCredentials(db, username, password)

		if err != nil {
			return c.JSON(http.StatusNotFound, R{"response": err.Error()})
		}

		token, err := tools.SetClaimsAndReturnToken(user.Username, user.Email, user.Role)

		returnVal := make(map[string]interface{}, 4)

		returnVal["access_token"] = token
		returnVal["rx"] = user.Role
		returnVal["username"] = user.Email
		returnVal["status"] = 200

		return c.JSON(http.StatusOK, R{"response": returnVal})
	}
}

//GetUsersFunc - function that gets all users
func GetUsersFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		users, err := model.GetUsers(db)

		if err != nil {
			fmt.Println(err.Error())
		}

		return c.JSON(http.StatusOK, users)
	}
}

func GetUserFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "user id is required"})
		}

		userObj, err := model.GetUser(db, id)

		if err != nil {

			switch err {
			case sql.ErrNoRows:
				return c.JSON(http.StatusNotFound, R{"response": "user id not found"})
			default:
				return c.JSON(http.StatusNotFound, R{"response": err.Error()})
			}
		}

		return c.JSON(200, userObj)
	}
}

func CreateUserFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {

		user := &model.User{}
		err := c.Bind(user)

		if err != nil {
			return c.JSON(http.StatusCreated, R{"response": err.Error()})
		}

		id, err := model.StoreUser(db, user)

		if err != nil {
			return c.JSON(http.StatusBadRequest, R{"response": err.Error()})
		}

		return c.JSON(http.StatusCreated, R{"response": id})
	}
}

func DeleteUserFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "user id is required"})
		}

		_, err = model.DestroyUser(db, id)

		if err != nil {
			return c.JSON(http.StatusInternalServerError, R{"response": err.Error()})
		}

		return c.JSON(http.StatusCreated, R{"response": 200})
	}
}
