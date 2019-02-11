CREATE TABLE IF NOT EXISTS "users"(
    "id" SERIAL primary key,
    "email" VARCHAR,
    "username" VARCHAR,
    "name" VARCHAR,
    "password" VARCHAR,
    "role" INT,
    "branch_id" INT,
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);