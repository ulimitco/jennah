package main

import (
	ctl "jennah/app/controllers"
	"log"

	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	_ "github.com/lib/pq"
)

func main() {
	e := echo.New()
	db := initDB()

	// Middleware
	//e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	//Unrestricted access
	e.POST("/login", ctl.Authenticate(db))

	//Restricted access
	r := e.Group("/api/v1")

	r.Use(middleware.JWT([]byte("secretkeyhere")))

	r.GET("/users", ctl.GetUsersFunc(db))
	r.GET("/user/:id", ctl.GetUserFunc(db))
	r.POST("/user", ctl.CreateUserFunc(db))
	r.DELETE("/user/:id", ctl.DeleteUserFunc(db))

	r.GET("/branches", ctl.GetBranchesFunc(db))
	r.GET("/branch/:id", ctl.GetBranchFunc(db))
	r.POST("/branch", ctl.CreateBranchFunc(db))
	r.DELETE("/branch/:id", ctl.DeleteBranchFunc(db))

	r.GET("/categories", ctl.GetCategoriesFunc(db))
	r.GET("/category/:id", ctl.GetCategoryFunc(db))
	r.POST("/category", ctl.CreateCategoryFunc(db))
	r.DELETE("/category/:id", ctl.DeleteCategoryFunc(db))

	r.GET("/items", ctl.GetItemsFunc(db))
	r.GET("/item/:id", ctl.GetItemFunc(db))
	r.POST("/item", ctl.CreateItemFunc(db))
	r.DELETE("/item/:id", ctl.DeleteItemFunc(db))

	r.GET("/suppliers", ctl.GetSuppliersFunc(db))
	r.GET("/supplier/:id", ctl.GetSupplierFunc(db))
	r.POST("/supplier", ctl.CreateSupplierFunc(db))
	r.DELETE("/supplier/:id", ctl.DeleteSupplierFunc(db))

	r.GET("/inventories", ctl.GetInventoriesFunc(db))
	r.GET("/inventory/:id", ctl.GetInventoryFunc(db))
	r.POST("/inventory", ctl.CreateInventoryFunc(db))
	r.POST("/inventories", ctl.CreateInventoriesFunc(db))
	r.DELETE("/inventory/:id", ctl.DeleteInventoryFunc(db))

	r.GET("/modifiers", ctl.GetModifiersFunc(db))
	r.GET("/modifier/:id", ctl.GetModifierFunc(db))
	r.POST("/modifier", ctl.CreateModifierFunc(db))
	r.DELETE("/modifier/:id", ctl.DeleteModifierFunc(db))

	r.GET("/customers", ctl.GetCustomersFunc(db))
	r.GET("/customer/:id", ctl.GetCustomerFunc(db))
	r.POST("/customer", ctl.CreateCustomerFunc(db))
	r.DELETE("/customer/:id", ctl.DeleteCustomerFunc(db))

	r.GET("/sales", ctl.GetSalesFunc(db))
	r.GET("/all_sales", ctl.GetAllSales(db))
	r.POST("/update_sale_status", ctl.UpdateSaleStatusFunc(db))
	r.GET("/sale/:id", ctl.GetSaleFunc(db))
	r.POST("/sale", ctl.CreateSaleFunc(db))
	r.DELETE("/sale/:id", ctl.DeleteSaleFunc(db))

	e.Logger.Fatal(e.Start(":8080"))
}

func initDB() *sqlx.DB {
	connStr := "postgres://postgres:password@localhost/jdb?sslmode=disable"
	db, err := sqlx.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	return db
}
