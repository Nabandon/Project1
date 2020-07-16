drop database if exists stu_dorm;
create database stu_dorm character set utf8mb4;

use stu_dorm;

drop table if exists user;
create table user(
    id int primary key auto_increment,
    username varchar(20) not null unique comment '用户账号',
    password varchar(20) not null comment '密码',
    nickname varchar(20) comment '用户昵称',
    email varchar(50) comment '邮箱',
    create_time timestamp default NOW() comment '创建时间'
) comment '用户表';

drop table if exists building;
create table building(
    id int primary key auto_increment,
    building_name varchar(20) not null unique comment '名称',
    building_desc varchar(50) comment '描述',
    create_time timestamp default NOW() comment '创建时间'
) comment '宿舍楼';

drop table if exists dorm;
create table dorm(
    id int primary key auto_increment,
    dorm_no varchar(20) not null comment '房号',
    dorm_desc varchar(50) comment '描述',
    building_id int comment '宿舍楼id',
    create_time timestamp default NOW() comment '创建时间',
    foreign key (building_id) references building(id)
) comment '寝室';

drop table if exists dictionary;
create table dictionary(
    id int primary key auto_increment,
    dictionary_key varchar(20) not null unique comment '键',
    dictionary_value varchar(20) not null comment '值',
    dictionary_desc varchar(20) comment '描述',
    create_time timestamp default NOW() comment '创建时间'
) comment '数据字典';

drop table if exists dictionary_tag;
create table dictionary_tag(
    id int primary key auto_increment,
    dictionary_tag_key varchar(20) not null comment '键',
    dictionary_tag_value varchar(20) not null comment '值',
    dictionary_tag_desc varchar(20) comment '描述',
    dictionary_id int comment '数据字典id',
    create_time timestamp default NOW() comment '创建时间',
    foreign key (dictionary_id) references dictionary(id)
) comment '数据字典标签';

drop table if exists student;
create table student(
    id int primary key auto_increment,
    student_name varchar(20) not null comment '姓名',
    student_graduate_year varchar(20) comment '毕业年份，数据字典000001',
    student_major varchar(20) comment '专业，数据字典000002',
    student_email varchar(50) comment '邮箱',
    dorm_id int comment '宿舍id',
    create_time timestamp default NOW() comment '创建时间',
    foreign key (dorm_id) references dorm(id)
) comment '学生表';

-- 初始化数据
-- mysql中没有==，是用=号代替==。为了区分=和==，赋值时使用:=
set @username:='abc';
set @password:='123';
set @nickname:='风一样的男子😱';
set @email:='123@qq.com';

set @building_name:='生楼-';
set @building_desc:='修炼道场(⓿_⓿)';

set @dorm_desc:='闭关之地( ఠൠఠ )ﾉ';

set @dictionary_student_graduate_year='000001';
set @dictionary_student_major='000002';

set @student_name:='小小的梦想🐷';

insert into user(username, nickname, password, email) values (@username, @nickname, @password, @email);
insert into user(username, nickname, password, email) values (concat(@username, '1'), concat(@nickname, '1'), @password, @email);
insert into user(username, nickname, password, email) values (concat(@username, '2'), concat(@nickname, '2'), @password, @email);
insert into user(username, nickname, password, email) values (concat(@username, '3'), concat(@nickname, '3'), @password, @email);
insert into user(username, nickname, password, email) values (concat(@username, '4'), concat(@nickname, '4'), @password, @email);
insert into user(username, nickname, password, email) values (concat(@username, '5'), concat(@nickname, '5'), @password, @email);

insert into building(building_name, building_desc) values (concat('男', @building_name, '1'), @building_desc);
insert into building(building_name, building_desc) values (concat('男', @building_name, '2'), @building_desc);
insert into building(building_name, building_desc) values (concat('男', @building_name, '3'), @building_desc);
insert into building(building_name, building_desc) values (concat('女', @building_name, '1'), @building_desc);
insert into building(building_name, building_desc) values (concat('女', @building_name, '2'), @building_desc);
insert into building(building_name, building_desc) values (concat('女', @building_name, '3'), @building_desc);

## 宿舍
# 宿舍楼1的宿舍
insert into dorm(dorm_no, dorm_desc, building_id) values ('1-0-1', @dorm_desc, 1);
insert into dorm(dorm_no, dorm_desc, building_id) values ('1-0-2', @dorm_desc, 1);
insert into dorm(dorm_no, dorm_desc, building_id) values ('1-0-3', @dorm_desc, 1);
# 宿舍楼2的宿舍
insert into dorm(dorm_no, dorm_desc, building_id) values ('2-0-1', @dorm_desc, 2);
insert into dorm(dorm_no, dorm_desc, building_id) values ('2-0-2', @dorm_desc, 2);
insert into dorm(dorm_no, dorm_desc, building_id) values ('2-0-3', @dorm_desc, 2);
# 宿舍楼3的宿舍
insert into dorm(dorm_no, dorm_desc, building_id) values ('3-0-1', @dorm_desc, 3);
insert into dorm(dorm_no, dorm_desc, building_id) values ('3-0-2', @dorm_desc, 3);
insert into dorm(dorm_no, dorm_desc, building_id) values ('3-0-3', @dorm_desc, 3);
# 宿舍楼4的宿舍
insert into dorm(dorm_no, dorm_desc, building_id) values ('4-0-1', @dorm_desc, 4);
insert into dorm(dorm_no, dorm_desc, building_id) values ('4-0-2', @dorm_desc, 4);
insert into dorm(dorm_no, dorm_desc, building_id) values ('4-0-3', @dorm_desc, 4);

