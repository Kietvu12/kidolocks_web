-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3309
-- Generation Time: Sep 22, 2025 at 04:17 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kidslock`
--

-- --------------------------------------------------------

--
-- Table structure for table `cai_dat_phan_mem`
--

CREATE TABLE `cai_dat_phan_mem` (
  `id` int(11) NOT NULL,
  `ma_thiet_bi` varchar(50) DEFAULT NULL,
  `nguoi_dung_id` varchar(50) NOT NULL,
  `bat_kiem_soat` tinyint(1) DEFAULT 0,
  `ngay_cap_nhat` datetime DEFAULT NULL,
  `khoang_thoi_gian_chan` int(11) DEFAULT 10,
  `che_do_chan_web` tinyint(1) DEFAULT 0,
  `hien_thong_bao_app` tinyint(1) DEFAULT 0,
  `hien_thong_bao_web` tinyint(1) DEFAULT 0,
  `khoi_dong_cung_windows` tinyint(1) DEFAULT 1,
  `chan_task_manager` tinyint(1) DEFAULT 1,
  `bat_chup_man_hinh` tinyint(1) DEFAULT 0,
  `khoang_thoi_gian_chup_man_hinh` int(11) DEFAULT 10000,
  `duong_dan_luu_anh_chup_man_hinh` text DEFAULT NULL,
  `so_ngay_cho_phep_luu_tru` int(11) DEFAULT 7
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cai_dat_phan_mem`
--

INSERT INTO `cai_dat_phan_mem` (`id`, `ma_thiet_bi`, `nguoi_dung_id`, `bat_kiem_soat`, `ngay_cap_nhat`, `khoang_thoi_gian_chan`, `che_do_chan_web`, `hien_thong_bao_app`, `hien_thong_bao_web`, `khoi_dong_cung_windows`, `chan_task_manager`, `bat_chup_man_hinh`, `khoang_thoi_gian_chup_man_hinh`, `duong_dan_luu_anh_chup_man_hinh`, `so_ngay_cho_phep_luu_tru`) VALUES
(106, 'BFEBFBFF000B06A2YX06SB9V', '31c1edc5-a1cf-4687-8e95-629f1717dd21', 1, '2025-09-20 09:49:28', 2, 1, 1, 1, 1, 1, 1, 30, 'C:\\Users\\Admin\\AppData\\Local\\Temp\\1ec05f50-ad18-4bc4-afcd-396b8c0ffdf0', 30),
(107, 'BFEBFBFF000A0653611666', 'caf74c0d-d531-4cde-a557-d76479b1c5f7', 0, '2025-09-20 09:44:36', 10, 0, 1, 1, 1, 1, 1, 10000, 'C:\\Users\\rdsic\\AppData\\Local\\Temp\\caf74c0d-d531-4cde-a557-d76479b1c5f7', 7),
(109, 'BFEBFBFF000806C1MCN0CV07E346493', '33b57568-b090-4317-a0e3-fd1f2a86feeb', 0, '2025-09-20 16:49:47', 2, 1, 1, 1, 1, 1, 0, 2000, 'C:\\Users\\trant\\AppData\\Local\\Temp\\b5a93146-4e81-4321-9551-ad015e27d1f9', 7),
(110, '178BFBFF00810F81L7NRCV00C52927C', '6bb9051d-c125-40a3-9682-75168cf14bb1', 0, '2025-09-21 23:20:40', 2, 0, 1, 1, 1, 1, 1, 300000, 'C:\\Users\\ADMIN\\AppData\\Local\\Temp\\6bb9051d-c125-40a3-9682-75168cf14bb1', 7);

-- --------------------------------------------------------

--
-- Table structure for table `canh_bao_ai`
--

