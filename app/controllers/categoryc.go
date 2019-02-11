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

//GetCategoriesFunc - function that gets all categories
func GetCategoriesFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		categories, err := model.GetCategories(db)

		if err != nil {
			fmt.Println(err.Error())
		}

		return c.JSON(http.StatusOK, categories)
	}
}

func GetCategoryFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "category id is required"})
		}

		categoryObj, err := model.GetCategory(db, id)

		if err != nil {

			switch err {
			case sql.ErrNoRows:
				return c.JSON(http.StatusNotFound, R{"response": "category id not found"})
			default:
				return c.JSON(http.StatusNotFound, R{"response": err.Error()})
			}
		}

		return c.JSON(200, categoryObj)
	}
}

func CreateCategoryFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {

		category := &model.Category{}
		err := c.Bind(category)

		if err != nil {
			return c.JSON(http.StatusCreated, R{"response": err.Error()})
		}

		id, err := model.StoreCategory(db, category)

		return c.JSON(http.StatusCreated, R{"response": id})
	}
}

func DeleteCategoryFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "category id is required"})
		}

		_, cerr := model.DestroyCategory(db, id)

		if cerr != nil {
			return c.JSON(http.StatusInternalServerError, R{"response": err.Error()})
		}

		return c.JSON(http.StatusCreated, R{"response": 200})
	}
}
