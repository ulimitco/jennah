INSERT INTO branches (code, name) VALUES ('MAIN', 'MAIN');
INSERT INTO users (email, username,name,password,role,branch_id) 
VALUES ('admin@email', 'admin','Admin','$2y$12$.onlv1yE3.0wgiCXRMQHYe4LJ4dEhsHveeWha5ldDuSXzLgmojOlu', 1, (SELECT b.id FROM branches b WHERE b.code='MAIN'));