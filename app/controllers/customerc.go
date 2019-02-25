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

//GetCustomersFunc - function that gets all customers
func GetCustomersFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		customers, err := model.GetCustomers(db)

		if err != nil {
			fmt.Println(err.Error())
		}

		return c.JSON(http.StatusOK, customers)
	}
}

func GetCustomerFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "customer id is required"})
		}

		customerObj, err := model.GetCustomer(db, id)

		if err != nil {

			switch err {
			case sql.ErrNoRows:
				return c.JSON(http.StatusNotFound, R{"response": "customer id not found"})
			default:
				return c.JSON(http.StatusNotFound, R{"response": err.Error()})
			}
		}

		return c.JSON(200, customerObj)
	}
}

func CreateCustomerFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {

		customer := &model.Customer{}
		err := c.Bind(customer)

		if err != nil {
			return c.JSON(http.StatusCreated, R{"response": err.Error()})
		}

		id, err := model.StoreCustomer(db, customer)

		return c.JSON(http.StatusCreated, R{"response": id})
	}
}

func DeleteCustomerFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "customer id is required"})
		}

		_, berr := model.DestroyCustomer(db, id)

		if berr != nil {
			return c.JSON(http.StatusInternalServerError, R{"response": err.Error()})
		}

		return c.JSON(http.StatusCreated, R{"response": 200})
	}
}
