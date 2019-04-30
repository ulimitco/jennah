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

type Orders struct {
	ItemID int    `json:"item_id"`
	Item   string `json:"item"`
}

func TestSumbit(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		m := echo.Map{}
		_ = c.Bind(&m)

		return c.JSON(http.StatusCreated, R{"response": 1})
	}
}

func CreateSaleFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {

		m := echo.Map{}
		_ = c.Bind(&m)

		random := strconv.Itoa(rand.Int())

		order := m["order"].(map[string]interface{})

		customer := &model.Customer{CustomerName: order["customer_name"].(string),
			CustomerNumber:  order["customer_contact"].(string),
			CustomerEmail:   "n/a",
			CustomerAddress: "n/a"}

		customerID, err := model.StoreCustomer(db, customer)

		if err != nil {
			return c.JSON(http.StatusCreated, R{"response": err.Error()})
		}

		sale := &model.Sale{
			SaleDateTime:         order["sale_datetime"].(string),
			SaleDispenseLocation: order["pickup_location"].(string),
			SaleDispenseDateTime: order["pickup_datetime"].(string),
			SaleNo:               random,
			SaleDetails:          order["order_details"].(string),
			SaleStatus:           order["status"].(string),
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
