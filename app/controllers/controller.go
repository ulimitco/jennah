package controllers

import "database/sql"

//DbCtx db context
type DbCtx struct {
	DB *sql.DB
}
