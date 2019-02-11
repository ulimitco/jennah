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

//GetItemsFunc - function that gets all items
func GetItemsFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		items, err := model.GetItems(db)

		if err != nil {
			fmt.Println("Error ", err.Error())
		}

		return c.JSON(http.StatusOK, items)
	}
}

func GetItemFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "item id is required"})
		}

		itemObj, err := model.GetItem(db, id)

		if err != nil {

			switch err {
			case sql.ErrNoRows:
				return c.JSON(http.StatusNotFound, R{"response": "item id not found"})
			default:
				return c.JSON(http.StatusNotFound, R{"response": err.Error()})
			}
		}

		return c.JSON(200, itemObj)
	}
}

func CreateItemFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {

		item := &model.Item{}
		err := c.Bind(item)

		if err != nil {
			return c.JSON(http.StatusCreated, R{"response": err.Error()})
		}

		id, err := model.StoreItem(db, item)

		return c.JSON(http.StatusCreated, R{"response": id})
	}
}

func DeleteItemFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "item id is required"})
		}

		_, cerr := model.DestroyItem(db, id)

		if cerr != nil {
			return c.JSON(http.StatusInternalServerError, R{"response": err.Error()})
		}

		return c.JSON(http.StatusCreated, R{"response": 200})
	}
}