## 数据字典：学生毕业年份
insert into dictionary(dictionary_key, dictionary_value, dictionary_desc)values (@dictionary_student_graduate_year, '毕业年份', '学生毕业的年份');

insert into dictionary_tag(dictionary_tag_key, dictionary_tag_value, dictionary_id)values ('001', '2020届', 1);
insert into dictionary_tag(dictionary_tag_key, dictionary_tag_value, dictionary_id)values ('002', '2021届', 1);
insert into dictionary_tag(dictionary_tag_key, dictionary_tag_value, dictionary_id)values ('003', '2022届', 1);
insert into dictionary_tag(dictionary_tag_key, dictionary_tag_value, dictionary_id)values ('004', '2023届', 1);

## 数据字典：学生专业
insert into dictionary(dictionary_key, dictionary_value, dictionary_desc)values (@dictionary_student_major, '专业', '学生的专业');
insert into dictionary_tag(dictionary_tag_key, dictionary_tag_value, dictionary_id)values ('001', '中文系', 2);
insert into dictionary_tag(dictionary_tag_key, dictionary_tag_value, dictionary_id)values ('002', '英语系', 2);
insert into dictionary_tag(dictionary_tag_key, dictionary_tag_value, dictionary_id)values ('003', '计算机科学与技术', 2);

insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'A1'), '000001001', '000002001', @email, 1);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'A2'), '000001001', '000002001', @email, 1);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'A3'), '000001001', '000002001', @email, 1);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'A4'), '000001001', '000002001', @email, 1);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'A5'), '000001001', '000002001', @email, 1);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'B1'), '000001001', '000002002', @email, 2);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'B2'), '000001001', '000002002', @email, 2);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'B3'), '000001001', '000002002', @email, 2);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'B4'), '000001001', '000002002', @email, 2);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'B5'), '000001001', '000002002', @email, 2);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'C1'), '000001001', '000002003', @email, 3);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'C2'), '000001001', '000002003', @email, 3);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'C3'), '000001001', '000002003', @email, 3);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'C4'), '000001001', '000002003', @email, 3);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'C5'), '000001001', '000002003', @email, 3);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'D1'), '000001002', '000002001', @email, 4);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'D2'), '000001002', '000002001', @email, 4);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'D3'), '000001002', '000002001', @email, 4);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'D4'), '000001002', '000002001', @email, 4);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'D5'), '000001002', '000002001', @email, 4);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'E1'), '000001002', '000002002', @email, 5);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'E2'), '000001002', '000002002', @email, 5);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'E3'), '000001002', '000002002', @email, 5);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'E4'), '000001002', '000002002', @email, 5);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'E5'), '000001002', '000002002', @email, 5);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'F1'), '000001002', '000002003', @email, 6);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'F2'), '000001002', '000002003', @email, 6);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'F3'), '000001002', '000002003', @email, 6);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'F4'), '000001002', '000002003', @email, 6);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'F5'), '000001002', '000002003', @email, 6);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'G1'), '000001003', '000002001', @email, 7);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'G2'), '000001003', '000002001', @email, 7);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'G3'), '000001003', '000002001', @email, 7);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'G4'), '000001003', '000002001', @email, 7);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'G5'), '000001003', '000002001', @email, 7);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'H1'), '000001003', '000002002', @email, 8);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'H2'), '000001003', '000002002', @email, 8);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'H3'), '000001003', '000002002', @email, 8);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'H4'), '000001003', '000002002', @email, 8);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'H5'), '000001003', '000002002', @email, 8);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'I1'), '000001003', '000002003', @email, 9);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'I2'), '000001003', '000002003', @email, 9);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'I3'), '000001003', '000002003', @email, 9);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'I4'), '000001003', '000002003', @email, 9);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'I5'), '000001003', '000002003', @email, 9);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'J1'), '000001004', '000002001', @email, 10);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'J2'), '000001004', '000002001', @email, 10);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'J3'), '000001004', '000002001', @email, 10);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'J4'), '000001004', '000002001', @email, 10);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'J5'), '000001004', '000002001', @email, 10);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'K1'), '000001004', '000002002', @email, 11);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'K2'), '000001004', '000002002', @email, 11);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'K3'), '000001004', '000002002', @email, 11);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'K4'), '000001004', '000002002', @email, 11);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'K5'), '000001004', '000002002', @email, 11);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'L1'), '000001004', '000002003', @email, 12);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'L2'), '000001004', '000002003', @email, 12);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'L3'), '000001004', '000002003', @email, 12);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'L4'), '000001004', '000002003', @email, 12);
insert into student(student_name, student_graduate_year, student_major, student_email, dorm_id) values (concat(@student_name, 'L5'), '000001004', '000002003', @email, 12);