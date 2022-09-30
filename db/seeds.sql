INSERT INTO department (name)
VALUES ('Legal'), ('Sales'), ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Lawyer', 80000, 1),
    ('Legal lead', 100000, 1),
    ('Sales representative', 50000, 2),
    ('Sales lead', 60000, 2),
    ('Engineer', 70000, 3),
    ('Engineering lead', 90000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Jane', 'Pelosi', 2, NULL),
    ('Diana', 'Robertson', 4, NULL),
    ('Rihanna', 'Diamond', 6, NULL),
    ('John', 'Smith', 1, 1),
    ('Jacob', 'Johnson', 3, 2),
    ('Robert', 'Ducksworth', 5, 3);