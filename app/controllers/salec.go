package controllers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	model "jennah/app/models"
	. "jennah/app/tools"
	"net/http"
	"strconv"
	"time"

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

func GetAllSales(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		sales, err := model.GetSales(db)

		if err != nil {
			fmt.Println(err.Error())
		}

		return c.JSON(http.StatusOK, sales)
	}
}

func UpdateSaleStatusFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {

		m := echo.Map{}
		_ = c.Bind(&m)

		statusData, err := json.Marshal(m)

		type SaleStatus struct {
			SaleID int
			Status string
		}

		if err != nil {
			return c.JSON(404, err.Error())
		}

		var sale SaleStatus
		_ = json.Unmarshal(statusData, &sale)

		_, saleErr := model.UpdateSaleStatus(db, sale.SaleID, sale.Status)

		if saleErr != nil {
			return c.JSON(404, saleErr.Error())
		}

		return c.JSON(200, nil)
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

func GenerateSaleNo() string {
	dtNow := time.Now()

	saleNo := dtNow.Month().String() + strconv.Itoa(dtNow.Year()) + strconv.Itoa(dtNow.Hour()) + strconv.Itoa(dtNow.Minute())

	return saleNo
}

func CreateSaleFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {

		m := echo.Map{}
		_ = c.Bind(&m)

		random := GenerateSaleNo()

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

		saleID, errSale := model.StoreSale(db, sale)

		if errSale != nil {
			return c.JSON(http.StatusNotFound, R{"response": errSale.Error()})
		}

		myOrders, orderErr := json.Marshal(m["orderItems"])

		if orderErr != nil {
			return c.JSON(http.StatusNotFound, R{"response": orderErr.Error()})
		}

		type OrderItem struct {
			ItemDetails string  `json:"item_details" db:"item_details"`
			Status      string  `json:"status" db:"status"`
			ItemID      string  `json:"item_id" db:"item_id"`
			Item        string  `json:"item" db:"item"`
			SellPrice   float32 `json:"sell_price" db:"sell_price"`
			Qty         string  `json:"qty" db:"qty"`
			ID          string  `json:"id" db:"id"`
		}

		var data map[string]OrderItem

		_ = json.Unmarshal(myOrders, &data)

		for _, v := range data {

			qty, _ := strconv.Atoi(v.Qty)

			saleItem := &model.SaleItem{
				SRP:    v.SellPrice,
				Qty:    qty,
				Status: v.Status,
				Item:   v.Item,
				ItemID: v.ItemID,
				SaleID: strconv.Itoa(saleID),
			}

			_, itemErr := model.StoreSaleItem(db, saleItem)

			if itemErr != nil {
				return c.JSON(http.StatusNotFound, R{"response": itemErr.Error()})
			}

		}

		return c.JSON(http.StatusCreated, R{"response": 200})
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
