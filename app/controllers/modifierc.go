package controllers

import (
	"database/sql"
	"fmt"
	model "jennah/app/models"
	. "jennah/app/tools"
	"net/http"
	"strconv"

	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo"
)

//GetModifiersFunc - function that gets all modifiers
func GetModifiersFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		modifiers, err := model.GetModifiers(db)

		if err != nil {
			fmt.Println(err.Error())
		}

		return c.JSON(http.StatusOK, modifiers)
	}
}

func GetModifierFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "modifier id is required"})
		}

		modifierObj, err := model.GetModifier(db, id)

		if err != nil {

			switch err {
			case sql.ErrNoRows:
				return c.JSON(http.StatusNotFound, R{"response": "modifier id not found"})
			default:
				return c.JSON(http.StatusNotFound, R{"response": err.Error()})
			}
		}

		return c.JSON(200, modifierObj)
	}
}

func CreateModifierFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {

		modifier := &model.Modifier{}
		err := c.Bind(modifier)

		if err != nil {
			return c.JSON(http.StatusCreated, R{"response": err.Error()})
		}

		id, err := model.StoreModifier(db, modifier)

		return c.JSON(http.StatusCreated, R{"response": id})
	}
}

func DeleteModifierFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "modifier id is required"})
		}

		_, berr := model.DestroyModifier(db, id)

		if berr != nil {
			return c.JSON(http.StatusInternalServerError, R{"response": err.Error()})
		}

		return c.JSON(http.StatusCreated, R{"response": 200})
	}
}
