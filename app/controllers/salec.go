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

//GetSalesFunc - function that gets all sales
func GetSalesFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		sales, err := model.GetSales(db)

		if err != nil {
			fmt.Println(err.Error())
		}

		return c.JSON(http.StatusOK, sales)
	}
}

func GetSaleFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "sale id is required"})
		}

		saleObj, err := model.GetSale(db, id)

		if err != nil {

			switch err {
			case sql.ErrNoRows:
				return c.JSON(http.StatusNotFound, R{"response": "sale id not found"})
			default:
				return c.JSON(http.StatusNotFound, R{"response": err.Error()})
			}
		}

		return c.JSON(200, saleObj)
	}
}

func CreateSaleFunc(db *sqlx.DB) echo.HandlerFunc {
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

		sale := &model.Sale{
			SaleDateTime:         m["sale_datetime"].(string),
			SaleDispenseLocation: m["pickup_location"].(string),
			SaleDispenseDateTime: m["pickup_datetime"].(string),
			SaleNo:               random,
			SaleDetails:          m["order_details"].(string),
			SaleStatus:           "ORDER",
			CustomerID:           strconv.Itoa(customerID)}

		id, errSale := model.StoreSale(db, sale)

		if errSale != nil {
			return c.JSON(http.StatusNotFound, R{"response": errSale.Error()})
		}

		return c.JSON(http.StatusCreated, R{"response": id})
	}
}

func DeleteSaleFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "sale id is required"})
		}

		_, berr := model.DestroySale(db, id)

		if berr != nil {
			return c.JSON(http.StatusInternalServerError, R{"response": err.Error()})
		}

		return c.JSON(http.StatusCreated, R{"response": 200})
	}
}
