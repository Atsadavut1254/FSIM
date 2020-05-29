create schema FSIM character set utf8 COLLATE utf8_unicode_ci;
use FSIM;

-- department, branch and course

create table department(
    dept_id varchar(10) not null,
    dept_name varchar(200) not null,
    primary key (dept_id)
);

create table branch(
  branch_id varchar(10) not null,
  branch_name varchar(200) not null,
  primary key (branch_id)
);

create table course(
  course_id varchar(20) not null,
  course_name varchar(100) not null,
  course_year smallint not null,
  primary key (course_id)
);

create table subject(
  subject_code varchar(7) not null,
  subject_name_th varchar(200) not null,
  subject_name_en varchar(200) not null,
  subject_weigth double(2,1) not null,
  semester varchar(2) not null,
  education_year smallint not null,
  primary key (subject_code)
);

create table has_branch(
  has_branch_id int not null AUTO_INCREMENT,
  dept_id varchar(10) not null,
  branch_id varchar(10) not null,
  primary key (has_branch_id),
  foreign key (dept_id) references department (dept_id),
  foreign key (branch_id) references branch (branch_id)
);

create table has_course(
  course_id varchar(20) not null,
  branch_id varchar(10) not null,
  primary key (course_id, branch_id),
  foreign key (course_id) references course (course_id),
  foreign key (branch_id) references branch (branch_id)
);

create table has_subject(
  course_id varchar(20) not null,
  subject_code varchar(7) not null,
  primary key (course_id, subject_code),
  foreign key (course_id) references course (course_id),
  foreign key (subject_code) references subject (subject_code)
);

-- address and location

create table zone(
  zone_id varchar(100) not null,
  zone_name varchar(100) not null,
  primary key (zone_id)
);

create table province(
  province_id varchar(100) not null,
  province_name varchar(100) not null,
  primary key (province_id)
);

create table district(
  district_id varchar(100) not null,
  district_name varchar(100) not null,
  primary key (district_id)
);

create table sub_district(
  sub_district_id varchar(100) not null,
  sub_district_name varchar(100) not null,
  primary key (sub_district_id)
);

create table location(
  loacation_id int not null AUTO_INCREMENT,
  zone_id varchar(100) not null,
  province_id varchar(100) not null,
  district_id varchar(100) not null,
  sub_district_id varchar(100) not null,
  primary key (loacation_id),
  foreign key (zone_id) references zone (zone_id),
  foreign key (province_id) references province (province_id),
  foreign key (district_id) references district (district_id),
  foreign key (sub_district_id) references sub_district (sub_district_id)
);

-- school

create table school(
  school_id varchar(20) not null,
  school_name varchar(500) not null,
  school_type varchar(100) not null,
  primary key (school_id)
);

create table located(
  school_id varchar(20) not null,
  province_id varchar(100) not null,
  foreign key (school_id) references school (school_id),
  foreign key (province_id) references province (province_id)
);

-- current student

create table student(
  student_id varchar(50) not null,
  firstname varchar(500) not null,
  lastname varchar(500) not null,
  gender varchar(5) not null,
  current_gpax double(3,2),
  primary key (student_id)
);

create table student_status(
  status_id int not null,
  status_title varchar(100) not null,
  primary key (status_id)
);

create table study_in(
  student_id varchar(50) not null,
  branch_id VARCHAR(10) not null,
  primary key (student_id, branch_id),
  foreign key (student_id) references student (student_id),
  foreign key (branch_id) references branch (branch_id)
);

create table lives(
  student_id varchar(50) not null,
  loacation_id int not null,
  adress varchar(500),
  primary key (student_id, loacation_id),
  foreign key (student_id) references student (student_id),
  foreign key (loacation_id) references location (loacation_id)
);

create table graduated(
  student_id varchar(50) not null,
  school_id  varchar(20) not null,
  gpax double(3,2),
  primary key (student_id, school_id),
  foreign key (student_id) references student (student_id),
  foreign key (school_id) references school (school_id)
);

create table has_status(
  student_id varchar(50) not null,
  status_id int not null,
  primary key (student_id, status_id),
  foreign key (student_id) references student (student_id),
  foreign key (status_id) references student_status (status_id)
);

create table gpa_record(
  gpa_id int not null AUTO_INCREMENT,
  student_id varchar(50) not null,
  gpa double(3,2) not null,
  semester varchar(2) not null,
  education_year smallint not null,
  primary key (gpa_id),
  foreign key (student_id) references student (student_id)
);

create table academic_record(
  academic_id int not null AUTO_INCREMENT,
  student_id varchar(50) not null,
  subject_code varchar(7) not null,
  semester varchar(2) not null,
  education_year smallint not null,
  grade varchar(3) not null,
  primary key (academic_id),
  foreign key (student_id) references student (student_id),
  foreign key (subject_code) references subject (subject_code)
);

-- alumni

