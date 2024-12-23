-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Dec 23, 2024 at 06:07 AM
-- Server version: 5.7.44
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gymdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `equipments`
--

CREATE TABLE `equipments` (
  `id` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_vietnamese_ci NOT NULL,
  `description` text COLLATE utf8_vietnamese_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `equipments`
--

INSERT INTO `equipments` (`id`, `room_id`, `name`, `description`, `image`, `rating`, `amount`, `createdAt`, `updatedAt`) VALUES
(1, NULL, 'Licensed Frozen Ball', 'Sunt quibusdam sed.', NULL, 3.4, 9, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(2, NULL, 'Rustic Frozen Sausages', 'Velit deserunt excepturi maiores assumenda aperiam voluptatem harum fugiat aut.', NULL, 2.2, 5, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(3, NULL, 'Unbranded Cotton Shirt', 'Nemo quam cumque exercitationem.', NULL, 3.7, 9, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(4, NULL, 'Refined Plastic Tuna', 'Esse enim optio aut.', NULL, 1.5, 4, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(5, NULL, 'Refined Rubber Gloves', 'Qui est quibusdam nihil nihil nobis vel in quae.', NULL, 4.5, 9, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(6, NULL, 'Unbranded Metal Keyboard', 'Quo quia est et natus nobis ipsa.', NULL, 3.6, 3, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(7, NULL, 'Generic Rubber Tuna', 'Nisi recusandae voluptas atque sed et.', NULL, 1.7, 10, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(8, NULL, 'Ergonomic Wooden Tuna', 'Incidunt exercitationem impedit.', NULL, 3, 1, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(9, NULL, 'Unbranded Concrete Bike', 'Quia dignissimos aut.', NULL, 1, 6, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(10, NULL, 'Fantastic Concrete Ball', 'In dolorem nam sit sapiente.', NULL, 4.4, 1, '2024-12-23 02:08:44', '2024-12-23 02:08:44');

-- --------------------------------------------------------

--
-- Table structure for table `equipment_comments`
--

CREATE TABLE `equipment_comments` (
  `id` int(11) NOT NULL,
  `equipment_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `comment` text COLLATE utf8_vietnamese_ci NOT NULL,
  `images_url` json DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `equipment_comments`
--

INSERT INTO `equipment_comments` (`id`, `equipment_id`, `user_id`, `comment`, `images_url`, `rating`, `createdAt`, `updatedAt`) VALUES
(1, 9, 3, 'Quae neque iusto debitis.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 2.8, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(2, 7, 1, 'Voluptas blanditiis ea.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 2.4, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(3, 10, 8, 'Occaecati qui enim non totam.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 2.9, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(4, 7, 10, 'Dolore quo a illo rem.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 4, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(5, 6, 6, 'Voluptas perspiciatis quia ut sed et.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 4.9, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(6, 7, 5, 'Sint saepe eos ducimus labore itaque et vel.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 3.4, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(7, 6, 2, 'Dolores id distinctio totam est.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 3.9, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(8, 3, 8, 'Cum voluptate laborum ut veritatis.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 2.7, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(9, 2, 9, 'Repellendus voluptatem maiores perspiciatis odio.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 1.9, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(10, 6, 5, 'Placeat molestias quae commodi culpa nihil.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 3.9, '2024-12-23 02:08:44', '2024-12-23 02:08:44');

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `event` text COLLATE utf8_vietnamese_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `user_id`, `event`, `createdAt`, `updatedAt`) VALUES
(1, 9, 'Eius ipsam quam.', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(2, 1, 'Incidunt commodi molestiae.', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(3, 2, 'Veniam pariatur quae dolore est officia assumenda recusandae.', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(4, 3, 'Ullam itaque consequatur soluta neque ad.', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(5, 1, 'Voluptatem quo et voluptas magni repudiandae in asperiores.', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(6, 6, 'Velit qui sed inventore perferendis consequuntur voluptas eos.', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(7, 5, 'Velit architecto nihil.', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(8, 4, 'Occaecati iusto quisquam quidem.', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(9, 6, 'Ea est consectetur et blanditiis perferendis.', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(10, 5, 'Corrupti in non amet molestias cumque deserunt impedit aut.', '2024-12-23 02:08:44', '2024-12-23 02:08:44');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `permission` varchar(255) COLLATE utf8_vietnamese_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `permission`, `createdAt`, `updatedAt`) VALUES
(1, 'xem', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(2, 'quản lý phòng gym', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(3, 'thêm mới phòng gym', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(4, 'chỉnh sửa phòng gym', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(5, 'xoá phòng gym', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(6, 'quản lý tài khoản', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(7, 'thêm mới người dùng', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(8, 'xoá người dùng', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(9, 'chỉnh sửa người dùng', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(10, 'quản lý role', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(11, 'thêm role', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(12, 'sửa role', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(13, 'xoá role', '2024-12-23 02:08:44', '2024-12-23 02:08:44');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(255) COLLATE utf8_vietnamese_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`, `createdAt`, `updatedAt`) VALUES
(1, 'user', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(2, 'admin', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(3, 'manager', '2024-12-23 02:08:44', '2024-12-23 02:08:44');

-- --------------------------------------------------------

--
-- Table structure for table `role_permission`
--

CREATE TABLE `role_permission` (
  `id` int(11) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `role_permission`
--

INSERT INTO `role_permission` (`id`, `role_id`, `permission_id`, `createdAt`, `updatedAt`) VALUES
(1, 3, 3, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(2, 3, 5, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(3, 3, 5, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(4, 2, 1, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(5, 1, 1, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(6, 1, 1, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(7, 1, 3, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(8, 3, 1, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(9, 2, 2, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(10, 1, 3, '2024-12-23 02:08:44', '2024-12-23 02:08:44');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_vietnamese_ci NOT NULL,
  `description` text COLLATE utf8_vietnamese_ci NOT NULL,
  `location` json NOT NULL,
  `image` varchar(255) COLLATE utf8_vietnamese_ci NOT NULL,
  `rating` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `owner_id`, `name`, `description`, `location`, `image`, `rating`, `createdAt`, `updatedAt`) VALUES
(1, 8, 'Handcrafted Granite Chips', 'Est laudantium sequi animi ad accusamus quisquam enim omnis dolore.', '{\"city\": \"Anderson\", \"country\": \"Venezuela\"}', 'Refined Cotton Ball', 1.2, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(2, 1, 'Fantastic Rubber Pizza', 'Vitae minus quo dolor et aut non blanditiis voluptatum quidem.', '{\"city\": \"South Lavern\", \"country\": \"Cote d\'Ivoire\"}', 'Small Fresh Chair', 1.5, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(3, 7, 'Unbranded Plastic Gloves', 'Natus exercitationem quia ipsum.', '{\"city\": \"Tustin\", \"country\": \"Comoros\"}', 'Generic Concrete Shoes', 3.3, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(4, 1, 'Licensed Concrete Soap', 'Et adipisci quo ut possimus cumque non et sed fuga.', '{\"city\": \"East Janetview\", \"country\": \"Falkland Islands (Malvinas)\"}', 'Refined Soft Towels', 2, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(5, 6, 'Practical Wooden Fish', 'Sint dolorum voluptates autem ut quasi repellendus doloribus earum.', '{\"city\": \"East Granville\", \"country\": \"Tonga\"}', 'Sleek Soft Gloves', 2.9, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(6, 7, 'Tasty Frozen Towels', 'Perspiciatis vel voluptatum dolore exercitationem similique quia nihil eos.', '{\"city\": \"New Elianefort\", \"country\": \"Seychelles\"}', 'Small Frozen Cheese', 2.2, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(7, 4, 'Rustic Rubber Chicken', 'Tenetur rerum eveniet.', '{\"city\": \"Mayerburgh\", \"country\": \"Saudi Arabia\"}', 'Generic Frozen Towels', 3.1, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(8, 4, 'Ergonomic Metal Sausages', 'Et dolorum nostrum dolores ratione aut voluptate eaque rerum.', '{\"city\": \"Port Adellafurt\", \"country\": \"Saint Kitts and Nevis\"}', 'Handmade Plastic Fish', 4, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(9, 3, 'Sleek Granite Cheese', 'Sint non rerum.', '{\"city\": \"West Letitia\", \"country\": \"Brunei Darussalam\"}', 'Intelligent Frozen Tuna', 4.1, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(10, 1, 'Unbranded Concrete Chips', 'Est accusantium quo laboriosam.', '{\"city\": \"Lorain\", \"country\": \"Christmas Island\"}', 'Fantastic Rubber Chair', 1.4, '2024-12-23 02:08:44', '2024-12-23 02:08:44');

-- --------------------------------------------------------

--
-- Table structure for table `room_comments`
--

CREATE TABLE `room_comments` (
  `id` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `comment` text COLLATE utf8_vietnamese_ci NOT NULL,
  `images_url` json DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `room_comments`
--

INSERT INTO `room_comments` (`id`, `room_id`, `user_id`, `comment`, `images_url`, `rating`, `createdAt`, `updatedAt`) VALUES
(1, 5, 4, 'Sit quibusdam neque amet tempora ipsum quos dolor quasi.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 1.1, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(2, 10, 7, 'At quos corporis sapiente corrupti voluptatem eius deleniti.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 1.4, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(3, 4, 7, 'Atque facere nisi et sit excepturi.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 4.7, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(4, 2, 3, 'Quia esse veritatis.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 3.3, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(5, 4, 6, 'Voluptatem vero id neque sapiente qui tempore qui est ipsam.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 2.6, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(6, 6, 8, 'Nihil voluptate rerum asperiores laborum adipisci nihil quae incidunt.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 4, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(7, 1, 8, 'Est fugiat praesentium dolorem quis minima perferendis dicta.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 2.9, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(8, 3, 6, 'Laboriosam quisquam ut sit.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 1.4, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(9, 6, 7, 'Et saepe dolorem voluptatum rerum commodi soluta dolorum nihil eligendi.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 2.5, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(10, 8, 8, 'Veritatis quis aliquam necessitatibus quia amet nihil explicabo dolor vero.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 1.8, '2024-12-23 02:08:44', '2024-12-23 02:08:44');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_vietnamese_ci NOT NULL,
  `description` text COLLATE utf8_vietnamese_ci NOT NULL,
  `rating` float DEFAULT NULL,
  `balance` float NOT NULL,
  `amount` int(11) NOT NULL,
  `days` float NOT NULL,
  `type` enum('card','trainer','exercise') COLLATE utf8_vietnamese_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `room_id`, `name`, `description`, `rating`, `balance`, `amount`, `days`, `type`, `createdAt`, `updatedAt`) VALUES
(1, 5, 'Handmade Plastic Pants', 'Sit quaerat harum quidem qui ipsam illum in.', 1, 749.9, 6, 788.01, 'exercise', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(2, 10, 'Intelligent Granite Car', 'Velit consequuntur qui similique veritatis quam et dolor et.', 3.7, 565.03, 2, 986.47, 'trainer', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(3, 1, 'Ergonomic Concrete Bacon', 'Ad a quibusdam officiis ipsam saepe minus fuga ratione quia.', 4.5, 3000, 7, 343.44, 'trainer', '2024-12-23 02:08:44', '2024-12-23 05:44:49'),
(4, 8, 'Sleek Fresh Soap', 'Totam aut non quidem ut.', 2.1, 482.8, 2, 713.12, 'exercise', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(5, 4, 'Handmade Concrete Hat', 'Suscipit officiis sunt est consectetur necessitatibus facilis quisquam ut earum.', 4.1, 587.08, 3, 437.53, 'trainer', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(6, 5, 'Generic Wooden Cheese', 'Repellendus in quia accusantium asperiores incidunt.', 4.8, 540.63, 3, 419.16, 'trainer', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(7, 7, 'Fantastic Steel Soap', 'Dolorem in consequatur officiis numquam illum at quidem.', 3.8, 842, 7, 299.12, 'trainer', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(8, 4, 'Licensed Plastic Bike', 'Et architecto incidunt in qui dolor.', 3.4, 557.01, 8, 661.58, 'trainer', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(9, 10, 'Awesome Metal Table', 'Sit est laborum quos sunt sed.', 1.4, 859.2, 8, 597.67, 'exercise', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(10, 6, 'Refined Rubber Towels', 'Neque pariatur quaerat qui quasi magni illo laboriosam cumque et.', 1.5, 784.07, 8, 680.85, 'card', '2024-12-23 02:08:44', '2024-12-23 02:08:44');

-- --------------------------------------------------------

--
-- Table structure for table `service_comments`
--

CREATE TABLE `service_comments` (
  `id` int(11) NOT NULL,
  `service_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `comment` text COLLATE utf8_vietnamese_ci NOT NULL,
  `images_url` json DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `service_comments`
--

INSERT INTO `service_comments` (`id`, `service_id`, `user_id`, `comment`, `images_url`, `rating`, `createdAt`, `updatedAt`) VALUES
(1, 8, 10, 'Repellat at quas voluptatibus esse.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 3.2, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(2, 10, 7, 'Tempora mollitia officiis.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 3.9, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(3, 5, 3, 'Odit omnis magni accusantium voluptatem expedita nostrum et quis facere.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 1.2, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(4, 10, 3, 'Tenetur dolorem nobis quo.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 4.9, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(5, 10, 10, 'Ea harum magnam.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 2.9, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(6, 2, 3, 'Sit et est ut necessitatibus recusandae iure sit necessitatibus.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 1.6, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(7, 6, 7, 'Laborum optio itaque et ut dignissimos sit beatae molestiae.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 1.7, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(8, 1, 2, 'Ratione aperiam animi.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 1.9, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(9, 4, 9, 'Enim temporibus rerum quaerat dolor perferendis nisi quod.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 2.2, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(10, 6, 1, 'Nihil est voluptas saepe qui.', '[\"http://placeimg.com/640/480\", \"http://placeimg.com/640/480\"]', 3.4, '2024-12-23 02:08:44', '2024-12-23 02:08:44');

-- --------------------------------------------------------

--
-- Table structure for table `transactionLogs`
--

CREATE TABLE `transactionLogs` (
  `id` int(11) NOT NULL,
  `transaction_id` int(11) DEFAULT NULL,
  `event` text COLLATE utf8_vietnamese_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `transactionLogs`
--

INSERT INTO `transactionLogs` (`id`, `transaction_id`, `event`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Qui impedit possimus est provident autem eius.', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(2, 6, 'Aliquid qui eaque laboriosam eius sed vel unde animi.', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(3, 1, 'Eum minus velit.', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(4, 9, 'Tempore vel quia ab explicabo.', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(5, 6, 'Quo quasi cupiditate perferendis.', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(6, 1, 'Maiores similique iure excepturi aut possimus beatae dolores.', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(7, 9, 'Voluptates beatae perspiciatis.', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(8, 1, 'Ut consequatur nostrum soluta et dolores veritatis.', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(9, 2, 'Voluptas in laboriosam blanditiis omnis asperiores quod nesciunt cumque quos.', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(10, 8, 'Atque accusamus consectetur magnam.', '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(11, NULL, 'CSW4LW8ZS20 Uid 11 seid 3 quantity 1', '2024-12-23 04:08:14', '2024-12-23 04:08:14'),
(12, NULL, 'CS3DROHMMR7 Uid 11 seid 3 quantity 2', '2024-12-23 04:08:34', '2024-12-23 04:08:34'),
(13, NULL, 'CSTH8SK2RM9 Uid 11 seid 3 quantity 1', '2024-12-23 04:09:23', '2024-12-23 04:09:23'),
(14, NULL, 'CSSIJGZPBI4 Uid 11 seid 3 quantity 1', '2024-12-23 04:12:01', '2024-12-23 04:12:01'),
(15, NULL, 'CS7F83FZRR9 Uid 11 seid 3 quantity 1', '2024-12-23 04:12:11', '2024-12-23 04:12:11'),
(16, NULL, 'CSJG5UONF48 Uid 11 seid 3 quantity 1', '2024-12-23 04:14:50', '2024-12-23 04:14:50'),
(17, NULL, 'CS5QJB4MBZ9 Uid 11 seid 3 quantity 1', '2024-12-23 04:21:33', '2024-12-23 04:21:33'),
(18, 24, 'CS3EPW9S218 Uid 11 seid 3 quantity 1', '2024-12-23 04:23:34', '2024-12-23 04:23:34'),
(19, 25, 'CSDG9DIED17 Uid 11 seid 3 quantity 1', '2024-12-23 05:44:49', '2024-12-23 05:44:49');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL,
  `status` enum('pending','failed','completed') COLLATE utf8_vietnamese_ci NOT NULL,
  `days` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `service_id`, `status`, `days`, `createdAt`, `updatedAt`) VALUES
(1, 8, 9, 'pending', 277.97, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(2, 1, 9, 'pending', 479.3, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(3, 10, 7, 'failed', 973.17, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(4, 9, 5, 'completed', 394.11, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(5, 2, 7, 'pending', 571.16, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(6, 8, 3, 'pending', 601.35, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(7, 1, 5, 'completed', 899.54, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(8, 8, 1, 'pending', 730.43, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(9, 2, 5, 'pending', 496.35, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(10, 7, 5, 'failed', 610.14, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(11, 11, 3, 'completed', 0, '2024-12-23 03:39:31', '2024-12-23 03:39:31'),
(12, 11, 3, 'completed', 0, '2024-12-23 03:42:32', '2024-12-23 03:42:32'),
(13, 11, 3, 'completed', 2, '2024-12-23 03:47:32', '2024-12-23 03:47:32'),
(14, 11, 3, 'completed', 2, '2024-12-23 03:55:32', '2024-12-23 03:55:32'),
(15, 11, 3, 'completed', 2, '2024-12-23 03:59:58', '2024-12-23 03:59:58'),
(16, 11, 3, 'completed', 2, '2024-12-23 04:05:21', '2024-12-23 04:05:21'),
(17, 11, 3, 'completed', 2, '2024-12-23 04:08:14', '2024-12-23 04:08:14'),
(18, 11, 3, 'completed', 2, '2024-12-23 04:08:34', '2024-12-23 04:08:34'),
(19, 11, 3, 'completed', 2, '2024-12-23 04:09:23', '2024-12-23 04:09:23'),
(20, 11, 3, 'completed', 2, '2024-12-23 04:12:01', '2024-12-23 04:12:01'),
(21, 11, 3, 'completed', 2, '2024-12-23 04:12:11', '2024-12-23 04:12:11'),
(22, 11, 3, 'completed', 2, '2024-12-23 04:14:50', '2024-12-23 04:14:50'),
(23, 11, 3, 'completed', 2, '2024-12-23 04:21:33', '2024-12-23 04:21:33'),
(24, 11, 3, 'completed', 2, '2024-12-23 04:23:34', '2024-12-23 04:23:34'),
(25, 11, 3, 'completed', 2, '2024-12-23 05:44:49', '2024-12-23 05:44:49');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_vietnamese_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8_vietnamese_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_vietnamese_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_vietnamese_ci NOT NULL,
  `address` json DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `avatar_url` varchar(255) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `location` json NOT NULL,
  `balance` float NOT NULL,
  `role_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `sex` varchar(255) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `first_name`, `last_name`, `description`, `phone_number`, `email`, `address`, `dob`, `avatar_url`, `location`, `balance`, `role_id`, `createdAt`, `updatedAt`, `sex`, `password`) VALUES
(1, 'Randall.Marvin', 'Tracy', 'Jenkins', 'Velit architecto aut eligendi ducimus.', '1-860-633-9845 x288', 'Erik98@hotmail.com', '{\"city\": \"Jacobston\", \"street\": \"9060 Vernie Points\", \"country\": \"Qatar\"}', '1997-08-12 11:38:24', 'https://cdn.fakercloud.com/avatars/guillemboti_128.jpg', '{\"city\": \"New Jennings\", \"country\": \"Lithuania\"}', 833.24, 3, '2024-12-23 02:08:44', '2024-12-23 02:08:44', NULL, NULL),
(2, 'Amira1', 'Claudie', 'Bartoletti', 'Aspernatur repellendus labore voluptate excepturi corrupti odit soluta molestiae.', '1-326-757-9218 x8897', 'Clemmie.Jacobson@gmail.com', '{\"city\": \"Caleighfort\", \"street\": \"46207 Wisoky Parkway\", \"country\": \"Haiti\"}', '2000-06-15 21:12:16', 'https://cdn.fakercloud.com/avatars/salvafc_128.jpg', '{\"city\": \"Athens-Clarke County\", \"country\": \"Oman\"}', 279.32, 3, '2024-12-23 02:08:44', '2024-12-23 02:08:44', NULL, NULL),
(3, 'Kaylin.Waelchi14', 'Carol', 'Kshlerin', 'Voluptatibus tempore sint sint.', '(544) 888-1389 x23138', 'Dan_McKenzie@hotmail.com', '{\"city\": \"Herzogborough\", \"street\": \"1986 Sandra Forks\", \"country\": \"Guinea\"}', '2006-11-01 22:49:12', 'https://cdn.fakercloud.com/avatars/dgclegg_128.jpg', '{\"city\": \"Elenamouth\", \"country\": \"Jersey\"}', 863.46, 3, '2024-12-23 02:08:44', '2024-12-23 02:08:44', NULL, NULL),
(4, 'Flossie.Olson49', 'Alexander', 'Dare', 'Aut voluptatum rerum vel similique qui iste.', '(734) 642-7819', 'Abraham.Marvin93@yahoo.com', '{\"city\": \"North Shyann\", \"street\": \"64283 Monserrate Drive\", \"country\": \"Egypt\"}', '2001-11-19 17:12:59', 'https://cdn.fakercloud.com/avatars/tobysaxon_128.jpg', '{\"city\": \"Reading\", \"country\": \"Jersey\"}', 506.36, 3, '2024-12-23 02:08:44', '2024-12-23 02:08:44', NULL, NULL),
(5, 'Carlotta.Nitzsche', 'Gerardo', 'Wisozk', 'Animi atque maxime numquam aspernatur voluptates minus dolorem dolor.', '319-200-4576', 'Mellie87@yahoo.com', '{\"city\": \"North Dominicchester\", \"street\": \"468 Blaise Manor\", \"country\": \"Cocos (Keeling) Islands\"}', '1999-08-12 13:58:26', 'https://cdn.fakercloud.com/avatars/bartoszdawydzik_128.jpg', '{\"city\": \"East Gwendolynfort\", \"country\": \"Lao People\'s Democratic Republic\"}', 718.63, 3, '2024-12-23 02:08:44', '2024-12-23 02:08:44', NULL, NULL),
(6, 'Tremayne.VonRueden79', 'Jaleel', 'Bailey', 'Est autem eaque reprehenderit.', '1-997-972-8887', 'Cortney_Grimes43@hotmail.com', '{\"city\": \"Creminchester\", \"street\": \"7595 Osinski Street\", \"country\": \"Marshall Islands\"}', '1995-02-28 14:00:03', 'https://cdn.fakercloud.com/avatars/kolmarlopez_128.jpg', '{\"city\": \"Abigailview\", \"country\": \"Guam\"}', 893.52, 3, '2024-12-23 02:08:44', '2024-12-23 02:08:44', NULL, NULL),
(7, 'Jewell94', 'Abdiel', 'Pfeffer', 'Consequatur perferendis molestiae culpa neque culpa numquam eaque nisi sint.', '(903) 380-5714 x410', 'Everette.Effertz@yahoo.com', '{\"city\": \"East Shayleefort\", \"street\": \"613 Zetta Green\", \"country\": \"Cameroon\"}', '1999-07-21 05:44:48', 'https://cdn.fakercloud.com/avatars/herbigt_128.jpg', '{\"city\": \"North Frederick\", \"country\": \"Belize\"}', 620.39, 3, '2024-12-23 02:08:44', '2024-12-23 02:08:44', NULL, NULL),
(8, 'Holly_Doyle59', 'Arvel', 'Hauck', 'Voluptas a voluptates et.', '1-237-861-2884 x62182', 'Berenice.Armstrong@gmail.com', '{\"city\": \"Howellborough\", \"street\": \"4665 Darren Meadow\", \"country\": \"Luxembourg\"}', '2002-05-31 16:42:24', 'https://cdn.fakercloud.com/avatars/cocolero_128.jpg', '{\"city\": \"Eau Claire\", \"country\": \"Mozambique\"}', 879.88, 3, '2024-12-23 02:08:44', '2024-12-23 02:08:44', NULL, NULL),
(9, 'Hunter_Walsh', 'Cleo', 'O\'Hara', 'Et assumenda ab aliquam deleniti rerum.', '361-424-8337 x518', 'Leora48@gmail.com', '{\"city\": \"Bismarck\", \"street\": \"89039 Halvorson Isle\", \"country\": \"Luxembourg\"}', '1997-03-07 14:45:35', 'https://cdn.fakercloud.com/avatars/peachananr_128.jpg', '{\"city\": \"Lake Retha\", \"country\": \"Burkina Faso\"}', 859.69, 3, '2024-12-23 02:08:44', '2024-12-23 02:08:44', NULL, NULL),
(10, 'Dayana.Lind', 'Delphia', 'Ziemann', 'Sunt et enim nihil ut pariatur ab deserunt culpa.', '(205) 596-9388 x5332', 'Alanis31@gmail.com', '{\"city\": \"South Dewayne\", \"street\": \"2370 Hermann Ways\", \"country\": \"Aruba\"}', '2021-11-25 19:41:37', 'https://cdn.fakercloud.com/avatars/madysondesigns_128.jpg', '{\"city\": \"Port Ludie\", \"country\": \"Micronesia\"}', 232.44, 3, '2024-12-23 02:08:44', '2024-12-23 02:08:44', NULL, NULL),
(11, 'hiengioi', '', '', NULL, '0922345678', 'info@gmail.com', '\"số 24\"', '2004-08-15 00:00:00', NULL, '\"Mai Dịch, Cầu Giấy, Hà Nội\"', 1000, 1, '2024-12-23 02:12:23', '2024-12-23 02:12:23', '0', '$2a$10$XLij0Qz0VeiDfAU8Z.SPBeLsHWwPKwq/k8mRMESsrPVeTXLh.twzG');

-- --------------------------------------------------------

--
-- Table structure for table `user_room`
--

CREATE TABLE `user_room` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

--
-- Dumping data for table `user_room`
--

INSERT INTO `user_room` (`id`, `user_id`, `room_id`, `createdAt`, `updatedAt`) VALUES
(1, 7, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(2, 4, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(3, 6, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(4, 1, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(5, 7, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(6, 2, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(7, 1, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(8, 3, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(9, 9, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(10, 5, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(11, 6, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(12, 10, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(13, 8, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(14, 10, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(15, 7, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(16, 3, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(17, 4, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(18, 3, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(19, 4, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(20, 2, NULL, '2024-12-23 02:08:44', '2024-12-23 02:08:44'),
(21, 11, 1, '2024-12-23 04:05:21', '2024-12-23 04:05:21'),
(22, 11, 1, '2024-12-23 04:08:14', '2024-12-23 04:08:14'),
(23, 11, 1, '2024-12-23 04:08:34', '2024-12-23 04:08:34'),
(24, 11, 1, '2024-12-23 04:09:23', '2024-12-23 04:09:23'),
(25, 11, 1, '2024-12-23 04:12:01', '2024-12-23 04:12:01'),
(26, 11, 1, '2024-12-23 04:12:11', '2024-12-23 04:12:11'),
(27, 11, 1, '2024-12-23 04:14:50', '2024-12-23 04:14:50'),
(28, 11, 1, '2024-12-23 04:21:33', '2024-12-23 04:21:33'),
(29, 11, 1, '2024-12-23 04:23:34', '2024-12-23 04:23:34'),
(30, 11, 1, '2024-12-23 05:44:49', '2024-12-23 05:44:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `equipments`
--
ALTER TABLE `equipments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `equipment_comments`
--
ALTER TABLE `equipment_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equipment_id` (`equipment_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_permission`
--
ALTER TABLE `role_permission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `room_comments`
--
ALTER TABLE `room_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `service_comments`
--
ALTER TABLE `service_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `transactionLogs`
--
ALTER TABLE `transactionLogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_id` (`transaction_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_room`
--
ALTER TABLE `user_room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `room_id` (`room_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `equipments`
--
ALTER TABLE `equipments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `equipment_comments`
--
ALTER TABLE `equipment_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `role_permission`
--
ALTER TABLE `role_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `room_comments`
--
ALTER TABLE `room_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `service_comments`
--
ALTER TABLE `service_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `transactionLogs`
--
ALTER TABLE `transactionLogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user_room`
--
ALTER TABLE `user_room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `equipments`
--
ALTER TABLE `equipments`
  ADD CONSTRAINT `equipments_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equipment_comments`
--
ALTER TABLE `equipment_comments`
  ADD CONSTRAINT `equipment_comments_ibfk_1` FOREIGN KEY (`equipment_id`) REFERENCES `equipments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipment_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `role_permission`
--
ALTER TABLE `role_permission`
  ADD CONSTRAINT `role_permission_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `role_permission_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `room_comments`
--
ALTER TABLE `room_comments`
  ADD CONSTRAINT `room_comments_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `room_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `service_comments`
--
ALTER TABLE `service_comments`
  ADD CONSTRAINT `service_comments_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `service_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transactionLogs`
--
ALTER TABLE `transactionLogs`
  ADD CONSTRAINT `transactionLogs_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_room`
--
ALTER TABLE `user_room`
  ADD CONSTRAINT `user_room_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_room_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
