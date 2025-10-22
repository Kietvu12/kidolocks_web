-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: kidolocks
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cai_dat_phan_mem`
--

DROP TABLE IF EXISTS `cai_dat_phan_mem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cai_dat_phan_mem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_thiet_bi` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nguoi_dung_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `bat_kiem_soat` tinyint(1) DEFAULT '0',
  `ngay_cap_nhat` datetime DEFAULT NULL,
  `khoang_thoi_gian_chan` int DEFAULT '10',
  `che_do_chan_web` tinyint(1) DEFAULT '0',
  `hien_thong_bao_app` tinyint(1) DEFAULT '0',
  `hien_thong_bao_web` tinyint(1) DEFAULT '0',
  `khoi_dong_cung_windows` tinyint(1) DEFAULT '1',
  `chan_task_manager` tinyint(1) DEFAULT '1',
  `bat_chup_man_hinh` tinyint(1) DEFAULT '0',
  `khoang_thoi_gian_chup_man_hinh` int DEFAULT '10000',
  `duong_dan_luu_anh_chup_man_hinh` text COLLATE utf8mb4_general_ci,
  `so_ngay_cho_phep_luu_tru` int DEFAULT '7',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `cai_dat_phan_mem_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cai_dat_phan_mem`
--

LOCK TABLES `cai_dat_phan_mem` WRITE;
/*!40000 ALTER TABLE `cai_dat_phan_mem` DISABLE KEYS */;
INSERT INTO `cai_dat_phan_mem` VALUES (121,'BFEBFBFF000A0653611666','93a0a6e4-86fc-4492-9b6b-71a3087ca7c2',0,NULL,10,0,0,0,1,1,0,10000,NULL,7),(122,'000000000000000056ZDOJ','e1d24f55-b581-4f20-93e6-9998eab9f875',1,'2025-10-22 15:47:37',10,1,0,0,0,0,0,0,NULL,7);
/*!40000 ALTER TABLE `cai_dat_phan_mem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `canh_bao_ai`
--

DROP TABLE IF EXISTS `canh_bao_ai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `canh_bao_ai` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_thiet_bi` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nguoi_dung_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `thoi_gian` datetime DEFAULT CURRENT_TIMESTAMP,
  `loai_canh_bao` text COLLATE utf8mb4_general_ci NOT NULL,
  `chi_tiet` text COLLATE utf8mb4_general_ci,
  `da_xu_ly` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `canh_bao_ai_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `canh_bao_ai`
--

LOCK TABLES `canh_bao_ai` WRITE;
/*!40000 ALTER TABLE `canh_bao_ai` DISABLE KEYS */;
/*!40000 ALTER TABLE `canh_bao_ai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_tokens`
--

DROP TABLE IF EXISTS `device_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `platform` enum('android','ios') COLLATE utf8mb4_general_ci NOT NULL,
  `last_seen_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_tokens`
--