CREATE TABLE `canh_bao_ai` (
  `id` int(11) NOT NULL,
  `ma_thiet_bi` varchar(50) DEFAULT NULL,
  `nguoi_dung_id` varchar(50) NOT NULL,
  `thoi_gian` datetime DEFAULT current_timestamp(),
  `loai_canh_bao` text NOT NULL,
  `chi_tiet` text DEFAULT NULL,
  `da_xu_ly` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `device_tokens`
--

CREATE TABLE `device_tokens` (
  `id` int(11) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `token` varchar(255) NOT NULL,
  `platform` enum('android','ios') NOT NULL,
  `last_seen_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `device_tokens`
--

INSERT INTO `device_tokens` (`id`, `user_id`, `token`, `platform`, `last_seen_at`, `is_active`) VALUES
(47, 'BFEBFBFF000806C1MCN0CV07E346493', 'c4PVPxz3ROu90oBCtOl7k3:APA91bE6sZg0FljTOuCmv_Z7o4p9A0JWAFyA_J2L6Jq6KdkufRB4N0dzndoFvwViNPEdQd1px-L1rw3e7Ubmtt-1EGjSbhMO579Fn3g87kF6Hcp-kGTuy5U', 'android', '2025-09-19 15:47:35', 1),
(49, 'BFEBFBFF000B06A2YX06SB9V', 'fW0J036PRWC9KisS_O_KNf:APA91bHaz61FFpO6-AV7H3Cb4Gtr7_65q_rQQDqkoX4bARZhK-4obyE6akGMF7J-389DWHww2xtcJKcm3hgGVWzwM8Fxuc4_CfjlX_djeA1ak3Qpg3eP9Zc', 'android', '2025-09-19 16:14:41', 1),
(52, 'BFEBFBFF000A0653611666', 'cMB4Z3V4SCWKO-d8SFQu6U:APA91bE2l3SQIRQi3SK9TWVHwQFophVok4SV4p5yatHE_JYaODS7moX7CIjSA_ne5MWupl-8cEy5ZThfrbZhChIfxi2D_886NOxayvDB9TE45ax9yettFvM', 'android', '2025-09-20 02:22:14', 1),
(54, 'BFEBFBFF000806C1MCN0CV07E346493', 'cyuCdGNzQ8aJ92jJplN0sz:APA91bGNlwjEIWhoSo-oITgIRMPwiJfvhTm5v2Eekh_be2vTgKYOJ6W0YWGGpWBHWCg_fZz0LJShyMulB2gLPN-CBdFCrlKuJpMyiO2E1ziLAoBL-puS6D0', 'android', '2025-09-20 08:59:24', 1),
(55, '178BFBFF00810F81L7NRCV00C52927C', 'fW0J036PRWC9KisS_O_KNf:APA91bHaz61FFpO6-AV7H3Cb4Gtr7_65q_rQQDqkoX4bARZhK-4obyE6akGMF7J-389DWHww2xtcJKcm3hgGVWzwM8Fxuc4_CfjlX_djeA1ak3Qpg3eP9Zc', 'android', '2025-09-21 16:04:57', 1),
(56, '33b57568-b090-4317-a0e3-fd1f2a86feeb', 'cmSesn9rSLqnMMMNKBzgp_:APA91bEuwo1MUUsRhk0njEAP85tj6lXiS5P71QOrL7abjiDCAXOATPoRylr3I7njikJ4mDpe22UnXUsma5X2Y_Pn3PEQNM1mgpeUiZD_AeWRqsecXJ3XJ9s', 'android', '2025-09-22 02:17:37', 1);

-- --------------------------------------------------------

--
-- Table structure for table `goi_dich_vu`
--

CREATE TABLE `goi_dich_vu` (
  `id` int(11) NOT NULL,
  `ma_thiet_bi` varchar(50) DEFAULT NULL,
  `nguoi_dung_id` varchar(50) NOT NULL,
  `ngay_bat_dau` datetime NOT NULL,
  `ngay_ket_thuc` datetime DEFAULT NULL,
  `gia` decimal(10,2) DEFAULT NULL,
  `trang_thai` enum('DANG_HOAT_DONG','HET_HAN','HUY') NOT NULL,
  `phuong_thuc_thanh_toan` varchar(50) DEFAULT NULL,
  `ma_giao_dich` varchar(100) DEFAULT NULL,
  `thong_tin_goi_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `goi_dich_vu`
--

INSERT INTO `goi_dich_vu` (`id`, `ma_thiet_bi`, `nguoi_dung_id`, `ngay_bat_dau`, `ngay_ket_thuc`, `gia`, `trang_thai`, `phuong_thuc_thanh_toan`, `ma_giao_dich`, `thong_tin_goi_id`) VALUES
(23, 'BFEBFBFF000A0653611666', 'caf74c0d-d531-4cde-a557-d76479b1c5f7', '2025-09-20 02:36:27', '2026-09-20 02:36:27', '2150000.00', 'HUY', NULL, NULL, 5),
(24, 'BFEBFBFF000B06A2YX06SB9V', '31c1edc5-a1cf-4687-8e95-629f1717dd21', '2025-09-20 03:55:45', '2026-09-20 03:55:45', '500000.00', 'DANG_HOAT_DONG', NULL, NULL, 1),
(25, 'BFEBFBFF000806C1MCN0CV07E346493', '33b57568-b090-4317-a0e3-fd1f2a86feeb', '2025-09-20 09:27:29', '2025-10-20 09:27:29', '0.00', 'DANG_HOAT_DONG', NULL, NULL, 6),
(26, 'BFEBFBFF000A0653611666', 'caf74c0d-d531-4cde-a557-d76479b1c5f7', '2025-09-20 09:28:02', '2026-09-20 09:28:02', '2150000.00', 'HUY', NULL, NULL, 5),
(27, 'BFEBFBFF000A0653611666', 'caf74c0d-d531-4cde-a557-d76479b1c5f7', '2025-09-20 09:28:18', '2025-10-20 09:28:18', '0.00', 'HUY', NULL, NULL, 6),
(28, 'BFEBFBFF000A0653611666', 'caf74c0d-d531-4cde-a557-d76479b1c5f7', '2025-09-20 09:28:25', '2026-09-20 09:28:25', '2150000.00', 'DANG_HOAT_DONG', NULL, NULL, 5);

-- --------------------------------------------------------

--
-- Table structure for table `lich_su_thanh_toan`
--

CREATE TABLE `lich_su_thanh_toan` (
  `id` int(11) NOT NULL,
  `ma_thiet_bi` varchar(50) DEFAULT NULL,
  `nguoi_dung_id` varchar(50) NOT NULL,
  `thoi_gian` datetime NOT NULL,
  `so_tien` decimal(10,2) NOT NULL,
  `phuong_thuc` varchar(50) NOT NULL,
  `ma_giao_dich` varchar(100) DEFAULT NULL,
  `trang_thai` enum('thanh_cong','that_bai') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `mau_trang_web_bi_chan`
--

CREATE TABLE `mau_trang_web_bi_chan` (
  `id` int(11) NOT NULL,
  `ten_trang_web` varchar(3000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mau_trang_web_bi_chan`
--

INSERT INTO `mau_trang_web_bi_chan` (`id`, `ten_trang_web`) VALUES
(1, 'facebook'),
(2, 'messenger'),
(3, 'instagram'),
(4, 'tiktok'),
(5, 'zalo'),
(6, 'twitter'),
(7, 'snapchat'),
(8, 'pinterest'),
(9, 'phimmoi'),
(10, 'phimbathu'),
(11, 'anime47'),
(12, 'hdviet'),
(13, 'bilutv'),
(14, 'phimmoizz'),
(15, 'roblox'),
(16, 'minecraft'),
(17, 'garena'),
(18, 'lienquan'),
(19, 'freefire'),
(20, 'pubg'),
(21, 'steam'),
(22, 'epicgames'),
(23, 'fun88'),
(24, 'm88'),
(25, 'bong88'),
(26, 'fabet'),
(27, 'w88'),
(28, 'sv388'),
(29, 'kubet'),
(30, 'baccarat'),
(31, 'xoso'),
(32, 'casino'),
(33, 'crack'),
(34, 'serial'),
(35, 'keygen'),
(36, 'hackgame'),
(37, 'modapk'),
(38, 'omegle'),
(39, 'chatroulette'),
(40, 'discord'),
(41, 'telegram'),
(42, 'voz'),
(43, 'chanvn'),
(44, 'reddit'),
(45, '4chan');

-- --------------------------------------------------------

--
-- Table structure for table `mau_trang_web_cho_phep`
--

CREATE TABLE `mau_trang_web_cho_phep` (
  `id` int(11) NOT NULL,
  `ten_trang_web` varchar(3000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mau_trang_web_cho_phep`
--

INSERT INTO `mau_trang_web_cho_phep` (`id`, `ten_trang_web`) VALUES
(1, 'olm'),
(2, 'violet'),
(3, 'vndoc'),
(4, 'hocmai'),
(5, 'tuhoc'),
(6, 'moon'),
(7, 'kenhtuyensinh'),
(8, 'hoc24'),
(9, 'loigiaihay'),
(10, 'giaibaitap'),
(11, 'baitap123'),
(12, 'azota'),
(13, 'shub'),
(14, 'vietjack'),
(15, 'giaovienvietnam'),
(16, 'tailieu'),
(17, 'hoctap'),
(18, 'giaibaitap'),
(19, 'toanhoc'),
(20, 'vanhoc'),
(21, 'lyhoc'),
(22, 'hoahoc'),
(23, 'lichsu'),
(24, 'diali'),
(25, 'tienganh'),
(26, 'english'),
(27, 'sinhhoc'),
(28, 'google');

-- --------------------------------------------------------

--
-- Table structure for table `nguoi_dung`
--

CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` varchar(50) NOT NULL,
  `ma_thiet_bi` varchar(100) DEFAULT NULL,
  `ma_tre_em` int(11) DEFAULT NULL,
  `ngay_tao` datetime DEFAULT current_timestamp(),
  `loai_thiet_bi` varchar(30) DEFAULT NULL,
  `ten_thiet_bi` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nguoi_dung`
--

INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `ma_thiet_bi`, `ma_tre_em`, `ngay_tao`, `loai_thiet_bi`, `ten_thiet_bi`) VALUES
('31c1edc5-a1cf-4687-8e95-629f1717dd21', 'BFEBFBFF000B06A2YX06SB9V', 31, '2025-09-19 23:13:57', 'Laptop', 'Anhnt'),
('33b57568-b090-4317-a0e3-fd1f2a86feeb', 'BFEBFBFF000806C1MCN0CV07E346493', 30, '2025-09-20 15:59:21', 'Laptop', 'trant'),
('6bb9051d-c125-40a3-9682-75168cf14bb1', '178BFBFF00810F81L7NRCV00C52927C', 31, '2025-09-21 23:12:28', 'Laptop', 'Máy ở nhà'),
('caf74c0d-d531-4cde-a557-d76479b1c5f7', 'BFEBFBFF000A0653611666', 33, '2025-09-20 09:21:18', 'Laptop', 'rdsic');

-- --------------------------------------------------------

--
-- Table structure for table `noi_dung_goi`
--

CREATE TABLE `noi_dung_goi` (
  `id` int(11) NOT NULL,
  `thong_tin_goi_id` int(11) NOT NULL COMMENT 'ID của gói dịch vụ (liên kết với thong_tin_goi)',
  `noi_dung` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nội dung/tính năng của gói'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng quản lý nội dung của các gói dịch vụ';

--
-- Dumping data for table `noi_dung_goi`
--

INSERT INTO `noi_dung_goi` (`id`, `thong_tin_goi_id`, `noi_dung`) VALUES
(1, 1, 'Chặn website không phù hợp với trẻ em'),
(2, 1, 'Tạo danh sách website được phép truy cập'),
(3, 1, 'Kiểm soát và chặn các ứng dụng trên máy tính'),
(4, 1, 'Lập lịch sử dụng máy tính theo ngày/tuần'),
(5, 1, 'Chụp màn hình tự động để giám sát'),
(6, 1, 'Cảnh báo thông minh từ AI'),
(7, 1, 'Thông báo real-time về hoạt động của trẻ'),
(8, 1, 'Báo cáo chi tiết hoạt động sử dụng máy tính'),
(9, 1, 'Sao lưu dữ liệu tự động'),
(10, 1, 'Hỗ trợ kỹ thuật 24/7'),
(11, 2, 'Tất cả tính năng của gói 1 năm'),
(12, 2, 'Chặn website theo từ khóa tùy chỉnh'),
(13, 2, 'Kiểm soát và giới hạn thời gian chơi game'),
(14, 2, 'Nghỉ giải lao tự động sau thời gian sử dụng'),
(15, 2, 'Quay video màn hình hoạt động'),
(16, 2, 'Phân tích hành vi sử dụng máy tính bằng AI'),
(17, 2, 'Thông báo qua tin nhắn SMS'),
(18, 2, 'Xuất báo cáo ra file Excel'),
(19, 2, 'Khôi phục dữ liệu từ bản sao lưu'),
(20, 2, 'Tùy chỉnh giao diện phần mềm'),
(21, 2, 'Tạo quy tắc kiểm soát tùy chỉnh'),
(22, 2, 'Hỗ trợ kỹ thuật ưu tiên'),
(23, 2, 'Hỗ trợ trực tiếp qua video call');

-- --------------------------------------------------------

--
-- Table structure for table `phan_mem_cho_phep`
--

CREATE TABLE `phan_mem_cho_phep` (
  `id` int(11) NOT NULL,
  `ma_thiet_bi` varchar(50) NOT NULL,
  `nguoi_dung_id` varchar(50) NOT NULL,
  `ten_phan_mem` mediumtext NOT NULL,
  `ngay_cap_nhat` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `phan_mem_cho_phep`
--

INSERT INTO `phan_mem_cho_phep` (`id`, `ma_thiet_bi`, `nguoi_dung_id`, `ten_phan_mem`, `ngay_cap_nhat`) VALUES
(19, 'BFEBFBFF000B06A2YX06SB9V', '31c1edc5-a1cf-4687-8e95-629f1717dd21', '[{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Winstep\\\\Nexus.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false},{\"DuongDanPhanMem\":\"C:\\\\Users\\\\Admin\\\\AppData\\\\Local\\\\Programs\\\\Zalo\\\\Zalo-25.8.3\\\\Zalo.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\UltraViewer\\\\UltraViewer_Desktop.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\IDE\\\\devenv.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\system32\\\\mstsc.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\SystemApps\\\\MicrosoftWindows.Client.CBS_cw5n1h2txyewy\\\\TextInputHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false},{\"DuongDanPhanMem\":\"D:\\\\3.KidoLock\\\\Code\\\\KidoLock\\\\Restrict software openings\\\\bin\\\\Debug\\\\KidsLock.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Foxit Software\\\\Foxit PDF Reader\\\\FoxitPDFReader.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WindowsApps\\\\MSTeams_25241.203.3947.4411_x64__8wekyb3d8bbwe\\\\ms-teams.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false},{\"DuongDanPhanMem\":\"C:\\\\PROGRA~1\\\\MIF5BA~1\\\\Office15\\\\VISIO.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Google\\\\Drive File Stream\\\\113.0.1.0\\\\GoogleDriveFS.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false},{\"DuongDanPhanMem\":\"C:\\\\Users\\\\Admin\\\\AppData\\\\Local\\\\Programs\\\\Zalo\\\\Zalo-25.8.3\\\\plugins\\\\capture\\\\ZaloCall.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false},{\"DuongDanPhanMem\":\"C:\\\\EVKey\\\\EVKey64.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false},{\"DuongDanPhanMem\":\"C:\\\\Users\\\\Admin\\\\AppData\\\\Local\\\\Programs\\\\Zalo\\\\Zalo-25.8.3\\\\plugins\\\\capture\\\\ZaloCap.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WindowsApps\\\\45273LiamForsyth.PawsforTrello_2.15.13.0_x64__7pb5ddty8z1pa\\\\app\\\\Trello.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Notepad++\\\\notepad++.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WindowsApps\\\\Microsoft.OutlookForWindows_1.2025.829.200_x64__8wekyb3d8bbwe\\\\olk.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false}]', '2025-09-20'),
(20, 'BFEBFBFF000A0653611666', 'caf74c0d-d531-4cde-a557-d76479b1c5f7', '[{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\IDE\\\\devenv.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\IDE\\\\devenv.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\ImmersiveControlPanel\\\\SystemSettings.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Windows\\\\ImmersiveControlPanel\\\\SystemSettings.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Users\\\\rdsic\\\\AppData\\\\Local\\\\GitHubDesktop\\\\app-3.5.2\\\\GitHubDesktop.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Users\\\\rdsic\\\\AppData\\\\Local\\\\GitHubDesktop\\\\app-3.5.2\\\\GitHubDesktop.exe\"},{\"DuongDanPhanMem\":\"C:\\\\WINDOWS\\\\system32\\\\ApplicationFrameHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\WINDOWS\\\\system32\\\\ApplicationFrameHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe\"}]', '2025-09-20'),
(21, '178BFBFF00810F81L7NRCV00C52927C', '6bb9051d-c125-40a3-9682-75168cf14bb1', '[{\"DuongDanPhanMem\":\"C:\\\\Users\\\\ADMIN\\\\AppData\\\\Local\\\\Programs\\\\Desktop Dimmer\\\\Desktop Dimmer.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Users\\\\ADMIN\\\\AppData\\\\Local\\\\Programs\\\\Desktop Dimmer\\\\Desktop Dimmer.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WindowsApps\\\\Microsoft.WindowsCalculator_11.2502.2.0_x64__8wekyb3d8bbwe\\\\CalculatorApp.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\WindowsApps\\\\Microsoft.WindowsCalculator_11.2502.2.0_x64__8wekyb3d8bbwe\\\\CalculatorApp.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\SystemApps\\\\MicrosoftWindows.Client.CBS_cw5n1h2txyewy\\\\TextInputHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Windows\\\\SystemApps\\\\MicrosoftWindows.Client.CBS_cw5n1h2txyewy\\\\TextInputHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Users\\\\ADMIN\\\\AppData\\\\Local\\\\GitHubDesktop\\\\app-3.5.2\\\\GitHubDesktop.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Users\\\\ADMIN\\\\AppData\\\\Local\\\\GitHubDesktop\\\\app-3.5.2\\\\GitHubDesktop.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\system32\\\\ApplicationFrameHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Windows\\\\system32\\\\ApplicationFrameHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\IDE\\\\devenv.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\IDE\\\\devenv.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\PTA\\\\TA-Note\\\\PhanMemNhacNhoCongViec.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\PTA\\\\TA-Note\\\\PhanMemNhacNhoCongViec.exe\"},{\"DuongDanPhanMem\":\"D:\\\\30.KidoLock\\\\Code\\\\KidoLock\\\\Restrict software openings\\\\bin\\\\Debug\\\\KidsLock.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"D:\\\\30.KidoLock\\\\Code\\\\KidoLock\\\\Restrict software openings\\\\bin\\\\Debug\\\\KidsLock.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Winstep\\\\Nexus.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Winstep\\\\Nexus.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\ImmersiveControlPanel\\\\SystemSettings.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Windows\\\\ImmersiveControlPanel\\\\SystemSettings.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\UltraViewer\\\\UltraViewer_Desktop.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\UltraViewer\\\\UltraViewer_Desktop.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\system32\\\\mstsc.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Windows\\\\system32\\\\mstsc.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Winstep\\\\wsupdate.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Winstep\\\\wsupdate.exe\"}]', '2025-09-21');

-- --------------------------------------------------------

--
-- Table structure for table `phan_mem_tren_may_tinh`
--

CREATE TABLE `phan_mem_tren_may_tinh` (
  `id` int(11) NOT NULL,
  `nguoi_dung_id` varchar(50) NOT NULL,
  `ma_thiet_bi` varchar(50) NOT NULL,
  `ten_phan_mem` text NOT NULL,
  `ngay_cap_nhat` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `phan_mem_tren_may_tinh`
--

INSERT INTO `phan_mem_tren_may_tinh` (`id`, `nguoi_dung_id`, `ma_thiet_bi`, `ten_phan_mem`, `ngay_cap_nhat`) VALUES
(35, '31c1edc5-a1cf-4687-8e95-629f1717dd21', 'BFEBFBFF000B06A2YX06SB9V', '[{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Microsoft Visual Studio 14.0\\\\Common7\\\\IDE\\\\Blend.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Microsoft Visual Studio 14.0\\\\Common7\\\\IDE\\\\Blend.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Microsoft Visual Studio 14.0\\\\Common7\\\\IDE\\\\devenv.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Microsoft Visual Studio 14.0\\\\Common7\\\\IDE\\\\devenv.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WindowsApps\\\\Microsoft.GetHelp_10.2409.22951.0_x64__8wekyb3d8bbwe\\\\GetHelp.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\WindowsApps\\\\Microsoft.GetHelp_10.2409.22951.0_x64__8wekyb3d8bbwe\\\\GetHelp.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WindowsApps\\\\PythonSoftwareFoundation.Python.3.13_3.13.2032.0_x64__qbz5n2kfra8p0\\\\idle3.13.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\WindowsApps\\\\PythonSoftwareFoundation.Python.3.13_3.13.2032.0_x64__qbz5n2kfra8p0\\\\idle3.13.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Internet Explorer\\\\IEDIAGCMD.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Internet Explorer\\\\IEDIAGCMD.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Internet Explorer\\\\IEXPLORE.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Internet Explorer\\\\IEXPLORE.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Java\\\\jre1.8.0_331\\\\bin\\\\javaws.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Java\\\\jre1.8.0_331\\\\bin\\\\javaws.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\System32\\\\licensemanagershellext.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Windows\\\\System32\\\\licensemanagershellext.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Common Files\\\\Microsoft Shared\\\\Ink\\\\mip.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Common Files\\\\Microsoft Shared\\\\Ink\\\\mip.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Windows Media Player\\\\wmplayer.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Windows Media Player\\\\wmplayer.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WindowsApps\\\\MSTeams_25241.203.3947.4411_x64__8wekyb3d8bbwe\\\\ms-teamsupdate.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\WindowsApps\\\\MSTeams_25241.203.3947.4411_x64__8wekyb3d8bbwe\\\\ms-teamsupdate.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Common Files\\\\Microsoft Shared\\\\OFFICE15\\\\MSOXMLED.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Common Files\\\\Microsoft Shared\\\\OFFICE15\\\\MSOXMLED.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WindowsApps\\\\Microsoft.OutlookForWindows_1.2025.829.200_x64__8wekyb3d8bbwe\\\\olkMcpServer.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\WindowsApps\\\\Microsoft.OutlookForWindows_1.2025.829.200_x64__8wekyb3d8bbwe\\\\olkMcpServer.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\System32\\\\mspaint.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Windows\\\\System32\\\\mspaint.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WindowsApps\\\\PythonSoftwareFoundation.Python.3.13_3.13.2032.0_x64__qbz5n2kfra8p0\\\\pip3.13.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\WindowsApps\\\\PythonSoftwareFoundation.Python.3.13_3.13.2032.0_x64__qbz5n2kfra8p0\\\\pip3.13.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\system32\\\\WindowsPowerShell\\\\v1.0\\\\PowerShell.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Windows\\\\system32\\\\WindowsPowerShell\\\\v1.0\\\\PowerShell.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WindowsApps\\\\PythonSoftwareFoundation.Python.3.13_3.13.2032.0_x64__qbz5n2kfra8p0\\\\python3.13.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\WindowsApps\\\\PythonSoftwareFoundation.Python.3.13_3.13.2032.0_x64__qbz5n2kfra8p0\\\\python3.13.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WindowsApps\\\\PythonSoftwareFoundation.Python.3.13_3.13.2032.0_x64__qbz5n2kfra8p0\\\\pythonw3.13.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\WindowsApps\\\\PythonSoftwareFoundation.Python.3.13_3.13.2032.0_x64__qbz5n2kfra8p0\\\\pythonw3.13.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Rapoo\\\\RapooOfficeDev\\\\RapooOfficeDev.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Rapoo\\\\RapooOfficeDev\\\\RapooOfficeDev.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WindowsApps\\\\Microsoft.SkypeApp_15.150.3125.0_x64__kzf8qxf38zg5c\\\\Skype\\\\Skype.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\WindowsApps\\\\Microsoft.SkypeApp_15.150.3125.0_x64__kzf8qxf38zg5c\\\\Skype\\\\Skype.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\SkypeSrv\\\\SKYPESERVER.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\SkypeSrv\\\\SKYPESERVER.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\system32\\\\SnippingTool.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Windows\\\\system32\\\\SnippingTool.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Common Files\\\\microsoft shared\\\\ink\\\\TabTip.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Common Files\\\\microsoft shared\\\\ink\\\\TabTip.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Windows Mail\\\\wab.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Windows Mail\\\\wab.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Windows Mail\\\\wabmig.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Windows Mail\\\\wabmig.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WindowsApps\\\\Microsoft.DesktopAppInstaller_1.26.430.0_x64__8wekyb3d8bbwe\\\\WindowsPackageManagerServer.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\WindowsApps\\\\Microsoft.DesktopAppInstaller_1.26.430.0_x64__8wekyb3d8bbwe\\\\WindowsPackageManagerServer.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WindowsApps\\\\Microsoft.DesktopAppInstaller_1.26.430.0_x64__8wekyb3d8bbwe\\\\winget.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\WindowsApps\\\\Microsoft.DesktopAppInstaller_1.26.430.0_x64__8wekyb3d8bbwe\\\\winget.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WinRAR\\\\WinRAR.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\WinRAR\\\\WinRAR.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Windows NT\\\\Accessories\\\\WORDPAD.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Windows NT\\\\Accessories\\\\WORDPAD.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logioptionsplus_appbroker.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logioptionsplus_appbroker.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Google\\\\Drive File Stream\\\\114.0.1.0\\\\GoogleDriveFS.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Google\\\\Drive File Stream\\\\114.0.1.0\\\\GoogleDriveFS.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\TbtP2pShortcutService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Windows\\\\TbtP2pShortcutService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Common Files\\\\Macrovision Shared\\\\FlexNet Publisher\\\\FNPLicensingService64.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Common Files\\\\Macrovision Shared\\\\FlexNet Publisher\\\\FNPLicensingService64.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.ThreadedWaitDialog.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.ThreadedWaitDialog.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Google\\\\Drive File Stream\\\\114.0.1.0\\\\crashpad_handler.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Google\\\\Drive File Stream\\\\114.0.1.0\\\\crashpad_handler.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Setup\\\\ui-launcher\\\\AdskAccessUIHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Setup\\\\ui-launcher\\\\AdskAccessUIHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Common Files\\\\Autodesk Shared\\\\AdskLicensing\\\\Current\\\\AdskLicensingService\\\\AdskLicensingService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Common Files\\\\Autodesk Shared\\\\AdskLicensing\\\\Current\\\\AdskLicensingService\\\\AdskLicensingService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Autodesk\\\\Autodesk AdSSO\\\\AdSSO.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Autodesk\\\\Autodesk AdSSO\\\\AdSSO.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Autodesk\\\\Genuine Service\\\\GenuineService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Autodesk\\\\Genuine Service\\\\GenuineService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\UltraViewer\\\\uv_x64.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\UltraViewer\\\\uv_x64.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WindowsApps\\\\AppUp.IntelArcSoftware_25.32.1758.0_x64__8j3eq9eme6ctt\\\\VFS\\\\ProgramFilesX64\\\\Intel\\\\Intel Graphics Software\\\\IntelGraphicsSoftware.Service.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\WindowsApps\\\\AppUp.IntelArcSoftware_25.32.1758.0_x64__8j3eq9eme6ctt\\\\VFS\\\\ProgramFilesX64\\\\Intel\\\\Intel Graphics Software\\\\IntelGraphicsSoftware.Service.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Bonjour\\\\mDNSResponder.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Bonjour\\\\mDNSResponder.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Autodesk\\\\AdskIdentityManager\\\\1.15.3.5\\\\AdskIdentityManager.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Autodesk\\\\AdskIdentityManager\\\\1.15.3.5\\\\AdskIdentityManager.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.SettingsHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.SettingsHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Common Files\\\\Java\\\\Java Update\\\\jucheck.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Common Files\\\\Java\\\\Java Update\\\\jucheck.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\MiniTool ShadowMaker\\\\SMMonitor.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\MiniTool ShadowMaker\\\\SMMonitor.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WindowsApps\\\\AppUp.IntelArcSoftware_25.32.1758.0_x64__8j3eq9eme6ctt\\\\VFS\\\\ProgramFilesX64\\\\Intel\\\\Intel Graphics Software\\\\PresentMonService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\WindowsApps\\\\AppUp.IntelArcSoftware_25.32.1758.0_x64__8j3eq9eme6ctt\\\\VFS\\\\ProgramFilesX64\\\\Intel\\\\Intel Graphics Software\\\\PresentMonService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.Dotnet.x64\\\\ServiceHub.DataWarehouseHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.Dotnet.x64\\\\ServiceHub.DataWarehouseHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.VSDetouredHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.VSDetouredHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\controller\\\\Microsoft.ServiceHub.Controller.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\controller\\\\Microsoft.ServiceHub.Controller.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\SystemApps\\\\Microsoft.Windows.StartMenuExperienceHost_cw5n1h2txyewy\\\\StartMenuExperienceHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Windows\\\\SystemApps\\\\Microsoft.Windows.StartMenuExperienceHost_cw5n1h2txyewy\\\\StartMenuExperienceHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.Dotnet.x64\\\\ServiceHub.IndexingService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.Dotnet.x64\\\\ServiceHub.IndexingService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.Host.AnyCPU.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.Host.AnyCPU.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.TestWindowStoreHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.TestWindowStoreHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Common Files\\\\Java\\\\Java Update\\\\jusched.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Common Files\\\\Java\\\\Java Update\\\\jusched.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.Dotnet.x64\\\\ServiceHub.IdentityHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.Dotnet.x64\\\\ServiceHub.IdentityHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Winstep\\\\WsxService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Winstep\\\\WsxService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.Dotnet.x64\\\\ServiceHub.RoslynCodeAnalysisService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.Dotnet.x64\\\\ServiceHub.RoslynCodeAnalysisService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logioptionsplus_agent.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logioptionsplus_agent.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logioptionsplus_updater.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logioptionsplus_updater.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.Dotnet.x64\\\\ServiceHub.Host.dotnet.x64.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.Dotnet.x64\\\\ServiceHub.Host.dotnet.x64.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.netfx.x64\\\\ServiceHub.IntellicodeModelService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.netfx.x64\\\\ServiceHub.IntellicodeModelService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\IDE\\\\WebViewHost\\\\WebViewHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\IDE\\\\WebViewHost\\\\WebViewHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\IObit\\\\IObit Uninstaller\\\\UninstallMonitor.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\IObit\\\\IObit Uninstaller\\\\UninstallMonitor.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\UltraViewer\\\\UltraViewer_Service.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\UltraViewer\\\\UltraViewer_Service.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Access\\\\AdskAccessCore.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Access\\\\AdskAccessCore.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Setup\\\\AdskAccessServiceHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Setup\\\\AdskAccessServiceHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\MiniTool ShadowMaker\\\\AgentService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\MiniTool ShadowMaker\\\\AgentService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Common Files\\\\Foxit\\\\Foxit PDF Reader\\\\FoxitPDFReaderUpdateService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Common Files\\\\Foxit\\\\Foxit PDF Reader\\\\FoxitPDFReaderUpdateService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Setup\\\\AdskAccessService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Setup\\\\AdskAccessService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\MiniTool ShadowMaker\\\\SchedulerService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\MiniTool ShadowMaker\\\\SchedulerService.exe\"}]', '2025-09-20'),
(38, 'caf74c0d-d531-4cde-a557-d76479b1c5f7', 'BFEBFBFF000A0653611666', '[{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\common7\\\\ide\\\\devenv.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\common7\\\\ide\\\\devenv.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Internet Explorer\\\\IEDIAGCMD.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Internet Explorer\\\\IEDIAGCMD.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Internet Explorer\\\\IEXPLORE.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Internet Explorer\\\\IEXPLORE.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\WINDOWS\\\\System32\\\\licensemanagershellext.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\WINDOWS\\\\System32\\\\licensemanagershellext.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Windows Media Player\\\\wmplayer.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Windows Media Player\\\\wmplayer.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Microsoft Office\\\\Root\\\\Office16\\\\msoadfsb.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Microsoft Office\\\\Root\\\\Office16\\\\msoadfsb.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Microsoft Office\\\\Root\\\\Office16\\\\msoasb.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Microsoft Office\\\\Root\\\\Office16\\\\msoasb.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Microsoft Office\\\\Root\\\\VFS\\\\ProgramFilesCommonX64\\\\Microsoft Shared\\\\OFFICE16\\\\MSOXMLED.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Microsoft Office\\\\Root\\\\VFS\\\\ProgramFilesCommonX64\\\\Microsoft Shared\\\\OFFICE16\\\\MSOXMLED.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\WINDOWS\\\\system32\\\\WindowsPowerShell\\\\v1.0\\\\PowerShell.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\WINDOWS\\\\system32\\\\WindowsPowerShell\\\\v1.0\\\\PowerShell.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Microsoft Office\\\\Root\\\\Office16\\\\SDXHelper.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Microsoft Office\\\\Root\\\\Office16\\\\SDXHelper.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Common Files\\\\microsoft shared\\\\ink\\\\TabTip.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Common Files\\\\microsoft shared\\\\ink\\\\TabTip.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Microsoft Office\\\\Root\\\\Office16\\\\VISIO.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Microsoft Office\\\\Root\\\\Office16\\\\VISIO.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Windows Mail\\\\wab.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Windows Mail\\\\wab.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Windows Mail\\\\wabmig.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Windows Mail\\\\wabmig.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Setup\\\\AdskAccessService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Setup\\\\AdskAccessService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Realtek\\\\Audio\\\\HDA\\\\RtkNGUI64.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Realtek\\\\Audio\\\\HDA\\\\RtkNGUI64.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Autodesk\\\\Personal Accelerator for Revit\\\\RevitAccelerator.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Autodesk\\\\Personal Accelerator for Revit\\\\RevitAccelerator.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\UltraViewer\\\\UltraViewer_Service.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\UltraViewer\\\\UltraViewer_Service.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Common Files\\\\Autodesk\\\\AdpDesktopSDK\\\\bin\\\\ADPClientService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Common Files\\\\Autodesk\\\\AdpDesktopSDK\\\\bin\\\\ADPClientService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Autodesk\\\\Genuine Service\\\\GenuineService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Autodesk\\\\Genuine Service\\\\GenuineService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Autodesk\\\\Autodesk CER\\\\service\\\\cer_service.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Autodesk\\\\Autodesk CER\\\\service\\\\cer_service.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Common Files\\\\Autodesk Shared\\\\AdskLicensing\\\\Current\\\\AdskLicensingService\\\\AdskLicensingService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Common Files\\\\Autodesk Shared\\\\AdskLicensing\\\\Current\\\\AdskLicensingService\\\\AdskLicensingService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Common Files\\\\Macrovision Shared\\\\FlexNet Publisher\\\\FNPLicensingService64.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Common Files\\\\Macrovision Shared\\\\FlexNet Publisher\\\\FNPLicensingService64.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Access\\\\AdskAccessCore.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Access\\\\AdskAccessCore.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Setup\\\\ui-launcher\\\\AdskAccessUIHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Setup\\\\ui-launcher\\\\AdskAccessUIHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Bonjour\\\\mDNSResponder.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Bonjour\\\\mDNSResponder.exe\"},{\"DuongDanPhanMem\":\"c:\\\\program files\\\\microsoft visual studio\\\\2022\\\\community\\\\common7\\\\ide\\\\extensions\\\\microsoft\\\\copilot\\\\service\\\\dist\\\\copilot-language-server.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"c:\\\\program files\\\\microsoft visual studio\\\\2022\\\\community\\\\common7\\\\ide\\\\extensions\\\\microsoft\\\\copilot\\\\service\\\\dist\\\\copilot-language-server.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Code\\\\KidoLock\\\\Restrict software openings\\\\bin\\\\Debug\\\\KidsLock.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Code\\\\KidoLock\\\\Restrict software openings\\\\bin\\\\Debug\\\\KidsLock.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Users\\\\rdsic\\\\Downloads\\\\unikey46RC2-win64\\\\UniKeyNT.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Users\\\\rdsic\\\\Downloads\\\\unikey46RC2-win64\\\\UniKeyNT.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.netfx.x64\\\\ServiceHub.IntellicodeModelService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.netfx.x64\\\\ServiceHub.IntellicodeModelService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Setup\\\\AdskAccessServiceHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Setup\\\\AdskAccessServiceHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Autodesk\\\\Autodesk AdSSO\\\\AdSSO.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Autodesk\\\\Autodesk AdSSO\\\\AdSSO.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Autodesk\\\\AdskIdentityManager\\\\1.15.3.5\\\\AdskIdentityManager.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Autodesk\\\\AdskIdentityManager\\\\1.15.3.5\\\\AdskIdentityManager.exe\"}]', '2025-09-22'),
(39, '33b57568-b090-4317-a0e3-fd1f2a86feeb', 'BFEBFBFF000806C1MCN0CV07E346493', '[{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\common7\\\\ide\\\\devenv.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Community\\\\common7\\\\ide\\\\devenv.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\EXCEL.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\EXCEL.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Internet Explorer\\\\IEDIAGCMD.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Internet Explorer\\\\IEDIAGCMD.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Internet Explorer\\\\IEXPLORE.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Internet Explorer\\\\IEXPLORE.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\WINDOWS\\\\System32\\\\licensemanagershellext.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\WINDOWS\\\\System32\\\\licensemanagershellext.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\Lync.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\Lync.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Windows Media Player\\\\wmplayer.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Windows Media Player\\\\wmplayer.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\MSACCESS.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\MSACCESS.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\msoasb.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\msoasb.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\MSPUB.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\MSPUB.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\OUTLOOK.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\OUTLOOK.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\POWERPNT.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\POWERPNT.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\WINDOWS\\\\system32\\\\WindowsPowerShell\\\\v1.0\\\\PowerShell.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\WINDOWS\\\\system32\\\\WindowsPowerShell\\\\v1.0\\\\PowerShell.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\SkypeSrv\\\\SKYPESERVER.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\SkypeSrv\\\\SKYPESERVER.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Common Files\\\\microsoft shared\\\\ink\\\\TabTip.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Common Files\\\\microsoft shared\\\\ink\\\\TabTip.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Windows Mail\\\\wab.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Windows Mail\\\\wab.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Windows Mail\\\\wabmig.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Windows Mail\\\\wabmig.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WinRAR\\\\WinRAR.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\WinRAR\\\\WinRAR.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\WINWORD.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\WINWORD.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logioptionsplus_updater.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logioptionsplus_updater.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Users\\\\trant\\\\AppData\\\\Local\\\\Programs\\\\Notion\\\\Notion.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Users\\\\trant\\\\AppData\\\\Local\\\\Programs\\\\Notion\\\\Notion.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\McAfee\\\\WebAdvisor\\\\ServiceHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\McAfee\\\\WebAdvisor\\\\ServiceHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\TeamViewer\\\\TeamViewer_Service.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\TeamViewer\\\\TeamViewer_Service.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Users\\\\trant\\\\AppData\\\\Local\\\\Programs\\\\Zalo\\\\Zalo-25.8.3\\\\plugins\\\\capture\\\\ZaloCap.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Users\\\\trant\\\\AppData\\\\Local\\\\Programs\\\\Zalo\\\\Zalo-25.8.3\\\\plugins\\\\capture\\\\ZaloCap.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\UltraViewer\\\\UltraViewer_Service.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\UltraViewer\\\\UltraViewer_Service.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Users\\\\trant\\\\AppData\\\\Local\\\\Postman-Agent\\\\app-0.4.65\\\\Postman Agent.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Users\\\\trant\\\\AppData\\\\Local\\\\Postman-Agent\\\\app-0.4.65\\\\Postman Agent.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WindowsApps\\\\4248CephasPAD.UnikeyVietnameseKeyboard-StoreEditio_4.6.2.0_x64__e9vm632feqtm6\\\\VFS\\\\AppVPackageDrive\\\\UnikeyNT.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\WindowsApps\\\\4248CephasPAD.UnikeyVietnameseKeyboard-StoreEditio_4.6.2.0_x64__e9vm632feqtm6\\\\VFS\\\\AppVPackageDrive\\\\UnikeyNT.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logioptionsplus_agent.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logioptionsplus_agent.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logioptionsplus_appbroker.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logioptionsplus_appbroker.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\McAfee\\\\WebAdvisor\\\\UIHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\McAfee\\\\WebAdvisor\\\\UIHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Users\\\\trant\\\\AppData\\\\Local\\\\Programs\\\\Zalo\\\\Zalo-25.8.3\\\\plugins\\\\capture\\\\ZaloCall.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Users\\\\trant\\\\AppData\\\\Local\\\\Programs\\\\Zalo\\\\Zalo-25.8.3\\\\plugins\\\\capture\\\\ZaloCall.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Users\\\\trant\\\\AppData\\\\Local\\\\FigmaAgent\\\\figma_agent.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Users\\\\trant\\\\AppData\\\\Local\\\\FigmaAgent\\\\figma_agent.exe\"}]', '2025-09-22');
INSERT INTO `phan_mem_tren_may_tinh` (`id`, `nguoi_dung_id`, `ma_thiet_bi`, `ten_phan_mem`, `ngay_cap_nhat`) VALUES
(41, '6bb9051d-c125-40a3-9682-75168cf14bb1', '178BFBFF00810F81L7NRCV00C52927C', '[{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\7-Zip\\\\7zFM.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\7-Zip\\\\7zFM.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Microsoft Visual Studio 14.0\\\\Common7\\\\IDE\\\\Blend.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Microsoft Visual Studio 14.0\\\\Common7\\\\IDE\\\\Blend.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Microsoft Visual Studio 14.0\\\\Common7\\\\IDE\\\\devenv.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Microsoft Visual Studio 14.0\\\\Common7\\\\IDE\\\\devenv.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\EXCEL.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\EXCEL.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Foxit Software\\\\Foxit Reader\\\\FoxitReader.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Foxit Software\\\\Foxit Reader\\\\FoxitReader.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Internet Explorer\\\\IEDIAGCMD.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Internet Explorer\\\\IEDIAGCMD.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Internet Explorer\\\\IEXPLORE.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Internet Explorer\\\\IEXPLORE.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Java\\\\jre1.8.0_331\\\\bin\\\\javaws.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Java\\\\jre1.8.0_331\\\\bin\\\\javaws.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\System32\\\\licensemanagershellext.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Windows\\\\System32\\\\licensemanagershellext.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Canon\\\\MF Toolbox Ver4.9\\\\MfTBox.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Canon\\\\MF Toolbox Ver4.9\\\\MfTBox.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Common Files\\\\Microsoft Shared\\\\Ink\\\\mip.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Common Files\\\\Microsoft Shared\\\\Ink\\\\mip.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\K-Lite Codec Pack\\\\MPC-HC64\\\\mpc-hc64.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\K-Lite Codec Pack\\\\MPC-HC64\\\\mpc-hc64.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Windows Media Player\\\\wmplayer.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Windows Media Player\\\\wmplayer.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\MSACCESS.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\MSACCESS.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\msoadfsb.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\msoadfsb.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\msoasb.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\msoasb.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\VFS\\\\ProgramFilesCommonX64\\\\Microsoft Shared\\\\OFFICE16\\\\MSOXMLED.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\VFS\\\\ProgramFilesCommonX64\\\\Microsoft Shared\\\\OFFICE16\\\\MSOXMLED.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Notepad++\\\\notepad++.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Notepad++\\\\notepad++.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\OUTLOOK.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\OUTLOOK.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\System32\\\\mspaint.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Windows\\\\System32\\\\mspaint.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\POWERPNT.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\POWERPNT.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\system32\\\\WindowsPowerShell\\\\v1.0\\\\PowerShell.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Windows\\\\system32\\\\WindowsPowerShell\\\\v1.0\\\\PowerShell.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Canon\\\\IJ Scan Utility\\\\SCANUTILITY.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Canon\\\\IJ Scan Utility\\\\SCANUTILITY.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\SDXHelper.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\SDXHelper.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\SkypeSrv\\\\SKYPESERVER.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\SkypeSrv\\\\SKYPESERVER.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\system32\\\\SnippingTool.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Windows\\\\system32\\\\SnippingTool.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Common Files\\\\microsoft shared\\\\ink\\\\TabTip.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Common Files\\\\microsoft shared\\\\ink\\\\TabTip.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\VISIO.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\VISIO.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Windows Mail\\\\wab.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Windows Mail\\\\wab.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Windows Mail\\\\wabmig.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Windows Mail\\\\wabmig.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\WinRAR\\\\WinRAR.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\WinRAR\\\\WinRAR.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\WINWORD.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Office\\\\Root\\\\Office16\\\\WINWORD.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Windows NT\\\\Accessories\\\\WORDPAD.EXE\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Windows NT\\\\Accessories\\\\WORDPAD.EXE\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logioptionsplus_agent.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logioptionsplus_agent.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Common Files\\\\Macrovision Shared\\\\FlexNet Publisher\\\\FNPLicensingService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Common Files\\\\Macrovision Shared\\\\FlexNet Publisher\\\\FNPLicensingService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\RtkBtManServ.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Windows\\\\RtkBtManServ.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logioptionsplus_updater.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logioptionsplus_updater.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\Common Files\\\\Autodesk Shared\\\\AdskLicensing\\\\Current\\\\AdskLicensingService\\\\AdskLicensingService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\Common Files\\\\Autodesk Shared\\\\AdskLicensing\\\\Current\\\\AdskLicensingService\\\\AdskLicensingService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\ASUS\\\\ROG Live Service\\\\ROGLiveService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\ASUS\\\\ROG Live Service\\\\ROGLiveService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.SettingsHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.SettingsHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\UltraViewer\\\\uv_x64.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\UltraViewer\\\\uv_x64.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.Dotnet.x64\\\\ServiceHub.DataWarehouseHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.Dotnet.x64\\\\ServiceHub.DataWarehouseHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\ASUS\\\\ArmouryDevice\\\\asus_framework.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\ASUS\\\\ArmouryDevice\\\\asus_framework.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.TestWindowStoreHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.TestWindowStoreHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.ThreadedWaitDialog.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.ThreadedWaitDialog.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\unikey\\\\UniKeyNT.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\unikey\\\\UniKeyNT.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.netfx.x86\\\\ServiceHub.IdentityHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.netfx.x86\\\\ServiceHub.IdentityHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Bonjour\\\\mDNSResponder.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Bonjour\\\\mDNSResponder.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Windows\\\\SystemApps\\\\Microsoft.Windows.StartMenuExperienceHost_cw5n1h2txyewy\\\\StartMenuExperienceHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Windows\\\\SystemApps\\\\Microsoft.Windows.StartMenuExperienceHost_cw5n1h2txyewy\\\\StartMenuExperienceHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.netfx.x86\\\\ServiceHub.Host.netfx.x86.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.netfx.x86\\\\ServiceHub.Host.netfx.x86.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\ASUS\\\\ArmouryDevice\\\\dll\\\\SwAgent\\\\ArmourySwAgent.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\ASUS\\\\ArmouryDevice\\\\dll\\\\SwAgent\\\\ArmourySwAgent.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\ASUS\\\\ArmouryDevice\\\\dll\\\\AcPowerNotification\\\\AcPowerNotification.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\ASUS\\\\ArmouryDevice\\\\dll\\\\AcPowerNotification\\\\AcPowerNotification.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\ASUS\\\\ARMOURY CRATE Service\\\\ArmouryCrate.Service.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\ASUS\\\\ARMOURY CRATE Service\\\\ArmouryCrate.Service.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.Dotnet.x64\\\\ServiceHub.RoslynCodeAnalysisService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.Dotnet.x64\\\\ServiceHub.RoslynCodeAnalysisService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\LightingService\\\\LightingService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\LightingService\\\\LightingService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\ASUS\\\\ARMOURY CRATE Service\\\\ArmouryCrate.UserSessionHelper.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\ASUS\\\\ARMOURY CRATE Service\\\\ArmouryCrate.UserSessionHelper.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Setup\\\\AdskAccessService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Setup\\\\AdskAccessService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\ASUS\\\\AsusCertService\\\\AsusCertService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\ASUS\\\\AsusCertService\\\\AsusCertService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.Host.AnyCPU.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.Host.AnyCPU.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\IDE\\\\WebViewHost\\\\WebViewHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\IDE\\\\WebViewHost\\\\WebViewHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.Dotnet.x64\\\\ServiceHub.IndexingService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.Dotnet.x64\\\\ServiceHub.IndexingService.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logi_crashpad_handler.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logi_crashpad_handler.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\ASUS\\\\ArmouryDevice\\\\dll\\\\ArmourySocketServer\\\\ArmourySocketServer.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\ASUS\\\\ArmouryDevice\\\\dll\\\\ArmourySocketServer\\\\ArmourySocketServer.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.VSDetouredHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.AnyCPU\\\\ServiceHub.VSDetouredHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Common Files\\\\Macrovision Shared\\\\FlexNet Publisher\\\\FNPLicensingService64.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Common Files\\\\Macrovision Shared\\\\FlexNet Publisher\\\\FNPLicensingService64.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\UltraViewer\\\\UltraViewer_Service.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\UltraViewer\\\\UltraViewer_Service.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\controller\\\\Microsoft.ServiceHub.Controller.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\controller\\\\Microsoft.ServiceHub.Controller.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Setup\\\\AdskAccessServiceHost.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Autodesk\\\\AdODIS\\\\V1\\\\Setup\\\\AdskAccessServiceHost.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files (x86)\\\\ASUS\\\\GameSDK Service\\\\GameSDK.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files (x86)\\\\ASUS\\\\GameSDK Service\\\\GameSDK.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logioptionsplus_appbroker.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\LogiOptionsPlus\\\\logioptionsplus_appbroker.exe\"},{\"DuongDanPhanMem\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.netfx.x64\\\\ServiceHub.IntellicodeModelService.exe\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":false,\"DuongDan\":\"C:\\\\Program Files\\\\Microsoft Visual Studio\\\\2022\\\\Professional\\\\Common7\\\\ServiceHub\\\\Hosts\\\\ServiceHub.Host.netfx.x64\\\\ServiceHub.IntellicodeModelService.exe\"}]', '2025-09-21');

-- --------------------------------------------------------

--
-- Table structure for table `phu_huynh`
--

CREATE TABLE `phu_huynh` (
  `ma_phu_huynh` int(11) NOT NULL,
  `email_phu_huynh` varchar(100) NOT NULL,
  `sdt` varchar(15) DEFAULT NULL,
  `ten_phu_huynh` varchar(100) DEFAULT NULL,
  `ngay_tao` timestamp NOT NULL DEFAULT current_timestamp(),
  `mat_khau` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `phu_huynh`
--

INSERT INTO `phu_huynh` (`ma_phu_huynh`, `email_phu_huynh`, `sdt`, `ten_phu_huynh`, `ngay_tao`, `mat_khau`) VALUES
(9, 'nhutran2k2@gmail.com', '0868803548', 'Trần Văn Thuận', '2025-09-19 09:57:04', 'Nhutran@0410'),
(10, 'anhnt.spc@gmail.com', '0385081264', 'Nguyễn Tuấn Anh', '2025-09-19 16:12:31', '@Anhtuan891997'),
(11, 'lanh@gmail.com', '0393608882', 'Nguyễn Thị Lan Anh', '2025-09-18 17:00:00', 'Lanh3152.'),
(12, 'trantonhu04@gmail.com', '0334676568', 'Ngô Thị Lộc', '2025-09-20 02:10:30', 'Nhutran@0410');

-- --------------------------------------------------------

--
-- Table structure for table `quan_ly_thoi_gian`
--

CREATE TABLE `quan_ly_thoi_gian` (
  `id` int(11) NOT NULL,
  `nguoi_dung_id` varchar(50) NOT NULL,
  `ma_thiet_bi` varchar(50) NOT NULL,
  `thoi_gian` mediumtext NOT NULL,
  `ngay_cap_nhat` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quan_ly_thoi_gian`
--

INSERT INTO `quan_ly_thoi_gian` (`id`, `nguoi_dung_id`, `ma_thiet_bi`, `thoi_gian`, `ngay_cap_nhat`) VALUES
(8, '31c1edc5-a1cf-4687-8e95-629f1717dd21', 'BFEBFBFF000B06A2YX06SB9V', '[{\"Thu\":\"Thứ 2\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false},{\"Thu\":\"Thứ 3\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false},{\"Thu\":\"Thứ 4\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false},{\"Thu\":\"Thứ 5\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false},{\"Thu\":\"Thứ 6\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false},{\"Thu\":\"Thứ 7\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":true,\"10h\":true,\"11h\":true,\"12h\":true,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false},{\"Thu\":\"CN\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false}]', '2025-09-19'),
(9, '6bb9051d-c125-40a3-9682-75168cf14bb1', '178BFBFF00810F81L7NRCV00C52927C', '[{\"Thu\":\"Thứ 2\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false},{\"Thu\":\"Thứ 3\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false},{\"Thu\":\"Thứ 4\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false},{\"Thu\":\"Thứ 5\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false},{\"Thu\":\"Thứ 6\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false},{\"Thu\":\"Thứ 7\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false},{\"Thu\":\"Chủ nhật\",\"00h\":false,\"01h\":false,\"02h\":false,\"03h\":false,\"04h\":false,\"05h\":false,\"06h\":false,\"07h\":false,\"08h\":false,\"09h\":false,\"10h\":false,\"11h\":false,\"12h\":false,\"13h\":false,\"14h\":false,\"15h\":false,\"16h\":false,\"17h\":false,\"18h\":false,\"19h\":false,\"20h\":false,\"21h\":false,\"22h\":false,\"23h\":false}]', '2025-09-21');

-- --------------------------------------------------------

--
-- Table structure for table `thong_tin_goi`
--

CREATE TABLE `thong_tin_goi` (
  `id` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL,
  `mo_ta` text DEFAULT NULL,
  `gia` decimal(15,2) NOT NULL,
  `loai_goi` enum('TRA_PHI','MIEN_PHI') NOT NULL,
  `thoi_han_thang` int(11) NOT NULL DEFAULT 1,
  `so_thiet_bi` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `thong_tin_goi`
--

INSERT INTO `thong_tin_goi` (`id`, `ten`, `mo_ta`, `gia`, `loai_goi`, `thoi_han_thang`, `so_thiet_bi`) VALUES
(1, 'Gói 1 năm', 'Quý phụ huynh và các bạn nhỏ có thể trải nghiệm dịch vụ với các tính năng trong vòng 1 năm', '500000.00', 'TRA_PHI', 12, 1),
(2, 'Gói 2 năm', 'Quý phụ huynh và các bạn nhỏ có thể trải nghiệm đa dạng các dịch vụ VIP', '850000.00', 'TRA_PHI', 24, 1),
(3, 'Gói cá nhân', 'Gói dành cho 1 thiết bị', '500000.00', 'TRA_PHI', 12, 1),
(4, 'Gói đa thiết bị', 'Gói dành cho 3 thiết bị', '1350000.00', 'TRA_PHI', 12, 3),
(5, 'Gói gia đình', 'Gói dành cho gia đình nhiều trẻ và nhiều thiết bị', '2150000.00', 'TRA_PHI', 12, 5),
(6, 'Gói dùng thử', 'Gói dành cho 1 thiết bị để trải nghiệm thử các tính năng premium', '0.00', 'MIEN_PHI', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `trang_web_bi_cam`
--

CREATE TABLE `trang_web_bi_cam` (
  `id` int(11) NOT NULL,
  `ten_trang_web` varchar(3000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tre_em`
--

CREATE TABLE `tre_em` (
  `ma_tre_em` int(11) NOT NULL,
  `ma_phu_huynh` int(11) NOT NULL,
  `ten_tre` varchar(100) NOT NULL,
  `lop` varchar(50) DEFAULT NULL,
  `ngay_sinh` date DEFAULT NULL,
  `truong` varchar(150) DEFAULT NULL,
  `gioi_tinh` enum('Nam','Nữ','Khác') DEFAULT 'Khác',
  `email_tre_em` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tre_em`
--

INSERT INTO `tre_em` (`ma_tre_em`, `ma_phu_huynh`, `ten_tre`, `lop`, `ngay_sinh`, `truong`, `gioi_tinh`, `email_tre_em`) VALUES
(30, 9, 'Như', '12', '0000-00-00', 'Đại học', 'Nữ', 'nhutran2k2@gmail.com'),
(31, 10, 'Nguyễn Lê Vân Trang', '1', '0000-00-00', 'Mầm non', 'Nữ', 'anhnt.spc@gmail.com'),
(33, 11, '123', '1', '0000-00-00', 'Tiểu học', 'Nam', 'ntlanh3152@gmail.com');

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_goi_va_noi_dung`
-- (See below for the actual view)
--
CREATE TABLE `v_goi_va_noi_dung` (
`goi_id` int(11)
,`ten_goi` varchar(255)
,`mo_ta_goi` text
,`gia` decimal(15,2)
,`loai_goi` enum('TRA_PHI','MIEN_PHI')
,`thoi_han_thang` int(11)
,`noi_dung_id` int(11)
,`noi_dung` text
);

-- --------------------------------------------------------

--
-- Table structure for table `web_bi_chan`
--

CREATE TABLE `web_bi_chan` (
  `id` int(11) NOT NULL,
  `ma_thiet_bi` varchar(50) NOT NULL,
  `nguoi_dung_id` varchar(50) NOT NULL,
  `ten_trang_web` mediumtext NOT NULL,
  `ngay_cap_nhat` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `web_bi_chan`
--

INSERT INTO `web_bi_chan` (`id`, `ma_thiet_bi`, `nguoi_dung_id`, `ten_trang_web`, `ngay_cap_nhat`) VALUES
(12, 'BFEBFBFF000B06A2YX06SB9V', '31c1edc5-a1cf-4687-8e95-629f1717dd21', '[{\"DuongDanPhanMem\":\"facebook\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"facebook\"}]', '2025-09-19'),
(13, 'BFEBFBFF000A0653611666', 'caf74c0d-d531-4cde-a557-d76479b1c5f7', '[{\"DuongDanPhanMem\":\"sv388\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"sv388\"}]', '2025-09-20'),
(14, 'BFEBFBFF000806C1MCN0CV07E346493', '33b57568-b090-4317-a0e3-fd1f2a86feeb', '[{\"DuongDanPhanMem\":\"facebook\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"facebook\"},{\"DuongDanPhanMem\":\"messenger\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"messenger\"},{\"DuongDanPhanMem\":\"instagram\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"instagram\"},{\"DuongDanPhanMem\":\"tiktok\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"tiktok\"},{\"DuongDanPhanMem\":\"zalo\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"zalo\"},{\"DuongDanPhanMem\":\"twitter\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"twitter\"},{\"DuongDanPhanMem\":\"snapchat\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"snapchat\"},{\"DuongDanPhanMem\":\"pinterest\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"pinterest\"},{\"DuongDanPhanMem\":\"phimmoi\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"phimmoi\"},{\"DuongDanPhanMem\":\"phimbathu\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"phimbathu\"},{\"DuongDanPhanMem\":\"anime47\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"anime47\"},{\"DuongDanPhanMem\":\"hdviet\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"hdviet\"},{\"DuongDanPhanMem\":\"bilutv\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"bilutv\"},{\"DuongDanPhanMem\":\"phimmoizz\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"phimmoizz\"},{\"DuongDanPhanMem\":\"roblox\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"roblox\"},{\"DuongDanPhanMem\":\"minecraft\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"minecraft\"},{\"DuongDanPhanMem\":\"garena\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"garena\"},{\"DuongDanPhanMem\":\"lienquan\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"lienquan\"},{\"DuongDanPhanMem\":\"freefire\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"freefire\"},{\"DuongDanPhanMem\":\"pubg\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"pubg\"},{\"DuongDanPhanMem\":\"steam\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"steam\"},{\"DuongDanPhanMem\":\"epicgames\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"epicgames\"},{\"DuongDanPhanMem\":\"fun88\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"fun88\"},{\"DuongDanPhanMem\":\"m88\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"m88\"},{\"DuongDanPhanMem\":\"bong88\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"bong88\"},{\"DuongDanPhanMem\":\"fabet\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"fabet\"},{\"DuongDanPhanMem\":\"w88\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"w88\"},{\"DuongDanPhanMem\":\"sv388\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"sv388\"},{\"DuongDanPhanMem\":\"kubet\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"kubet\"},{\"DuongDanPhanMem\":\"baccarat\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"baccarat\"},{\"DuongDanPhanMem\":\"xoso\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"xoso\"},{\"DuongDanPhanMem\":\"casino\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"casino\"},{\"DuongDanPhanMem\":\"crack\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"crack\"},{\"DuongDanPhanMem\":\"serial\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"serial\"},{\"DuongDanPhanMem\":\"keygen\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"keygen\"},{\"DuongDanPhanMem\":\"hackgame\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"hackgame\"},{\"DuongDanPhanMem\":\"modapk\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"modapk\"},{\"DuongDanPhanMem\":\"omegle\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"omegle\"},{\"DuongDanPhanMem\":\"chatroulette\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"chatroulette\"},{\"DuongDanPhanMem\":\"discord\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"discord\"},{\"DuongDanPhanMem\":\"telegram\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"telegram\"},{\"DuongDanPhanMem\":\"voz\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"voz\"},{\"DuongDanPhanMem\":\"chanvn\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"chanvn\"},{\"DuongDanPhanMem\":\"reddit\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"reddit\"},{\"DuongDanPhanMem\":\"4chan\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"4chan\"}]', '2025-09-20'),
(15, '178BFBFF00810F81L7NRCV00C52927C', '6bb9051d-c125-40a3-9682-75168cf14bb1', '[{\"DuongDanPhanMem\":\"facebook\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"facebook\"},{\"DuongDanPhanMem\":\"messenger\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"messenger\"},{\"DuongDanPhanMem\":\"instagram\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"instagram\"},{\"DuongDanPhanMem\":\"tiktok\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"tiktok\"},{\"DuongDanPhanMem\":\"zalo\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"zalo\"},{\"DuongDanPhanMem\":\"twitter\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"twitter\"},{\"DuongDanPhanMem\":\"snapchat\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"snapchat\"},{\"DuongDanPhanMem\":\"pinterest\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"pinterest\"},{\"DuongDanPhanMem\":\"phimmoi\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"phimmoi\"},{\"DuongDanPhanMem\":\"phimbathu\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"phimbathu\"},{\"DuongDanPhanMem\":\"anime47\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"anime47\"},{\"DuongDanPhanMem\":\"hdviet\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"hdviet\"},{\"DuongDanPhanMem\":\"bilutv\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"bilutv\"},{\"DuongDanPhanMem\":\"phimmoizz\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"phimmoizz\"},{\"DuongDanPhanMem\":\"roblox\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"roblox\"},{\"DuongDanPhanMem\":\"minecraft\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"minecraft\"},{\"DuongDanPhanMem\":\"garena\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"garena\"},{\"DuongDanPhanMem\":\"lienquan\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"lienquan\"},{\"DuongDanPhanMem\":\"freefire\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"freefire\"},{\"DuongDanPhanMem\":\"pubg\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"pubg\"},{\"DuongDanPhanMem\":\"steam\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"steam\"},{\"DuongDanPhanMem\":\"epicgames\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"epicgames\"},{\"DuongDanPhanMem\":\"fun88\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"fun88\"},{\"DuongDanPhanMem\":\"m88\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"m88\"},{\"DuongDanPhanMem\":\"bong88\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"bong88\"},{\"DuongDanPhanMem\":\"fabet\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"fabet\"},{\"DuongDanPhanMem\":\"w88\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"w88\"},{\"DuongDanPhanMem\":\"sv388\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"sv388\"},{\"DuongDanPhanMem\":\"kubet\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"kubet\"},{\"DuongDanPhanMem\":\"baccarat\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"baccarat\"},{\"DuongDanPhanMem\":\"xoso\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"xoso\"},{\"DuongDanPhanMem\":\"casino\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"casino\"},{\"DuongDanPhanMem\":\"crack\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"crack\"},{\"DuongDanPhanMem\":\"serial\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"serial\"},{\"DuongDanPhanMem\":\"keygen\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"keygen\"},{\"DuongDanPhanMem\":\"hackgame\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"hackgame\"},{\"DuongDanPhanMem\":\"modapk\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"modapk\"},{\"DuongDanPhanMem\":\"omegle\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"omegle\"},{\"DuongDanPhanMem\":\"chatroulette\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"chatroulette\"},{\"DuongDanPhanMem\":\"discord\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"discord\"},{\"DuongDanPhanMem\":\"telegram\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"telegram\"},{\"DuongDanPhanMem\":\"voz\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"voz\"},{\"DuongDanPhanMem\":\"chanvn\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"chanvn\"},{\"DuongDanPhanMem\":\"reddit\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"reddit\"},{\"DuongDanPhanMem\":\"4chan\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"4chan\"}]', '2025-09-21');

-- --------------------------------------------------------

--
-- Table structure for table `web_cho_phep`
--

CREATE TABLE `web_cho_phep` (
  `id` int(11) NOT NULL,
  `ma_thiet_bi` varchar(50) NOT NULL,
  `nguoi_dung_id` varchar(50) NOT NULL,
  `ten_trang_web` mediumtext NOT NULL,
  `ngay_cap_nhat` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `web_cho_phep`
--

INSERT INTO `web_cho_phep` (`id`, `ma_thiet_bi`, `nguoi_dung_id`, `ten_trang_web`, `ngay_cap_nhat`) VALUES
(11, 'BFEBFBFF000806C1MCN0CV07E346493', '33b57568-b090-4317-a0e3-fd1f2a86feeb', '[{\"DuongDanPhanMem\":\"olm\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"olm\"},{\"DuongDanPhanMem\":\"violet\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"violet\"},{\"DuongDanPhanMem\":\"vndoc\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"vndoc\"},{\"DuongDanPhanMem\":\"hocmai\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"hocmai\"},{\"DuongDanPhanMem\":\"tuhoc\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"tuhoc\"},{\"DuongDanPhanMem\":\"moon\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"moon\"},{\"DuongDanPhanMem\":\"kenhtuyensinh\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"kenhtuyensinh\"},{\"DuongDanPhanMem\":\"hoc24\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"hoc24\"},{\"DuongDanPhanMem\":\"loigiaihay\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"loigiaihay\"},{\"DuongDanPhanMem\":\"giaibaitap\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"giaibaitap\"},{\"DuongDanPhanMem\":\"baitap123\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"baitap123\"},{\"DuongDanPhanMem\":\"azota\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"azota\"},{\"DuongDanPhanMem\":\"shub\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"shub\"},{\"DuongDanPhanMem\":\"vietjack\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"vietjack\"},{\"DuongDanPhanMem\":\"giaovienvietnam\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"giaovienvietnam\"},{\"DuongDanPhanMem\":\"tailieu\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"tailieu\"},{\"DuongDanPhanMem\":\"hoctap\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"hoctap\"},{\"DuongDanPhanMem\":\"toanhoc\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"toanhoc\"},{\"DuongDanPhanMem\":\"vanhoc\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"vanhoc\"},{\"DuongDanPhanMem\":\"lyhoc\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"lyhoc\"},{\"DuongDanPhanMem\":\"hoahoc\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"hoahoc\"},{\"DuongDanPhanMem\":\"lichsu\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"lichsu\"},{\"DuongDanPhanMem\":\"diali\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"diali\"},{\"DuongDanPhanMem\":\"tienganh\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"tienganh\"},{\"DuongDanPhanMem\":\"english\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"english\"},{\"DuongDanPhanMem\":\"sinhhoc\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"sinhhoc\"},{\"DuongDanPhanMem\":\"google\",\"LichSuDungTrongTuan\":[],\"ThoiLuongChoPhep\":null,\"KichHoat\":true,\"DuongDan\":\"google\"}]', '2025-09-20');

-- --------------------------------------------------------

--
-- Table structure for table `yeu_cau_truy_cap`
--

CREATE TABLE `yeu_cau_truy_cap` (
  `id` int(11) NOT NULL,
  `ma_thiet_bi` varchar(50) DEFAULT NULL,
  `nguoi_dung_id` varchar(50) NOT NULL,
  `loai` text NOT NULL,
  `ten_chuong_trinh` text NOT NULL,
  `thoi_gian_gui` datetime DEFAULT current_timestamp(),
  `duoc_phe_duyet` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `yeu_cau_truy_cap`
--

INSERT INTO `yeu_cau_truy_cap` (`id`, `ma_thiet_bi`, `nguoi_dung_id`, `loai`, `ten_chuong_trinh`, `thoi_gian_gui`, `duoc_phe_duyet`) VALUES
(235, 'BFEBFBFF000806C1MCN0CV07E346493', '33b57568-b090-4317-a0e3-fd1f2a86feeb', 'app', 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', '2025-09-20 16:50:06', NULL);

-- --------------------------------------------------------

--
-- Structure for view `v_goi_va_noi_dung`
--

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cai_dat_phan_mem`
--
ALTER TABLE `cai_dat_phan_mem`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_nguoi_dung` (`nguoi_dung_id`);

--
-- Indexes for table `canh_bao_ai`
--
ALTER TABLE `canh_bao_ai`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nguoi_dung_id` (`nguoi_dung_id`);

--
-- Indexes for table `device_tokens`
--
ALTER TABLE `device_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `goi_dich_vu`
--
ALTER TABLE `goi_dich_vu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nguoi_dung_id` (`nguoi_dung_id`),
  ADD KEY `fk_thong_tin_goi` (`thong_tin_goi_id`);

--
-- Indexes for table `lich_su_thanh_toan`
--
ALTER TABLE `lich_su_thanh_toan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nguoi_dung_id` (`nguoi_dung_id`);

--
-- Indexes for table `mau_trang_web_bi_chan`
--
ALTER TABLE `mau_trang_web_bi_chan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mau_trang_web_cho_phep`
--
ALTER TABLE `mau_trang_web_cho_phep`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  ADD PRIMARY KEY (`nguoi_dung_id`),
  ADD KEY `fk_nguoidung_treem` (`ma_tre_em`);

--
-- Indexes for table `noi_dung_goi`
--
ALTER TABLE `noi_dung_goi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_noi_dung_goi_thong_tin_goi` (`thong_tin_goi_id`);

--
-- Indexes for table `phan_mem_cho_phep`
--
ALTER TABLE `phan_mem_cho_phep`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nguoi_dung_id` (`nguoi_dung_id`);

--
-- Indexes for table `phan_mem_tren_may_tinh`
--
ALTER TABLE `phan_mem_tren_may_tinh`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nguoi_dung_id` (`nguoi_dung_id`);

--
-- Indexes for table `phu_huynh`
--
ALTER TABLE `phu_huynh`
  ADD PRIMARY KEY (`ma_phu_huynh`);

--
-- Indexes for table `quan_ly_thoi_gian`
--
ALTER TABLE `quan_ly_thoi_gian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nguoi_dung_id` (`nguoi_dung_id`);

--
-- Indexes for table `thong_tin_goi`
--
ALTER TABLE `thong_tin_goi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trang_web_bi_cam`
--
ALTER TABLE `trang_web_bi_cam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tre_em`
--
ALTER TABLE `tre_em`
  ADD PRIMARY KEY (`ma_tre_em`),
  ADD KEY `fk_treem_phuhuynh` (`ma_phu_huynh`);

--
-- Indexes for table `web_bi_chan`
--
ALTER TABLE `web_bi_chan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nguoi_dung_id` (`nguoi_dung_id`);

--
-- Indexes for table `web_cho_phep`
--
ALTER TABLE `web_cho_phep`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nguoi_dung_id` (`nguoi_dung_id`);

--
-- Indexes for table `yeu_cau_truy_cap`
--
ALTER TABLE `yeu_cau_truy_cap`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nguoi_dung_id` (`nguoi_dung_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cai_dat_phan_mem`
--
ALTER TABLE `cai_dat_phan_mem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `canh_bao_ai`
--
ALTER TABLE `canh_bao_ai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `device_tokens`
--
ALTER TABLE `device_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `goi_dich_vu`
--
ALTER TABLE `goi_dich_vu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `lich_su_thanh_toan`
--
ALTER TABLE `lich_su_thanh_toan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mau_trang_web_bi_chan`
--
ALTER TABLE `mau_trang_web_bi_chan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `mau_trang_web_cho_phep`
--
ALTER TABLE `mau_trang_web_cho_phep`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `noi_dung_goi`
--
ALTER TABLE `noi_dung_goi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `phan_mem_cho_phep`
--
ALTER TABLE `phan_mem_cho_phep`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `phan_mem_tren_may_tinh`
--
ALTER TABLE `phan_mem_tren_may_tinh`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `phu_huynh`
--
ALTER TABLE `phu_huynh`
  MODIFY `ma_phu_huynh` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `quan_ly_thoi_gian`
--
ALTER TABLE `quan_ly_thoi_gian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `thong_tin_goi`
--
ALTER TABLE `thong_tin_goi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `trang_web_bi_cam`
--
ALTER TABLE `trang_web_bi_cam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=520;

--
-- AUTO_INCREMENT for table `tre_em`
--
ALTER TABLE `tre_em`
  MODIFY `ma_tre_em` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `web_bi_chan`
--
ALTER TABLE `web_bi_chan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `web_cho_phep`
--
ALTER TABLE `web_cho_phep`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `yeu_cau_truy_cap`
--
ALTER TABLE `yeu_cau_truy_cap`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=236;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cai_dat_phan_mem`
--
ALTER TABLE `cai_dat_phan_mem`
  ADD CONSTRAINT `cai_dat_phan_mem_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`);

--
-- Constraints for table `canh_bao_ai`
--
ALTER TABLE `canh_bao_ai`
  ADD CONSTRAINT `canh_bao_ai_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`);

--
-- Constraints for table `goi_dich_vu`
--
ALTER TABLE `goi_dich_vu`
  ADD CONSTRAINT `fk_thong_tin_goi` FOREIGN KEY (`thong_tin_goi_id`) REFERENCES `thong_tin_goi` (`id`),
  ADD CONSTRAINT `goi_dich_vu_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`);

--
-- Constraints for table `lich_su_thanh_toan`
--
ALTER TABLE `lich_su_thanh_toan`
  ADD CONSTRAINT `lich_su_thanh_toan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`);

--
-- Constraints for table `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  ADD CONSTRAINT `fk_nguoidung_treem` FOREIGN KEY (`ma_tre_em`) REFERENCES `tre_em` (`ma_tre_em`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `noi_dung_goi`
--
ALTER TABLE `noi_dung_goi`
  ADD CONSTRAINT `fk_noi_dung_goi_thong_tin_goi` FOREIGN KEY (`thong_tin_goi_id`) REFERENCES `thong_tin_goi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `phan_mem_cho_phep`
--
ALTER TABLE `phan_mem_cho_phep`
  ADD CONSTRAINT `phan_mem_cho_phep_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE;

--
-- Constraints for table `phan_mem_tren_may_tinh`
--
ALTER TABLE `phan_mem_tren_may_tinh`
  ADD CONSTRAINT `phan_mem_tren_may_tinh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE;

--
-- Constraints for table `quan_ly_thoi_gian`
--
ALTER TABLE `quan_ly_thoi_gian`
  ADD CONSTRAINT `quan_ly_thoi_gian_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE;

--
-- Constraints for table `tre_em`
--
ALTER TABLE `tre_em`
  ADD CONSTRAINT `fk_treem_phuhuynh` FOREIGN KEY (`ma_phu_huynh`) REFERENCES `phu_huynh` (`ma_phu_huynh`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `web_bi_chan`
--
ALTER TABLE `web_bi_chan`
  ADD CONSTRAINT `web_bi_chan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE;

--
-- Constraints for table `web_cho_phep`
--
ALTER TABLE `web_cho_phep`
  ADD CONSTRAINT `web_cho_phep_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`) ON DELETE CASCADE;

--
-- Constraints for table `yeu_cau_truy_cap`
--
ALTER TABLE `yeu_cau_truy_cap`
  ADD CONSTRAINT `yeu_cau_truy_cap_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
