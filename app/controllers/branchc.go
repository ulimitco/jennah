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

//GetBranchesFunc - function that gets all branches
func GetBranchesFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		branches, err := model.GetBranches(db)

		if err != nil {
			fmt.Println(err.Error())
		}

		return c.JSON(http.StatusOK, branches)
	}
}

func GetBranchFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "branch id is required"})
		}

		branchObj, err := model.GetBranch(db, id)

		if err != nil {

			switch err {
			case sql.ErrNoRows:
				return c.JSON(http.StatusNotFound, R{"response": "branch id not found"})
			default:
				return c.JSON(http.StatusNotFound, R{"response": err.Error()})
			}
		}

		return c.JSON(200, branchObj)
	}
}

func CreateBranchFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {

		branch := &model.Branch{}
		err := c.Bind(branch)

		if err != nil {
			return c.JSON(http.StatusCreated, R{"responsesss": err.Error()})
		}

		id, errs := model.StoreBranch(db, branch)

		if errs != nil {
			return c.JSON(http.StatusCreated, R{"responsesss": errs.Error()})
		}

		return c.JSON(http.StatusCreated, R{"response": id})
	}
}

func DeleteBranchFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "branch id is required"})
		}

		_, berr := model.DestroyBranch(db, id)

		if berr != nil {
			return c.JSON(http.StatusInternalServerError, R{"response": berr.Error()})
		}

		return c.JSON(http.StatusCreated, R{"response": 200})
	}
}

func SoftDeleteBranchFunc(db *sqlx.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			return c.JSON(404, R{"response": "branch id is required"})
		}

		_, berr := model.DestroyBranch(db, id)

		if berr != nil {
			return c.JSON(http.StatusInternalServerError, R{"response": berr.Error()})
		}

		return c.JSON(http.StatusCreated, R{"response": 200})
	}
}