LOCK TABLES `device_tokens` WRITE;
/*!40000 ALTER TABLE `device_tokens` DISABLE KEYS */;
INSERT INTO `device_tokens` VALUES (47,'BFEBFBFF000806C1MCN0CV07E346493','c4PVPxz3ROu90oBCtOl7k3:APA91bE6sZg0FljTOuCmv_Z7o4p9A0JWAFyA_J2L6Jq6KdkufRB4N0dzndoFvwViNPEdQd1px-L1rw3e7Ubmtt-1EGjSbhMO579Fn3g87kF6Hcp-kGTuy5U','android','2025-09-19 15:47:35',1),(49,'BFEBFBFF000B06A2YX06SB9V','fW0J036PRWC9KisS_O_KNf:APA91bHaz61FFpO6-AV7H3Cb4Gtr7_65q_rQQDqkoX4bARZhK-4obyE6akGMF7J-389DWHww2xtcJKcm3hgGVWzwM8Fxuc4_CfjlX_djeA1ak3Qpg3eP9Zc','android','2025-09-19 16:14:41',1),(52,'BFEBFBFF000A0653611666','cMB4Z3V4SCWKO-d8SFQu6U:APA91bE2l3SQIRQi3SK9TWVHwQFophVok4SV4p5yatHE_JYaODS7moX7CIjSA_ne5MWupl-8cEy5ZThfrbZhChIfxi2D_886NOxayvDB9TE45ax9yettFvM','android','2025-09-20 02:22:14',1),(54,'BFEBFBFF000806C1MCN0CV07E346493','cyuCdGNzQ8aJ92jJplN0sz:APA91bGNlwjEIWhoSo-oITgIRMPwiJfvhTm5v2Eekh_be2vTgKYOJ6W0YWGGpWBHWCg_fZz0LJShyMulB2gLPN-CBdFCrlKuJpMyiO2E1ziLAoBL-puS6D0','android','2025-09-20 08:59:24',1),(55,'178BFBFF00810F81L7NRCV00C52927C','fW0J036PRWC9KisS_O_KNf:APA91bHaz61FFpO6-AV7H3Cb4Gtr7_65q_rQQDqkoX4bARZhK-4obyE6akGMF7J-389DWHww2xtcJKcm3hgGVWzwM8Fxuc4_CfjlX_djeA1ak3Qpg3eP9Zc','android','2025-09-21 16:04:57',1),(57,'BFEBFBFF000806C1MCN0CV07E346493','dgXCbubsSpO5X1SjZd7cgU:APA91bFF1L-hDPgtJuxYCYEMUG4cFJ_l_ZarZr7wiNlQfyb8KAePQoVK1piRJz8UgRsqHil5t14ifbpZHsVAigDAMGo2WD96lrBxmR7MxXR1-xNU4bpNxt8','android','2025-10-21 08:05:23',1),(58,'DK1234','dgXCbubsSpO5X1SjZd7cgU:APA91bFF1L-hDPgtJuxYCYEMUG4cFJ_l_ZarZr7wiNlQfyb8KAePQoVK1piRJz8UgRsqHil5t14ifbpZHsVAigDAMGo2WD96lrBxmR7MxXR1-xNU4bpNxt8','android','2025-10-21 10:30:43',1),(59,'BFEBFBFF000806C1MCN0CV07E346493','e1iUAaGkSBeMhoTL43Y20X:APA91bEdm5EXxRm7w0QgpaB1Jz86mzPjNmF1mACZlXdiPSnT2YKCH-S4Fshabjfk78CC-ZC4u3Nrj6eZAeniZOwhb8QwMhhKTEK2vso09YwqOCVbqx37pOM','android','2025-10-21 10:48:52',1),(60,'000000000000000056ZDOJ','e1iUAaGkSBeMhoTL43Y20X:APA91bEdm5EXxRm7w0QgpaB1Jz86mzPjNmF1mACZlXdiPSnT2YKCH-S4Fshabjfk78CC-ZC4u3Nrj6eZAeniZOwhb8QwMhhKTEK2vso09YwqOCVbqx37pOM','android','2025-10-21 10:51:06',1),(61,'000000000000000056ZDOJ','cJ9ZmufJT5KGuXZLwpYPgx:APA91bHWEbBaGixpUO4tVdeVIIpCQSqitaBMtnoAuZ6WWzFRWQMbfQlANYzhh3sspAxYV7in6i4YHs2w5uadtg3IUWyTH9QTtbPtA5nx2xly6lr6NnkARbE','android','2025-10-22 02:06:48',1),(62,'BFEBFBFF000806C1MCN0CV07E346493','cJ9ZmufJT5KGuXZLwpYPgx:APA91bHWEbBaGixpUO4tVdeVIIpCQSqitaBMtnoAuZ6WWzFRWQMbfQlANYzhh3sspAxYV7in6i4YHs2w5uadtg3IUWyTH9QTtbPtA5nx2xly6lr6NnkARbE','android','2025-10-22 02:09:54',1),(63,'BFEBFBFF000806C1MCN0CV07E346493','edMqxsh1RHCiFdJhCuWCTE:APA91bHXXqBrK-WAL93mqCMy5eURi5c15eVgzNx0okCjQN_OoHuec3BK0ySxRhLg-4uErodua6JI2hlY-dG5EgVEVUB-1aoGLCmk7CH3HU7SBuTyLKZX440','android','2025-10-22 02:20:29',1),(64,'DK1234','edMqxsh1RHCiFdJhCuWCTE:APA91bHXXqBrK-WAL93mqCMy5eURi5c15eVgzNx0okCjQN_OoHuec3BK0ySxRhLg-4uErodua6JI2hlY-dG5EgVEVUB-1aoGLCmk7CH3HU7SBuTyLKZX440','android','2025-10-22 02:21:01',1),(65,'BFEBFBFF000A0653611666','cJ9ZmufJT5KGuXZLwpYPgx:APA91bHWEbBaGixpUO4tVdeVIIpCQSqitaBMtnoAuZ6WWzFRWQMbfQlANYzhh3sspAxYV7in6i4YHs2w5uadtg3IUWyTH9QTtbPtA5nx2xly6lr6NnkARbE','android','2025-10-22 07:24:44',1);
/*!40000 ALTER TABLE `device_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goi_dich_vu`
--

DROP TABLE IF EXISTS `goi_dich_vu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goi_dich_vu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_thiet_bi` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Mã thiết bị (nullable until assigned)',
  `nguoi_dung_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ID người dùng (nullable until assigned)',
  `ngay_bat_dau` datetime DEFAULT NULL COMMENT 'Ngày bắt đầu sử dụng (nullable until activated)',
  `ngay_ket_thuc` datetime DEFAULT NULL,
  `gia` decimal(10,2) DEFAULT NULL,
  `trang_thai` enum('CHUA_THANH_TOAN','CHUA_GAN_THIET_BI','DANG_HOAT_DONG','HET_HAN','HUY') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'CHUA_THANH_TOAN' COMMENT 'Trạng thái gói dịch vụ',
  `phuong_thuc_thanh_toan` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ma_giao_dich` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `thong_tin_goi_id` int DEFAULT NULL,
  `phu_huynh_id` int DEFAULT NULL COMMENT 'ID của phụ huynh mua gói',
  `ngay_mua` datetime DEFAULT NULL COMMENT 'Ngày mua gói',
  `vnp_txn_ref` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Mã giao dịch VNPay',
  `vnp_order_info` text COLLATE utf8mb4_general_ci COMMENT 'Thông tin đơn hàng VNPay',
  `vnp_response_code` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Mã phản hồi từ VNPay',
  `vnp_transaction_status` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Trạng thái giao dịch VNPay',
  PRIMARY KEY (`id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `fk_thong_tin_goi` (`thong_tin_goi_id`),
  KEY `idx_phu_huynh_id` (`phu_huynh_id`),
  KEY `idx_ngay_mua` (`ngay_mua`),
  KEY `idx_vnp_txn_ref` (`vnp_txn_ref`),
  KEY `idx_vnp_response_code` (`vnp_response_code`),
  CONSTRAINT `fk_goi_dich_vu_phu_huynh` FOREIGN KEY (`phu_huynh_id`) REFERENCES `phu_huynh` (`ma_phu_huynh`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_thong_tin_goi` FOREIGN KEY (`thong_tin_goi_id`) REFERENCES `thong_tin_goi` (`id`),
  CONSTRAINT `goi_dich_vu_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Bảng quản lý gói dịch vụ với tích hợp thanh toán VNPay. Phụ huynh mua gói trước, sau đó gán cho thiết bị cụ thể.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goi_dich_vu`
--

LOCK TABLES `goi_dich_vu` WRITE;
/*!40000 ALTER TABLE `goi_dich_vu` DISABLE KEYS */;
INSERT INTO `goi_dich_vu` VALUES (37,'000000000000000056ZDOJ','e1d24f55-b581-4f20-93e6-9998eab9f875','2025-10-22 09:02:37','2025-11-22 09:02:37',0.00,'DANG_HOAT_DONG',NULL,NULL,6,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `goi_dich_vu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lich_su_thanh_toan`
--

DROP TABLE IF EXISTS `lich_su_thanh_toan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lich_su_thanh_toan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_thiet_bi` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nguoi_dung_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `thoi_gian` datetime NOT NULL,
  `so_tien` decimal(10,2) NOT NULL,
  `phuong_thuc` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ma_giao_dich` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `trang_thai` enum('thanh_cong','that_bai') COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `lich_su_thanh_toan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lich_su_thanh_toan`
--

LOCK TABLES `lich_su_thanh_toan` WRITE;
/*!40000 ALTER TABLE `lich_su_thanh_toan` DISABLE KEYS */;
/*!40000 ALTER TABLE `lich_su_thanh_toan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mau_trang_web_bi_chan`
--

DROP TABLE IF EXISTS `mau_trang_web_bi_chan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mau_trang_web_bi_chan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_trang_web` varchar(3000) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mau_trang_web_bi_chan`
--

LOCK TABLES `mau_trang_web_bi_chan` WRITE;
/*!40000 ALTER TABLE `mau_trang_web_bi_chan` DISABLE KEYS */;
INSERT INTO `mau_trang_web_bi_chan` VALUES (1,'facebook'),(2,'messenger'),(3,'instagram'),(4,'tiktok'),(5,'zalo'),(6,'twitter'),(7,'snapchat'),(8,'pinterest'),(9,'phimmoi'),(10,'phimbathu'),(11,'anime47'),(12,'hdviet'),(13,'bilutv'),(14,'phimmoizz'),(15,'roblox'),(16,'minecraft'),(17,'garena'),(18,'lienquan'),(19,'freefire'),(20,'pubg'),(21,'steam'),(22,'epicgames'),(23,'fun88'),(24,'m88'),(25,'bong88'),(26,'fabet'),(27,'w88'),(28,'sv388'),(29,'kubet'),(30,'baccarat'),(31,'xoso'),(32,'casino'),(33,'crack'),(34,'serial'),(35,'keygen'),(36,'hackgame'),(37,'modapk'),(38,'omegle'),(39,'chatroulette'),(40,'discord'),(41,'telegram'),(42,'voz'),(43,'chanvn'),(44,'reddit'),(45,'4chan');
/*!40000 ALTER TABLE `mau_trang_web_bi_chan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mau_trang_web_cho_phep`
--

DROP TABLE IF EXISTS `mau_trang_web_cho_phep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mau_trang_web_cho_phep` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_trang_web` varchar(3000) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mau_trang_web_cho_phep`
--

LOCK TABLES `mau_trang_web_cho_phep` WRITE;
/*!40000 ALTER TABLE `mau_trang_web_cho_phep` DISABLE KEYS */;
INSERT INTO `mau_trang_web_cho_phep` VALUES (1,'olm'),(2,'violet'),(3,'vndoc'),(4,'hocmai'),(5,'tuhoc'),(6,'moon'),(7,'kenhtuyensinh'),(8,'hoc24'),(9,'loigiaihay'),(10,'giaibaitap'),(11,'baitap123'),(12,'azota'),(13,'shub'),(14,'vietjack'),(15,'giaovienvietnam'),(16,'tailieu'),(17,'hoctap'),(18,'giaibaitap'),(19,'toanhoc'),(20,'vanhoc'),(21,'lyhoc'),(22,'hoahoc'),(23,'lichsu'),(24,'diali'),(25,'tienganh'),(26,'english'),(27,'sinhhoc'),(28,'google');
/*!40000 ALTER TABLE `mau_trang_web_cho_phep` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nguoi_dung`
--

DROP TABLE IF EXISTS `nguoi_dung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ma_thiet_bi` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ma_tre_em` int DEFAULT NULL,
  `ngay_tao` datetime DEFAULT CURRENT_TIMESTAMP,
  `loai_thiet_bi` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ten_thiet_bi` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`),
  KEY `fk_nguoidung_treem` (`ma_tre_em`),
  CONSTRAINT `fk_nguoidung_treem` FOREIGN KEY (`ma_tre_em`) REFERENCES `tre_em` (`ma_tre_em`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nguoi_dung`
--

LOCK TABLES `nguoi_dung` WRITE;
/*!40000 ALTER TABLE `nguoi_dung` DISABLE KEYS */;
INSERT INTO `nguoi_dung` VALUES ('93a0a6e4-86fc-4492-9b6b-71a3087ca7c2','BFEBFBFF000A0653611666',41,'2025-10-22 14:23:26','Laptop','rdsic'),('e1d24f55-b581-4f20-93e6-9998eab9f875','000000000000000056ZDOJ',44,'2025-10-22 14:48:15','Laptop','ducanh');
/*!40000 ALTER TABLE `nguoi_dung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `noi_dung_goi`
--

DROP TABLE IF EXISTS `noi_dung_goi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `noi_dung_goi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `thong_tin_goi_id` int NOT NULL COMMENT 'ID của gói dịch vụ (liên kết với thong_tin_goi)',
  `noi_dung` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nội dung/tính năng của gói',
  PRIMARY KEY (`id`),
  KEY `fk_noi_dung_goi_thong_tin_goi` (`thong_tin_goi_id`),
  CONSTRAINT `fk_noi_dung_goi_thong_tin_goi` FOREIGN KEY (`thong_tin_goi_id`) REFERENCES `thong_tin_goi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng quản lý nội dung của các gói dịch vụ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `noi_dung_goi`
--

LOCK TABLES `noi_dung_goi` WRITE;
/*!40000 ALTER TABLE `noi_dung_goi` DISABLE KEYS */;
INSERT INTO `noi_dung_goi` VALUES (33,8,'Giới hạn thời gian sử dụng'),(34,8,'Chặn/ mở website & app theo danh mục'),(35,8,'Lịch sử truy cập web'),(36,6,'Giới hạn thời gian sử dụng'),(37,6,'Chặn/ mở website & app theo danh'),(38,6,'Lịch sử truy cập web'),(39,6,'Quản lý thời gian từng app'),(40,6,'Quản lý thời gian từng website'),(41,6,'Xem ảnh chụp màn hình liên tục thiết bị của trẻ'),(42,6,'Báo cáo chi tiết thời gian sử dụng'),(43,6,'Làm bài online, thưởng thêm thời gian chơi'),(44,6,'AI cảnh báo truy cập lạ'),(45,3,'Giới hạn thời gian sử dụng'),(46,3,'Chặn/ mở website & app theo danh mục'),(47,3,'Lịch sử truy cập web'),(48,3,'Quản lý thời gian từng app'),(49,3,'Quản lý thời gian từng website'),(50,3,'Xem ảnh chụp màn hình liên tục thiết bị của trẻ'),(51,3,'Báo cáo chi tiết thời gian sử dụng'),(52,3,'Làm bài online, thưởng thêm thời gian chơi'),(53,3,'AI cảnh báo truy cập lạ '),(54,2,'Giới hạn thời gian sử dụng'),(55,2,'Chặn/ mở website & app theo danh mục'),(56,2,'Lịch sử truy cập web'),(57,2,'Quản lý thời gian từng app'),(58,2,'Quản lý thời gian từng website'),(59,2,'Xem ảnh chụp màn hình liên tục thiết bị của trẻ'),(60,2,'Báo cáo chi tiết thời gian sử dụng'),(61,2,'Làm bài online, thưởng thêm thời gian chơi'),(62,2,'AI cảnh báo truy cập lạ'),(63,4,'Giới hạn thời gian sử dụng'),(64,4,'Chặn/ mở website & app theo danh mục'),(65,4,'Lịch sử truy cập web'),(66,4,'Quản lý thời gian từng app'),(67,4,'Quản lý thời gian từng website'),(68,4,'Xem ảnh chụp màn hình liên tục thiết bị của trẻ'),(69,4,'Báo cáo chi tiết thời gian sử dụng'),(70,4,'Làm bài online, thưởng thêm thời gian chơi'),(71,4,'AI cảnh báo truy cập lạ ');
/*!40000 ALTER TABLE `noi_dung_goi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otp_verification`
--

DROP TABLE IF EXISTS `otp_verification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otp_verification` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Mã ID',
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Số điện thoại',
  `otp_code` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Mã OTP',
  `purpose` enum('registration','login','reset_password') COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Mục đích sử dụng OTP',
  `is_used` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Đã sử dụng chưa',
  `expires_at` datetime NOT NULL COMMENT 'Thời gian hết hạn',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời gian tạo',
  `used_at` datetime DEFAULT NULL COMMENT 'Thời gian sử dụng',
  PRIMARY KEY (`id`),
  KEY `idx_phone_purpose` (`phone`,`purpose`),
  KEY `idx_expires_at` (`expires_at`),
  KEY `idx_is_used` (`is_used`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng lưu trữ mã OTP xác thực';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp_verification`
--

LOCK TABLES `otp_verification` WRITE;
/*!40000 ALTER TABLE `otp_verification` DISABLE KEYS */;
INSERT INTO `otp_verification` VALUES (1,'0365157215','830212','registration',1,'2025-10-13 10:00:37','2025-10-13 09:55:37','2025-10-13 09:55:51'),(2,'0365157215','065739','reset_password',1,'2025-10-17 07:47:53','2025-10-17 07:42:53','2025-10-17 07:43:27'),(3,'0982404868','772885','registration',0,'2025-10-22 03:49:40','2025-10-22 03:44:40',NULL),(4,'0868803548','206539','registration',0,'2025-10-22 07:52:07','2025-10-22 07:47:06',NULL),(5,'0866423275','948992','registration',0,'2025-10-22 08:31:37','2025-10-22 08:26:37',NULL),(6,'0866423273','704873','registration',0,'2025-10-22 08:32:53','2025-10-22 08:27:53',NULL);
/*!40000 ALTER TABLE `otp_verification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phan_mem_cho_phep`
--

DROP TABLE IF EXISTS `phan_mem_cho_phep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phan_mem_cho_phep` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_thiet_bi` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `nguoi_dung_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ten_phan_mem` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `ngay_cap_nhat` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `phan_mem_cho_phep_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phan_mem_cho_phep`
--

LOCK TABLES `phan_mem_cho_phep` WRITE;
/*!40000 ALTER TABLE `phan_mem_cho_phep` DISABLE KEYS */;
INSERT INTO `phan_mem_cho_phep` VALUES (22,'BFEBFBFF000A0653611666','93a0a6e4-86fc-4492-9b6b-71a3087ca7c2','[{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe\"},{\"DuongDanPhanMem\":\"C:\\\\WINDOWS\\\\system32\\\\ApplicationFrameHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\WINDOWS\\\\system32\\\\ApplicationFrameHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\IDE\\\\devenv.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\IDE\\\\devenv.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Users\\\\rdsic\\\\AppData\\\\Local\\\\GitHubDesktop\\\\app-3.5.3\\\\GitHubDesktop.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Users\\\\rdsic\\\\AppData\\\\Local\\\\GitHubDesktop\\\\app-3.5.3\\\\GitHubDesktop.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\ImmersiveControlPanel\\\\SystemSettings.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Windows\\\\ImmersiveControlPanel\\\\SystemSettings.exe\"}]','2025-10-22');
/*!40000 ALTER TABLE `phan_mem_cho_phep` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phan_mem_tren_may_tinh`
--

DROP TABLE IF EXISTS `phan_mem_tren_may_tinh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phan_mem_tren_may_tinh` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ma_thiet_bi` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ten_phan_mem` text COLLATE utf8mb4_general_ci NOT NULL,
  `ngay_cap_nhat` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `phan_mem_tren_may_tinh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phan_mem_tren_may_tinh`
--

LOCK TABLES `phan_mem_tren_may_tinh` WRITE;
/*!40000 ALTER TABLE `phan_mem_tren_may_tinh` DISABLE KEYS */;
/*!40000 ALTER TABLE `phan_mem_tren_may_tinh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phu_huynh`
--

DROP TABLE IF EXISTS `phu_huynh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phu_huynh` (
  `ma_phu_huynh` int NOT NULL AUTO_INCREMENT,
  `email_phu_huynh` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `sdt` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ten_phu_huynh` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ngay_tao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mat_khau` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `la_admin` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Phân quyền admin (true: admin, false: user thường)',
  PRIMARY KEY (`ma_phu_huynh`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phu_huynh`
--

LOCK TABLES `phu_huynh` WRITE;
/*!40000 ALTER TABLE `phu_huynh` DISABLE KEYS */;
INSERT INTO `phu_huynh` VALUES (18,'lananh@gmail.com','0393608882','Lan Anh','2025-10-22 02:14:23','OmvMjtQxCs2PyywQ833r1T4MY8sxmg9E32rjg/azFBM=',1),(19,'tanhls222@gmail.com','0982404868','Kieu Tuan Anh','2025-10-22 10:44:56','AbRI5vRAlp93G4t4WO3TixwVFmcpl0Xe5o/D8ALb8lE=',0),(21,'nhutran2k2@gmail.com','0868803548','Trần Thị Tố Như','2025-10-22 14:47:25','BFQ3sd3DRWCR08Igf1nES0hiq29L5KK2tLw5Ww31ymw=',0),(25,'tanhls1@gmail.com','0866423273','Ái Nhi','2025-10-22 15:28:07','vwZECk/rUQSBxaXM4OajKw==',0);
/*!40000 ALTER TABLE `phu_huynh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quan_ly_thoi_gian`
--

DROP TABLE IF EXISTS `quan_ly_thoi_gian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quan_ly_thoi_gian` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ma_thiet_bi` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `thoi_gian` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `ngay_cap_nhat` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `quan_ly_thoi_gian_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quan_ly_thoi_gian`
--

LOCK TABLES `quan_ly_thoi_gian` WRITE;
/*!40000 ALTER TABLE `quan_ly_thoi_gian` DISABLE KEYS */;
INSERT INTO `quan_ly_thoi_gian` VALUES (10,'93a0a6e4-86fc-4492-9b6b-71a3087ca7c2','BFEBFBFF000A0653611666','[{\"Thu\":\"Thứ 2\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false},{\"Thu\":\"Thứ 3\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false},{\"Thu\":\"Thứ 4\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false},{\"Thu\":\"Thứ 5\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false},{\"Thu\":\"Thứ 6\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false},{\"Thu\":\"Thứ 7\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false},{\"Thu\":\"Chủ nhật\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false}]','2025-10-22'),(11,'e1d24f55-b581-4f20-93e6-9998eab9f875','000000000000000056ZDOJ','8gKswe8LtmMnazJiR7NROZ2tD40TL11mAbbZE+SPpgV7TAwy/vJtS3N8TCXVZg5aMjo+yrk0yEvteZXCGXhmAsBGfR0BwYUXtV2Bqrtqf/7Sfe9rKjg63miDrS3EYPJCdxARhiaPtEsRGZUSCUv7gM1MN9QobMRVvE/KM0guQ/GV1BL0+F/gmuDNdqpPqUZ5FRtlyJGFlzsMeHfhloOcJLGns/uxDbbQ/JpqI8eH7QpBBfCcxH8dUhWjyCqg3YAqsnZzt58UpPQx/a6Zmeu4+injewPRMyXP+XcbX0KVCmPzHfVQ20Ib7RIfx5VQKd712ih5eXteQmc601eruugecEmVMgCvpYz+2uaeF26RxRzSJq5SIazi4kJgfviKN9O0ME2nuS8Nh00psCn2et6OWHSfebG5GASt47hZnz8ZF++1/c2Tzmo4QxBmnWZ+tVNHGpdU+Nd4jlKWwOe3//XFigv5rV/o4RuSJaaaGoSXrLgbkYAz6qnlDxqw77XD9HKvimrTifEfBI/O4TQHCwnetuqJtX8M74AdCm0/pIk5EzTdKWNlLKONy5DjShqCpqtO7AMvAuyuGZ7kFAe57P2zzyqXrnTwszVlzq4cOGu+3SRs31pXp8KqaQFXfTwzYOU/K+yoZSWNAtuBg+QBaMr3+49C0eUedXCaIKCWIo5OF3l3pzvyptSdLNf2/LqyOvqvMAmzY27rz0Jfzf2xPgwS7WKlNoiZLQ5KWJ9QdzzMKtj5PXYzR+qEYoHJXIWey+U9TpeRqQT2C/RFwBRE0h9IjP8epcFR6EPzK96Vycu+oGWp1MJkqjsq9PPN/n7l9OtbSh4VcCki+uaA3LiZTUV6R+p1N09YG4PVmkS67jeOg/v7FEcXAfbbJURQVUvbmBhTX7WNamuw15DczeEkWOtQOh2YgoJuKTtAtPIjd5MFuvLDFWC3MURRlCqpw8ARXk0OeB4Ipe4iWqNXbmrLFBTRV59QWEwaiL0U1SQQ5pX+lTmCY7t2VpqbSfe+6YjM3g5hJSi2leFPSWcy51B3xl+/faMRmbMx7DFi2l3SObZsUpV+ATntEPA1q9dOGfssOxUKICDcXHGF84gJpcMvHmfPdl7VPmRLATWM+hB2jp2UtGpzDb9deIPCzu6MMy6eHLrOMUL1+PADxPlqiVEjWlJHNUoyn1OUrMrq6DLHlJ0pVYcvVJ8EkjehSpPnKa4wwt1xIicOnxwM7Pbu0jK6bK56C+ewGQNK84qlCJWgUjaQmwlyNu/APKUMHjJnt3uV7Qnbo89xaM/bPPSZrqkLpbfSjdlzp1Qy08QwlFug++NPwUXytfsy0yqUoFNPMo7/0XTIlSbl+v1qaGpAQdEKC9CBULUD+TqPOxCoA1Y1nO7EFsnyqCotXJvehcSFhAMh6t9qo78GH+f5yxNlowRbdhLY3JAo5Rb4LZiWIxzhRkjnioLTVa4IfKP2bs+DM6PZ4GZrVWlPoKWS5UWWu8jWt3dCZiUmQo/95QWPKMR8nCIkSvJryrX27TjBxY/XlQT8m10DcvW45cg1qC8B1Amml/soKopEyjjm6Bja3hfsx+oqewZwNs2rT6QLw6DOlBx68FjxXT24c5q+vFAww2nOrSAU1scZDPDsimIk00/pj1CgJPGfL4CiKGNK4gVlwXHpkhYabhNQRhnsuzCKGjN1IqF+Oy2ylfavMEW0DCveO046KTJMYfQJhcLz+kD7/QJl49YtPLpmLq3pjiPFONhlUXNWpbMGOXCKCCv4XUMLkMs8PJaxEIfbXItOT5zjSiXW5BS9m3Ya5yVHnSqxXeFtnYui+dTFEc9d7Ks3eNGLPZvQ8EWo5l5tAr2nB8nWZzFy1uW7eT7DA89flhns39TEQAYIhA5yr/BKxKgeB3CYY0bUN7oAHhbIoeSCs/kUeobF3MIBR8Bkp6M4w9lWKFQR87IweItKx7vSe74RiJutfiX7kJ0ari2tEdth+8Rl0m7Xs6CG2V4lCt4q1ch/RFY5n6ZSJJf2hOoTbnPEx6U+cy7sfSbW7VGFaGogL8+qlx7vE4Uj3ors6FZ+wf7UPMUO+KfI2sULfb1QmYl5qcCnitJeH1Kh5lUZ7TENxxejTEnjHVK4wbHC3skEjnL16ifu62HBoZM+mXO3hY1YkA7rZmkfADCPzqywHFVCvWdsFtRFfUr2ZE41S9a1HsrIw4Pt7ArT13k85pyhw3ijhp+BYRYYgX7hbe5v2lUHKji8nZp1z0BKEZVLMKobGtRWwzwA4xOJ6OhOT98afLvAugz5uA9pyF/bU6uJojHMOCrrCdAkxJmbJ5AWsqOC+HGqBodHr8s5Ti4Qxzeex8dqlQTeKZxhsFDA7455w37naLwcM8nStsQCyHJLuDwvTRb1q0zWczH0QmhcsPuP3eWnlqYiPdc0XjcwbNnl+/tyq8HheKeMWZMkU/Pb7nVwuDPmpzoqi9zsFZsa4e3bHS6SgWB43XoLvKJxHCcs4QlGG9n1T3sqXigqRQhwl0njQgKuYJe9OB9qYrYIK6yhoiWRAr7ZfcERu7Oz+YzGwoMpXilaZsIPXLstInuxfpKkyvaN7HXWQmB0VGghEZPd1AP3NRG8Aeu6tFzRNugXuGCzL59IxQ2yAM87xStYUVs316F/t48PEhAgZGeN8B6FeOpWAHfZjZBCWd5BjibfRZaIYH+wxqx+E7Oyr0rAyapt2Oh0RmIzXI26afKrCkcQWSedRxLqlUQYWUbrb3OiXH6i8cw7cdkU5hW59L/1m1MJ5MMF/qpKEY1aAfvdeeZVOhQCHOemXUIRhqjtD2s2h/pwcIdgHurjM5mkIq120IxD9jr47NP+818yIt9SY5j6BydSU0BadK5GxAz6tupswS0+utDvpk68j5TZMUQaPQoTOrApJY1SD+iRI9pSQhGuC+wyWzxDiCO6JGzPu4GrTeDSzs80J3fkcDQDPCJ20ASjo3iCJHVt/KhWdgstPyBfj/YQq94mZf2QpBoaYy7NdLSJDHT4YON0BVqwkAPaSHF1hY+Ub7N3zk8EfEWBDGBZwc+foP88mV6Kul5jilWmVaEX1H9oToH9kg/IxO3Gx/35kwi7VsoH+BrEWyfc1+SRAFkC4ozx0j5VtED70bHL8J+OzjdeDQxQ4IfmMISJo02oAjzDBYFKObTdURIeaGaqFPgPxSEWd7uFF3MZFvgNWdYo6cXr49Kcg5hdTP7rC4YI9AIRsThWO5LFYbFiuBaEJ1Wek0DaSE3E7Hirn6ELhp1yuNxn3Nv/r/fJ9qbjz2rIyKsdM4Wgs7W6eNbhpo4siLvkH5AVddUhR7S4AdO0PvDlX5thPMgAJ9O+ClKdwUn2GYNze+LG/tM5scuIAD74s12U8PxyNeDVN1vECWIYEy35IQoUUpV7VahgasKdLcezNG1yWZtBky4N5AUQeHGqg5dEH3YbYR22YimARQ3WcRRDGloYPnlrzF3f93Gk/h+flRMQT9/xj4+xDjWZzzql6dwT09qnHvtHTp9kARgEUdR2SZf+X6OotBCxSjVNaTQWnpRq0PxuQjopfK3mkm+sYC8goSjjA4uB8zX2Ne5wVPGhIviVuqxQA0DT1kixwQ8LubomrjY5oRU7sdSyNlxt7EnhwtdZNxj6HY0B76G1jgLKDqxytBKhs+agAgtoU9u8rejBAoogMmWCHG4poE9Imonr5lnbzTQb07YmPPdA63xVwUq/VeJqdX9IV80/Cw0QxFF9HOAARTcntZcLD/2zROMwuR75GpwKFjpUn6kJ4u93UBrOnibMUrTO9NJs0b638tubVD7IoW70wM3k+Ktyo63P2r7aaSEAPU7iMLi7CKJrHucp48DAuxC3Fzo7a3K5Tqmdoz3f87WfSQs4YjnUYyvJmdGrT0NzoVGmtooktzkshe3IHss2r2hpTFqJbpMsPa1F2QpwDgn7+YAIHVI6BuhXFQgkTt7z/cAWXZxaX1qpzMrw/1Fe3lRhMl+PO2H/xTnT23j5nrVD3E8gD4hEdK+h7J5u04Dcb/rWvGSaez4HQModnGbZZ7n6denIFSMq3ix7UyEXWjjZx6J1lwW9XT2TT3ZeZzG6mHfikYPCg78+V6NtW6kuVmPWGSWMdNRQLsh7pYC45CFZ3epvzwAvHFLOZWlsyKwMNM4vOKMdzLvJSuiXf9Zv0upOUD0lig6LIA32h7sI3CQcUlq/d2ad6J8HYSIAZxE1w+Psv8lwqBzrOS52pLWmj7yn2o0EMkUI7ol9rGf0Ym4+rv1Gu/xp1hz4Dv8Cso4ZP90wqbce+wEwN22Tx8WClqkJuBcIaG14bJfiz2Yo1IkiiK9lAlwH6o1g5gBMMQP66JUzNuB87cU+SrB3CpND1XZRlDbCm9VUqXDgo3zNJdheqCdFDxLWn0qXYo4anDzAutHspbqsJLJ59zcb4AHoJOb8qaner5wlY7wJR0awMEChjhsR5Fv3jOH8jyaxfMtI+jSOeyFgta0ylvfVQQa0VDLvMTyorkZZLRYGX2RPlz3TIWd/on7sHmPRxkHO3ZQEUKT2uV8SM8iZ4X1bZ2OeGJRx3oLauTL0x3xX0c7e1xxnaJPganxsvxyOImDUxQhyc4ZbHjcQqO4Cnlx+mIu1dj07QrPGZhY4tOxn9n5GSckldptohvpIxFO/qOvp/dizZcJld9dPbgaQ9XUZ5cVB0uDZDNNfi57sCkOmJnhvqFa1R/H2U+m9CeGuFYS5o0B7CjvCPguZAEPT7zKSfZwp6QRcV/HDrmcVWCsbMvX67/m2c6MIrgDFb42Gpi4IQOOOllUue+2SDzcrHjptKLhOQvvpDpX/7lMg6QmVw1tDgXMHq9qJ4VsmCE3k1fmodsLxS8lOXf1S5s9gr0ZSBeqVJ/ZR+b0Pv4LgEuav58iQZEHqAAGVoa3r3ctpBg2+G0YgsKWMkrjwnZKXfCvtpB1cUlGgkLvZjlkmxCEXfMTBAIf5ITtBWbClDhihEpu61MD0b69wCNe0G0ACHFoh7Ey0g1BNxvu12vvhP+LM6YUr30xILnrX7WhCEDGXJay0GoEKXkj7A5fRt2fw/cT+W+89JA8wJ5u7EMZ+kDkxPvTH+8VElAzNdRuvrY0BF0qXdHMTKAS+Kz4bSVtRlHfAzA2MbvN39hv4C2YVYScEVojuw/hY/EHK9ZKdUOzHAKTpyjRg844Okb6dRFvg2Ph36fImox96pSIZPCdRJIo8U0GbYBJTKQP4EFlVx075AHLGuqbBZr7ngO+w5Mm7yWXBrZmkX6AgNiomk6wp+mzrKn5TFfOrX+VX2FFAeJSaPWC4cubdaPP6BMp44bkJVgcibZTKE0OCkLqI379ydH2nmcUkusyXyrTsQZkri04fqvyd3Sj5pk/oSVnb1DiJjeOKhxticv+lNV7YjpR+E222yHGwDIBLWafgzpZkitzSqAWLKrjDCkw4xXiWnrE3nf3476wnIxD49+31MRypHhYURbx7KBk5nP+dV1v5fkqaOdjC4/DP5K4LVWXB4cxChDeSzi2/DMlI+n807a/kxt2jWbMHf8L2VFEIcVLl8dWBppMAu6tw+7u+jeGWli4YTJU7ZqE1K1bb1gwdLkvc3/pd8/vnxfdqczWD6U+fCun9l6zsFB0aqXK87zmRVB9m0oKSxVI7L6146VOhsjxJfAgXTkLzAuktKg==','2025-10-22');
/*!40000 ALTER TABLE `quan_ly_thoi_gian` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thong_tin_goi`
--

DROP TABLE IF EXISTS `thong_tin_goi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thong_tin_goi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `mo_ta` text COLLATE utf8mb4_general_ci,
  `gia` decimal(15,2) NOT NULL,
  `loai_goi` enum('TRA_PHI','MIEN_PHI') COLLATE utf8mb4_general_ci NOT NULL,
  `thoi_han_thang` int NOT NULL DEFAULT '1',
  `so_thiet_bi` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thong_tin_goi`
--

LOCK TABLES `thong_tin_goi` WRITE;
/*!40000 ALTER TABLE `thong_tin_goi` DISABLE KEYS */;
INSERT INTO `thong_tin_goi` VALUES (2,'Gói 2 thiết bị','Quý phụ huynh và các bạn nhỏ có thể trải nghiệm đa dạng các dịch vụ VIP',950000.00,'TRA_PHI',12,2),(3,'Gói 1 thiết bị','Gói dành cho 1 thiết bị',500000.00,'TRA_PHI',12,1),(4,'Gói 3 thiết bị','Gói dành cho 3 thiết bị',1350000.00,'TRA_PHI',12,3),(6,'Gói dùng thử','Gói dành cho 1 thiết bị để trải nghiệm thử các tính năng premium',0.00,'MIEN_PHI',1,1),(8,'Gói tiêu chuẩn','Bản tiêu chuẩn dành cho mọi thiết bị với những chức năng cơ bản.',0.00,'MIEN_PHI',1,1);
/*!40000 ALTER TABLE `thong_tin_goi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trang_web_bi_cam`
--

DROP TABLE IF EXISTS `trang_web_bi_cam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trang_web_bi_cam` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_trang_web` varchar(3000) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=520 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trang_web_bi_cam`
--

LOCK TABLES `trang_web_bi_cam` WRITE;
/*!40000 ALTER TABLE `trang_web_bi_cam` DISABLE KEYS */;
/*!40000 ALTER TABLE `trang_web_bi_cam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tre_em`
--

DROP TABLE IF EXISTS `tre_em`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tre_em` (
  `ma_tre_em` int NOT NULL AUTO_INCREMENT,
  `ma_phu_huynh` int NOT NULL,
  `ten_tre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `lop` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ngay_sinh` date DEFAULT NULL,
  `truong` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gioi_tinh` enum('Nam','Nữ','Khác') COLLATE utf8mb4_general_ci DEFAULT 'Khác',
  `email_tre_em` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ma_tre_em`),
  KEY `fk_treem_phuhuynh` (`ma_phu_huynh`),
  CONSTRAINT `fk_treem_phuhuynh` FOREIGN KEY (`ma_phu_huynh`) REFERENCES `phu_huynh` (`ma_phu_huynh`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tre_em`
--

LOCK TABLES `tre_em` WRITE;
/*!40000 ALTER TABLE `tre_em` DISABLE KEYS */;
INSERT INTO `tre_em` VALUES (41,18,'1','2','2015-01-01','hh','Nam',''),(42,19,'Tuan Tu','10','2010-05-25','cva','Nam',''),(44,21,'Trần Hồng Hội','5','2015-04-08','c1 Lâm Thao','Nam',''),(45,25,'ngọc mai','10','2004-01-01','Bổ túc','Nam',''),(46,25,'kiều','2','2015-01-06','mầm non','Nữ','bdiskd');
/*!40000 ALTER TABLE `tre_em` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `v_goi_va_noi_dung`
--

DROP TABLE IF EXISTS `v_goi_va_noi_dung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `v_goi_va_noi_dung` (
  `goi_id` int DEFAULT NULL,
  `ten_goi` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mo_ta_goi` text COLLATE utf8mb4_general_ci,
  `gia` decimal(15,2) DEFAULT NULL,
  `loai_goi` enum('TRA_PHI','MIEN_PHI') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `thoi_han_thang` int DEFAULT NULL,
  `noi_dung_id` int DEFAULT NULL,
  `noi_dung` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `v_goi_va_noi_dung`
--

LOCK TABLES `v_goi_va_noi_dung` WRITE;
/*!40000 ALTER TABLE `v_goi_va_noi_dung` DISABLE KEYS */;
/*!40000 ALTER TABLE `v_goi_va_noi_dung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `web_bi_chan`
--

DROP TABLE IF EXISTS `web_bi_chan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `web_bi_chan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_thiet_bi` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `nguoi_dung_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ten_trang_web` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `ngay_cap_nhat` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `web_bi_chan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_bi_chan`
--

LOCK TABLES `web_bi_chan` WRITE;
/*!40000 ALTER TABLE `web_bi_chan` DISABLE KEYS */;
INSERT INTO `web_bi_chan` VALUES (16,'BFEBFBFF000A0653611666','93a0a6e4-86fc-4492-9b6b-71a3087ca7c2','[]','2025-10-22'),(17,'000000000000000056ZDOJ','e1d24f55-b581-4f20-93e6-9998eab9f875','[{\"DuongDanPhanMem\":\"tuhoc\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"tuhoc\"},{\"DuongDanPhanMem\":\"moon\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"moon\"},{\"DuongDanPhanMem\":\"kenhtuyensinh\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"kenhtuyensinh\"},{\"DuongDanPhanMem\":\"hoc24\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"hoc24\"},{\"DuongDanPhanMem\":\"loigiaihay\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"loigiaihay\"},{\"DuongDanPhanMem\":\"giaibaitap\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"giaibaitap\"},{\"DuongDanPhanMem\":\"baitap123\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"baitap123\"},{\"DuongDanPhanMem\":\"azota\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"azota\"},{\"DuongDanPhanMem\":\"shub\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"shub\"},{\"DuongDanPhanMem\":\"vietjack\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"vietjack\"},{\"DuongDanPhanMem\":\"giaovienvietnam\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"giaovienvietnam\"},{\"DuongDanPhanMem\":\"tailieu\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"tailieu\"},{\"DuongDanPhanMem\":\"hoctap\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"hoctap\"},{\"DuongDanPhanMem\":\"toanhoc\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"toanhoc\"},{\"DuongDanPhanMem\":\"vanhoc\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"vanhoc\"},{\"DuongDanPhanMem\":\"lyhoc\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"lyhoc\"},{\"DuongDanPhanMem\":\"hoahoc\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"hoahoc\"},{\"DuongDanPhanMem\":\"lichsu\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"lichsu\"},{\"DuongDanPhanMem\":\"diali\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"diali\"},{\"DuongDanPhanMem\":\"tienganh\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"tienganh\"},{\"DuongDanPhanMem\":\"english\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"english\"},{\"DuongDanPhanMem\":\"sinhhoc\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"sinhhoc\"},{\"DuongDanPhanMem\":\"google\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"google\"}]','2025-10-22');
/*!40000 ALTER TABLE `web_bi_chan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `web_cho_phep`
--

DROP TABLE IF EXISTS `web_cho_phep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `web_cho_phep` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_thiet_bi` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `nguoi_dung_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ten_trang_web` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `ngay_cap_nhat` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `web_cho_phep_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_cho_phep`
--

LOCK TABLES `web_cho_phep` WRITE;
/*!40000 ALTER TABLE `web_cho_phep` DISABLE KEYS */;
INSERT INTO `web_cho_phep` VALUES (12,'BFEBFBFF000A0653611666','93a0a6e4-86fc-4492-9b6b-71a3087ca7c2','[]','2025-10-22');
/*!40000 ALTER TABLE `web_cho_phep` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yeu_cau_truy_cap`
--

DROP TABLE IF EXISTS `yeu_cau_truy_cap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yeu_cau_truy_cap` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_thiet_bi` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nguoi_dung_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `loai` text COLLATE utf8mb4_general_ci NOT NULL,
  `ten_chuong_trinh` text COLLATE utf8mb4_general_ci NOT NULL,
  `thoi_gian_gui` datetime DEFAULT CURRENT_TIMESTAMP,
  `duoc_phe_duyet` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `yeu_cau_truy_cap_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=243 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yeu_cau_truy_cap`
--

LOCK TABLES `yeu_cau_truy_cap` WRITE;
/*!40000 ALTER TABLE `yeu_cau_truy_cap` DISABLE KEYS */;
INSERT INTO `yeu_cau_truy_cap` VALUES (236,'000000000000000056ZDOJ','e1d24f55-b581-4f20-93e6-9998eab9f875','web','CHICHI','2025-10-22 01:27:17',NULL),(237,'000000000000000056ZDOJ','e1d24f55-b581-4f20-93e6-9998eab9f875','app','C:\\Program Files\\WindowsApps\\Microsoft.GetHelp_10.2409.32612.0_arm64__8wekyb3d8bbwe\\GetHelp.exe','2025-10-22 01:37:08',NULL),(238,'000000000000000056ZDOJ','e1d24f55-b581-4f20-93e6-9998eab9f875','app','C:\\Program Files\\WindowsApps\\Microsoft.OutlookForWindows_1.2025.930.100_arm64__8wekyb3d8bbwe\\olkMcpServer.exe','2025-10-22 01:42:53',NULL),(239,'000000000000000056ZDOJ','e1d24f55-b581-4f20-93e6-9998eab9f875','app','C:\\Program Files\\WindowsApps\\Microsoft.WindowsNotepad_11.2507.26.0_arm64__8wekyb3d8bbwe\\Notepad\\Notepad.exe','2025-10-22 01:43:49',NULL),(240,'000000000000000056ZDOJ','e1d24f55-b581-4f20-93e6-9998eab9f875','app','C:\\Program Files\\WindowsApps\\Microsoft.ScreenSketch_11.2508.29.0_arm64__8wekyb3d8bbwe\\SnippingTool\\SnippingTool.exe','2025-10-22 01:44:43',NULL),(241,'000000000000000056ZDOJ','e1d24f55-b581-4f20-93e6-9998eab9f875','app','C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\141.0.3537.92\\msedge.exe','2025-10-22 01:44:55',NULL);
/*!40000 ALTER TABLE `yeu_cau_truy_cap` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-22  9:18:27
