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

//GetSuppliersFunc - function that gets all suppliers
func GetSuppliersFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		suppliers, err := model.GetSuppliers(db)

		if err != nil {
			fmt.Println(err.Error())
		}

		return c.JSON(http.StatusOK, suppliers)
	}
}

func GetSupplierFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "supplier id is required"})
		}

		supplierObj, err := model.GetSupplier(db, id)

		if err != nil {

			switch err {
			case sql.ErrNoRows:
				return c.JSON(http.StatusNotFound, R{"response": "supplier id not found"})
			default:
				return c.JSON(http.StatusNotFound, R{"response": err.Error()})
			}
		}

		return c.JSON(200, supplierObj)
	}
}

func CreateSupplierFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {

		supplier := &model.Supplier{}
		err := c.Bind(supplier)

		if err != nil {
			return c.JSON(http.StatusCreated, R{"response": err.Error()})
		}

		id, err := model.StoreSupplier(db, supplier)

		return c.JSON(http.StatusCreated, R{"response": id})
	}
}

func DeleteSupplierFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "supplier id is required"})
		}

		_, cerr := model.DestroySupplier(db, id)

		if cerr != nil {
			return c.JSON(http.StatusInternalServerError, R{"response": err.Error()})
		}

		return c.JSON(http.StatusCreated, R{"response": 200})
	}
}
