-- //HERE IS WHERE YOUR SQL SCRIPTS WILL BE PLACED
-- // create your DB
-- Drops the todolist if it exists currently --
DROP DATABASE IF EXISTS project_setup;
-- Creates the "todolist" database --
CREATE DATABASE project_setupburgers;
INSERT INTO `project_setup`.`burgers` (`id`, `burger_name`, `devoured`, `createdAt`, `updatedAt`) VALUES ('3', 'super duper good burger', '0', '2016-08-09 04:05:02', '2016-08-09 04:05:02');
