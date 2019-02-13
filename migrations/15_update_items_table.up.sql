ALTER TABLE items 
    ALTER COLUMN item SET DEFAULT '',
    ALTER COLUMN description SET DEFAULT '',
    ALTER COLUMN stock_code SET DEFAULT '',
    ALTER COLUMN barcode SET DEFAULT '',
    ALTER COLUMN "uom" SET DEFAULT '',
    ALTER COLUMN "packaging" SET DEFAULT '',
    ALTER COLUMN "package_qty" SET DEFAULT 0,
    ALTER COLUMN "default_unit_cost" SET DEFAULT 0.00,
    ALTER COLUMN "default_srp" SET DEFAULT 0.00,
    ALTER COLUMN "markup_percent" SET DEFAULT 0.00,
    ALTER COLUMN "markup_amount" SET DEFAULT 0.00,
    ALTER COLUMN "stock_notify_limit" TYPE INT,
    ALTER COLUMN "stock_limit" TYPE INT;

    ALTER TABLE items 
    ALTER COLUMN "stock_notify_limit" SET DEFAULT 0,
    ALTER COLUMN "stock_limit" SET DEFAULT 0;