create table alumni(
  alumni_id varchar(50) not null,
  gpax double(3,2) not null,
  graduated_year smallint not null,
  primary key (alumni_id)
);

create table work_status(
  status_id int not null,
  status_title varchar(50) NOT NULL,
  primary key (status_id)
);

create table working(
  alumni_id varchar(50) not null,
  status_id int not null,
  company varchar(500),
  institution varchar(500),
  job_description VARCHAR(500),
  faculty varchar(500),
  branch VARCHAR(500),
  salary double(10,2),
  primary key (alumni_id, status_id),
  foreign key (alumni_id) references alumni (alumni_id),
  foreign key (status_id) references work_status (status_id)
);

CREATE TABLE apprentice_status(
  apprentice_id int not null,
  apprentice_title varchar(50) NOT NULL,
  primary key (apprentice_id)
);

CREATE TABLE apprentice(
  alumni_id varchar(50) not null,
  apprentice_id int not null,
  primary key (alumni_id, apprentice_id),
  foreign key (alumni_id) references alumni (alumni_id),
  foreign key (apprentice_id) references apprentice_status (apprentice_id)
);

create table alumni_graduated(
  alumni_id varchar(50) not null,
  branch_id VARCHAR(10) not null,
  primary key (alumni_id, branch_id),
  foreign key (alumni_id) references alumni (alumni_id),
  foreign key (branch_id) references branch (branch_id)
);
-- admission

 -- type of entrance (round of TCAS)
create table admission_round(
  round_id int not null AUTO_INCREMENT,
  round_name varchar(100) not null,
  primary key (round_id)
);

-- channel of admission (Active, GAT/PAT)
create table admission_channel(
  channel_id int not null AUTO_INCREMENT,
  channel_name varchar(500) not null,
  primary key (channel_id)
);


create table has_round(
  round_id int not null,
  channel_id int not null,
  primary key (round_id, channel_id),
  foreign key (round_id) references admission_round (round_id),
  foreign key (channel_id) references admission_channel (channel_id)
);

-- keep entrance of all student data
create table admission(
  application_no varchar(50) not null,
  firstname varchar(500) not null,
  lastname varchar(500) not null,
  gender varchar(6) not null,
  admission_year smallint not null,
  decision int not null,
  upload_date date,
  primary key (application_no)
);

create table admission_from(
  application_no varchar(50) not null,
  channel_id int not null,
  primary key (application_no, channel_id),
  foreign key (application_no) references admission (application_no),
  foreign key (channel_id) references admission_channel (channel_id)
);

create table admission_in_branch(
  application_no varchar(50) not null,
  branch_id varchar(10) not null,
  primary key (application_no, branch_id),
  foreign key (application_no) references admission (application_no),
  foreign key (branch_id) references branch (branch_id)
);

create table admission_studied(
  application_no varchar(50) not null,
  school_id varchar(20) not null,
  gpax double(3,2) not null,
  primary key (application_no, school_id),
  foreign key (application_no) references admission (application_no),
  foreign key (school_id) references school (school_id)
);

create table entrance(
  application_no varchar(50),
  student_id varchar(50),
  primary key (application_no, student_id)
);

-- student activity records

CREATE table activity_type(
  project_type int not null,
  type_name VARCHAR(255) not NULL,
  primary key (project_type)
);

CREATE table activity_project(
  project_id VARCHAR(10) not null,
  project_type int not null,
  project_name VARCHAR(255) not null,
  primary key (project_id),
  foreign key (project_type) references activity_type (project_type)
);

CREATE table activity(
  activity_id VARCHAR(30) not null,
  project_id VARCHAR(10) not null,
  activity_name VARCHAR(255) not null,
  activity_budget double(10,2),
  year smallint not null,
  primary key (activity_id),
  foreign key (project_id) references activity_project (project_id)
);

CREATE TABLE activity_ar(
  activity_No int not null AUTO_INCREMENT,
  activity_id VARCHAR(30) not null,
  firstname varchar(500) not null,
  lastname varchar(500) not null,
  school_name varchar(500) not null,
  branch_name varchar(200) not null,
  gpax double(3,2),
  primary key (activity_No),
  foreign key (activity_id) references activity (activity_id)
);

CREATE TABLE activity_no_ar(
  activity_No int not null AUTO_INCREMENT,
  activity_id VARCHAR(30) not null,
  firstname varchar(500) not null,
  lastname varchar(500) not null,
  school_name varchar(500) not null,
  primary key (activity_No),
  foreign key (activity_id) references activity (activity_id)
);


-- staff

create table staff_level(
  level_id int not null,
  title varchar(100) not null,
  primary key (level_id)
);

desc staff_level;

create table staff(
  staff_id varchar(50) not null,
  level_id int not null,
  firstname varchar(500) not null,
  lastname varchar(500) not null,
  password varchar(100) not null,
  primary key (staff_id),
  foreign key (level_id) references staff_level (level_id)
);
desc staff;
