CREATE TABLE Semester (
    id int PRIMARY KEY,
    name nvarchar
);

CREATE TABLE Subject (
    id int PRIMARY KEY,
    name nvarchar,
    semester_id int NOT NULL,
    FOREIGN KEY (semester_id) REFERENCES Semester(id)
);

CREATE TABLE Question (
    id int PRIMARY KEY,
    question_direction nvarchar,
    question_type nvarchar,
    answer_option nvarchar,
    correct_answer nvarchar,
    input_correct_answer nvarchar,
    cdr int,
    shuffleable int,
    group_id int
);

CREATE TABLE Course (
    id int PRIMARY KEY,
    name nvarchar,
    subject_id int NOT NULL, 
    questions nvarchar,
    question_per_test int,
    FOREIGN KEY (subject_id) REFERENCES Subject(id)
);