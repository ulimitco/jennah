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

//GetInventoriesFunc - function that gets all inventories
func GetInventoriesFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		inventories, err := model.GetInventories(db)

		if err != nil {
			fmt.Println("Error", err.Error())
		}

		return c.JSON(http.StatusOK, inventories)
	}
}

func GetInventoryFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "inventory id is required"})
		}

		inventoryObj, err := model.GetInventory(db, id)

		if err != nil {

			switch err {
			case sql.ErrNoRows:
				return c.JSON(http.StatusNotFound, R{"response": "inventory id not found"})
			default:
				return c.JSON(http.StatusNotFound, R{"response": err.Error()})
			}
		}

		return c.JSON(200, inventoryObj)
	}
}

func CreateInventoriesFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {

		inventory := &model.BatchInventory{}
		err := c.Bind(inventory)

		if err != nil {
			return c.JSON(http.StatusCreated, R{"response": err.Error()})
		}

		id, err2 := model.StoreInventories(db, inventory)

		if err2 != nil {
			return c.JSON(http.StatusCreated, R{"response": err2.Error()})
		}

		return c.JSON(http.StatusCreated, R{"response": id})
	}
}

func CreateInventoryFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {

		inventory := &model.Inventory{}
		err := c.Bind(inventory)

		if err != nil {
			return c.JSON(http.StatusCreated, R{"response": err.Error()})
		}

		id, err := model.StoreInventory(db, inventory)

		return c.JSON(http.StatusCreated, R{"response": id})
	}
}

func DeleteInventoryFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "inventory id is required"})
		}

		_, cerr := model.DestroyInventory(db, id)

		if cerr != nil {
			return c.JSON(http.StatusInternalServerError, R{"response": err.Error()})
		}

		return c.JSON(http.StatusCreated, R{"response": 200})
	}
}
