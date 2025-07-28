-- Pawsome NGO - Database Schema
-- Version 1.0
-- This script creates all the necessary tables for the Pawsome NGO application.

-- Create the database if it doesn't exist and use it.
CREATE DATABASE IF NOT EXISTS pawsome_db;
USE pawsome_db;

-- Drop tables in reverse order of dependency to avoid foreign key constraint errors.
DROP TABLE IF EXISTS message_reactions;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS medicine_box_items;
DROP TABLE IF EXISTS medicine_boxes;
DROP TABLE IF EXISTS medicines;
DROP TABLE IF EXISTS rewards;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS chat_groups;
DROP TABLE IF EXISTS team_members;
DROP TABLE IF EXISTS supplies;
DROP TABLE IF EXISTS multimedia;
DROP TABLE IF EXISTS cases;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS incidents;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS credentials;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;


-- =================================================================
-- Core User and Authentication Tables
-- =================================================================

-- Users Table: Stores information about all volunteers.
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    has_vehicle BOOLEAN DEFAULT FALSE,
    has_medicine_box BOOLEAN DEFAULT FALSE,
    availability_status ENUM('Available', 'Unavailable') DEFAULT 'Unavailable',
    experience_level ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert') DEFAULT 'Beginner',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roles Table: Defines the different roles a user can have.
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name ENUM('VOLUNTEER', 'RESCUE_CAPTAIN', 'ADMIN') UNIQUE NOT NULL
);

-- User_Roles Junction Table: Links users to their roles.
CREATE TABLE user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Credentials Table: Stores login information for users.
CREATE TABLE credentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- =================================================================
-- Incident and Case Management Tables
-- =================================================================

-- Incidents Table: Holds the initial report from the public.
CREATE TABLE incidents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reporter_name VARCHAR(255) NOT NULL,
    reporter_phone VARCHAR(20) NOT NULL,
    animal_type VARCHAR(100),
    location_latitude DECIMAL(10, 8) NOT NULL,
    location_longitude DECIMAL(11, 8) NOT NULL,
    description TEXT,
    status ENUM('Reported', 'Acknowledged', 'In Progress', 'Closed') DEFAULT 'Reported',
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teams Table: Defines a unique group of volunteers.
CREATE TABLE teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_name VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cases Table: Represents a specific rescue task handled by one team.
CREATE TABLE cases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    incident_id INT NOT NULL,
    team_id INT NOT NULL,
    status ENUM('Assigned', 'In Progress', 'Done', 'Completed', 'Cancelled') DEFAULT 'Assigned',
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    start_time TIMESTAMP NULL,
    end_time TIMESTAMP NULL,
    FOREIGN KEY (incident_id) REFERENCES incidents(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Multimedia Table: A central table for all uploaded media.
CREATE TABLE multimedia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    owner_type ENUM('INCIDENT', 'CASE', 'MESSAGE') NOT NULL,
    media_url VARCHAR(2048) NOT NULL,
    media_type ENUM('IMAGE', 'VIDEO', 'AUDIO') NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =================================================================
-- Team and Communication Tables
-- =================================================================

-- Team_Members Junction Table: Links users to the teams they are on.
CREATE TABLE team_members (
    team_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (team_id, user_id),
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Chat_Groups Table: Linked one-to-one with a team.
CREATE TABLE chat_groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_id INT UNIQUE NOT NULL,
    group_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Messages Table: Contains individual messages for a chat group.
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chat_group_id INT NOT NULL,
    sender_id INT, -- Can be NULL if the user is deleted
    message_content TEXT,
    replied_to_message_id INT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_group_id) REFERENCES chat_groups(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (replied_to_message_id) REFERENCES messages(id) ON DELETE SET NULL
);

-- Message_Reactions Table: Stores emoji reactions to messages.
CREATE TABLE message_reactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message_id INT NOT NULL,
    user_id INT NOT NULL,
    reaction_emoji VARCHAR(10) NOT NULL,
    UNIQUE(message_id, user_id, reaction_emoji), -- A user can only give one type of reaction per message
    FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- =================================================================
-- Rewards and Inventory Tables
-- =================================================================

-- Rewards Table: Tracks points for volunteers.
CREATE TABLE rewards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    total_points INT DEFAULT 0,
    cases_completed INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Medicines Table: A master list of all possible medicines.
CREATE TABLE medicines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT
);

-- Medicine_Boxes Table: Represents a user's personal first-aid kit.
CREATE TABLE medicine_boxes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Medicine_Box_Items Junction Table: Links a medicine box to its contents.
CREATE TABLE medicine_box_items (
    box_id INT NOT NULL,
    medicine_id INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (box_id, medicine_id),
    FOREIGN KEY (box_id) REFERENCES medicine_boxes(id) ON DELETE CASCADE,
    FOREIGN KEY (medicine_id) REFERENCES medicines(id) ON DELETE CASCADE
);

-- Supplies Table: Master list of the NGO's shared equipment.
CREATE TABLE supplies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    total_quantity INT DEFAULT 0,
    available_quantity INT DEFAULT 0
);


-- =================================================================
-- Notifications Table
-- =================================================================

CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    is_dismissed BOOLEAN DEFAULT FALSE,
    target_id INT,
    target_type VARCHAR(50),
    notification_type ENUM('INFO', 'PREVIEW', 'ACTIONABLE') DEFAULT 'INFO',
    action_status ENUM('PENDING', 'ACCEPTED', 'REJECTED') NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- =================================================================
-- Initial Data Population
-- =================================================================

-- Populate the roles table with initial roles.
INSERT INTO roles (name) VALUES ('VOLUNTEER'), ('RESCUE_CAPTAIN'), ('ADMIN');

-- You can add more initial data here, for example, a default admin user.

-- =================================================================
-- End of Script
-- =================================================================
