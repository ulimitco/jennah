package controllers

import (
	"database/sql"
	"fmt"
	model "jennah/app/models"
	. "jennah/app/tools"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo"
)

//GetSaleItemsFunc - function that gets all SaleItems
func GetSaleItemsFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		SaleItems, err := model.GetSaleItems(db)

		if err != nil {
			fmt.Println(err.Error())
		}

		return c.JSON(http.StatusOK, SaleItems)
	}
}

func GetSaleItemFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "SaleItem id is required"})
		}

		SaleItemObj, err := model.GetSaleItem(db, id)

		if err != nil {

			switch err {
			case sql.ErrNoRows:
				return c.JSON(http.StatusNotFound, R{"response": "SaleItem id not found"})
			default:
				return c.JSON(http.StatusNotFound, R{"response": err.Error()})
			}
		}

		return c.JSON(200, SaleItemObj)
	}
}

func CreateSaleItemFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {

		m := echo.Map{}
		errMap := c.Bind(&m)

		if errMap != nil {
			return c.JSON(http.StatusNotFound, R{"response": errMap.Error()})
		}

		customer := &model.Customer{CustomerName: c.Param("customer_name"),
			CustomerNumber:  m["customer_contact"].(string),
			CustomerEmail:   "n/a",
			CustomerAddress: "n/a"}

		customerID, err := model.StoreCustomer(db, customer)

		if err != nil {
			return c.JSON(http.StatusCreated, R{"response": err.Error()})
		}

		random := strconv.Itoa(rand.Int())

		SaleItem := &model.SaleItem{
			SaleItemDateTime:         m["SaleItem_datetime"].(string),
			SaleItemDispenseLocation: m["pickup_location"].(string),
			SaleItemDispenseDateTime: m["pickup_datetime"].(string),
			SaleItemNo:               random,
			SaleItemDetails:          m["order_details"].(string),
			SaleItemStatus:           "ORDER",
			CustomerID:               strconv.Itoa(customerID)}

		id, errSaleItem := model.StoreSaleItem(db, SaleItem)

		if errSaleItem != nil {
			return c.JSON(http.StatusNotFound, R{"response": errSaleItem.Error()})
		}

		return c.JSON(http.StatusCreated, R{"response": id})
	}
}

func DeleteSaleItemFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "SaleItem id is required"})
		}

		_, berr := model.DestroySaleItem(db, id)

		if berr != nil {
			return c.JSON(http.StatusInternalServerError, R{"response": err.Error()})
		}

		return c.JSON(http.StatusCreated, R{"response": 200})
	}
}
