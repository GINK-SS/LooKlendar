-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: LooKlendar
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `looklendar_calendar`
--

DROP TABLE IF EXISTS `looklendar_calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `looklendar_calendar` (
  `event_num` int NOT NULL AUTO_INCREMENT,
  `event_title` varchar(45) NOT NULL,
  `event_color` char(7) NOT NULL,
  `event_date` date NOT NULL,
  `event_place` varchar(45) DEFAULT NULL,
  `user_id` varchar(20) NOT NULL,
  PRIMARY KEY (`event_num`),
  KEY `user_id` (`user_id`),
  KEY `event_num` (`event_num`),
  CONSTRAINT `looklendar_calendar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `looklendar_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `looklendar_calendar`
--

LOCK TABLES `looklendar_calendar` WRITE;
/*!40000 ALTER TABLE `looklendar_calendar` DISABLE KEYS */;
INSERT INTO `looklendar_calendar` VALUES (1,'프로젝트 제출하는 날!','#d64b4b','2020-06-28','집','test02'),(2,'프로젝트 마감 날','#2969e0','2020-06-29',NULL,'test02'),(3,'생일이다!','#d64b4b','2020-06-05',NULL,'test02'),(4,'생일날 룩','#a29bfe','2020-06-05','화양리','test02'),(5,'독서퀴즈 4시','#ff9f43','2020-06-09',NULL,'test02'),(6,'등교한날 옷','#3ed34b','2020-06-16','세종대','test02'),(7,'테스트','#d64b4b','2020-07-16',NULL,'test02'),(8,'테스트2','#2969e0','2020-08-11',NULL,'test02'),(9,'24즈 모임','#feca57','2020-06-29','건대','test01'),(10,'메이플 룩','#3ed34b','2020-06-27','헤네시스','test01'),(11,'데이터베이스 보고서 제출 마감','#d64b4b','2020-06-29',NULL,'test01'),(12,'야호 보고서 끝내는 날','#a29bfe','2020-06-28','희원이 집','test01'),(13,'세계사 시험','#2969e0','2020-06-19','null','test01'),(14,'효창공원 다녀온날','#2969e0','2020-06-01','효창공원','test02'),(15,'LMML 갔다온날','#d64b4b','2020-06-13','홍대','test02'),(16,'배스킨라빈스 알바','#d64b4b','2020-06-21','배스킨라빈스 광장현대점','test01'),(17,'친구 연애하게 해준 날','#3ed34b','2020-06-01',NULL,'test01'),(18,'광주로 출발~','#a29bfe','2020-07-06',NULL,'test01'),(19,'재완이 생일파티','#636e72','2020-07-02',NULL,'test01'),(20,'언니 만난 날!','#d64b4b','2020-06-11','이태원','test03'),(21,'캠핑카 초록이','#3ed34b','2020-06-01','캠핑카','test03'),(22,'이별 2주년...','#ff9f43','2020-06-25','null','test01'),(23,'데이터베이스 프로젝트 발표','#2969e0','2020-06-25','연구실','admin'),(24,'데이터베이스 프로젝트 마감','#d64b4b','2020-06-29','연구실','admin'),(25,'프로젝트 발표!!','#a29bfe','2020-06-25','null','test02'),(26,'데이터베이스 영상..마감..','#feca57','2020-06-22','ㅠㅠ','admin'),(27,'사망룩','#feca57','2020-06-22','희원이 집','admin'),(28,'뮤뱅 촬영','#3ed34b','2020-06-28','null','test04'),(29,'인기가요 녹방','#ff9f43','2020-06-27',NULL,'test04'),(30,'성동구 상민한마음 축제','#ff9f43','2020-06-23','송정동','test04'),(31,'멤버들과 바다가기','#3ed34b','2020-06-17',NULL,'test04'),(32,'볼링~','#a29bfe','2020-06-19',NULL,'test04'),(33,'청순룩','#d64b4b','2020-06-28','','test04'),(34,'운동룩','#636e72','2020-06-25','','test04');
/*!40000 ALTER TABLE `looklendar_calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `looklendar_comment`
--

DROP TABLE IF EXISTS `looklendar_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `looklendar_comment` (
  `comment_num` int NOT NULL AUTO_INCREMENT,
  `comment_text` varchar(100) NOT NULL,
  `comment_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` varchar(20) NOT NULL,
  `dailylook_num` int NOT NULL,
  PRIMARY KEY (`comment_num`),
  KEY `user_id` (`user_id`),
  KEY `dailylook_num` (`dailylook_num`),
  KEY `comment_num` (`comment_num`),
  CONSTRAINT `looklendar_comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `looklendar_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `looklendar_comment_ibfk_2` FOREIGN KEY (`dailylook_num`) REFERENCES `looklendar_dailylook` (`dailylook_num`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `looklendar_comment`
--

LOCK TABLES `looklendar_comment` WRITE;
/*!40000 ALTER TABLE `looklendar_comment` DISABLE KEYS */;
INSERT INTO `looklendar_comment` VALUES (1,'안에 티는 로카티 ?','2020-06-28 05:35:53','test04',1),(2,'ㄴ 아니요 ㅎㅎ 로카프 공군이에요','2020-06-28 05:36:29','test01',1),(3,'핏 좋으시네요!','2020-06-28 05:46:44','test02',3),(4,'귀엽네여 ^_^','2020-06-28 05:47:28','test02',1),(5,'컨버스 정확한 모델명 궁금해요 ㅠㅠ','2020-06-28 05:50:39','test01',4),(6,'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ말투가 재밌으시네요','2020-06-28 05:51:19','test03',7),(7,'이쁘네요 !','2020-06-28 05:52:03','test03',5),(8,'예쁘시네요 ^^','2020-06-28 05:56:02','test01',8),(9,'운영자님들 진짜 멋있습니다!!!!!!!','2020-06-28 05:56:32','test01',9),(10,'게시판 진짜 활발하고 재밌네요 ㅋㅋㅋㅋㅋ 이런 사이트 만들어주셔서 감사합니다~!','2020-06-28 05:58:06','test03',9),(11,'Wow so nice people~ I think this site is great! Thank you so much!','2020-06-28 05:58:15','mrbmrb',9),(12,'Can I take your number?','2020-06-28 05:59:08','mrbmrb',10),(13,'ㄴ Sorry, I forgot my phone number...','2020-06-28 06:00:14','test03',10),(14,'그러지 마세요!','2020-06-28 06:00:44','hello123',8),(15,'위에 분 댓글 운영자님이 삭제하신듯.. ','2020-06-28 06:00:58','hello123',8),(16,'ㄴ 그러게요 저런 댓글을 왜 쓰시지... 운영자님들이 일을 참 잘하시는 듯 ㅎㅎ','2020-06-28 06:01:30','test01',8),(17,'진짜 멋있어요 !! 나라지키는 사람 멋있는 사람 ~~!!','2020-06-28 06:05:10','test03',11),(18,'혹시 목걸이 스펙 공유 가능하신가요 ?','2020-06-28 06:06:08','test03',10),(19,'이때 방탄 왔다던데 ㅠㅠ 부럽다','2020-06-28 06:15:04','sangmin34',16),(20,'ㄴ 이때 사람 진짜 많아서 아침일찍 온 거 아니면 못봤다네요 ㅠ 방탄 목소리만 들었다는...','2020-06-28 06:15:48','hello123',16),(21,'진짜 멋있네요 ㅠ','2020-06-28 06:16:11','hello123',17),(22,'메이플 아쿠아리움 인가요 ?','2020-06-28 06:16:47','hello123',6),(23,'ㄴ 노..잼...','2020-06-28 06:17:04','test04',6),(24,'저도 뉴욕 다녀왔는데 사람 정말 많더라구요..','2020-06-28 06:19:37','test03',16),(25,'뮤뱅에서 봐여 ^^','2020-06-28 06:20:45','test04',18);
/*!40000 ALTER TABLE `looklendar_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `looklendar_dailylook`
--

DROP TABLE IF EXISTS `looklendar_dailylook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `looklendar_dailylook` (
  `dailylook_num` int NOT NULL AUTO_INCREMENT,
  `dailylook_title` varchar(45) NOT NULL,
  `dailylook_text` text NOT NULL,
  `dailylook_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dailylook_outer` varchar(45) DEFAULT NULL,
  `dailylook_top` varchar(45) NOT NULL,
  `dailylook_bot` varchar(45) NOT NULL,
  `dailylook_shoes` varchar(45) NOT NULL,
  `dailylook_acc` varchar(45) DEFAULT NULL,
  `dailylook_view` int NOT NULL DEFAULT '0',
  `dailylook_photo` varchar(100) DEFAULT NULL,
  `user_id` varchar(20) NOT NULL,
  PRIMARY KEY (`dailylook_num`),
  KEY `user_id` (`user_id`),
  KEY `dailylook_num` (`dailylook_num`),
  KEY `dailylook_title` (`dailylook_title`),
  CONSTRAINT `looklendar_dailylook_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `looklendar_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `looklendar_dailylook`
--

LOCK TABLES `looklendar_dailylook` WRITE;
/*!40000 ALTER TABLE `looklendar_dailylook` DISABLE KEYS */;
INSERT INTO `looklendar_dailylook` VALUES (1,'부끄럽네요 ^^ 집에서 찰칵 ^^','집에서 찍었습니다','2020-06-28 05:31:53','','가디건','축구 트레이닝복 반바지','맨발 ^^','',11,'20200628053153308179_lp_image.jpeg','test01'),(2,'산뜻한 룩','좋은 하루네요 저는 친구들과 함께 놀았어요~\n호랑이 어흥~','2020-06-28 05:35:21','','보세','디스커버리','루이비똥','구찌 귀걸이',9,'20200628053521966517_IMG_4787.jpeg','test04'),(3,'더운 날이네요 ^^','룩클 여러분 잘 지내시나요 ?\n\n요즘 날씨가 너무 덥네요 ㅠㅠ\n\n오늘 제 데일리룩입니당~','2020-06-28 05:42:06','','린넨 셔츠','보세 슬렉스','샌들','',4,'20200628054206647295_2368FE3A593121BB28.jpeg','hello123'),(4,'우디집 카페 추천해요!','xx동 우디집 카페 추천합니다. 서울숲 쪽이에요','2020-06-28 05:43:50','','유핑','시그니처','컨버스','보세 백팩',7,'20200628054350685195_우디집 카페 룩.jpg','test02'),(5,'LMML 스튜디오','LMML 브랜드샵 다녀왔어요 ㅎㅅㅎ','2020-06-28 05:44:40','코스','쿠어','시그니처','조셉트','',3,'20200628054440349357_KakaoTalk_20200621_175627411_02.jpg','test02'),(6,'해운대 아쿠아리움','아콰리움','2020-06-28 05:46:22','쿠어 코트','쿠어 니트','앤더슨벨','조셉트 독일군','casetify 폰케이스',3,'20200628054622199833_KakaoTalk_20200621_175627411_01.jpg','test02'),(7,'술 한잔 했습니다 .....','술 한잔 했..딸꾺... 습니달꾺.....\n\n여러분......이 게시판 좋네...딸꾺.. 좋네요............\n\n여러분들은.....>딸꾺... 사랑>........딸꾺..쟁..취.........하세요.........','2020-06-28 05:49:55','','술','한','잔','',5,'20200628054955875563_IMG_4994.jpeg','test01'),(8,'메뚜기 룩','캠핑카 다녀왔습니다 ㅎ_ㅎ','2020-06-28 05:54:55','베트멍 패딩','보세','아크네','컨버스','아크네 목도리',7,'20200628055455467461_크리스탈.jpg','test03'),(9,'여러분 감사합니다','여러분의 성원이 힘입어 LooKlendar가 오픈하게 되었습니다.\n모두 여러분 덕분입니다.\n항상 더 발전하는 룩클린더가 되겠습니다.','2020-06-28 05:55:12','','룩','클','린','더',21,'20200628055512531140_스크린샷 2020-06-28 오전 5.53.52.png','admin'),(10,'저희 언니에요 ^-^','닮았나요?','2020-06-28 05:57:14','질샌더 블레이저','질샌더 셔츠','보세','구찌 로퍼','',13,'20200628055714939985_제시카 크리스탈.png','test03'),(11,'군대룩','안녕하세요 옛날 일병 시절 룩입니다.\n\n전부 공짜로 받았습니다 충성^^7','2020-06-28 06:04:23','','전투복 상의','전투복 하의','전투화','군번줄 + 고무링',6,'20200628060423837442_IMG_4964.jpeg','sangmin34'),(15,'뉴욕~','뉴욕 화장실에서 찍었습니다\n진짜 좋더라구요!!','2020-06-28 06:13:10','보세 야상패딩','니트','청바지','루이비똥','비니',5,'20200628061310301163_beauty_1577905562620.jpeg','newyork'),(16,'뉴욕 1월 1일 볼드랍','1월 1일 되기 직전 볼드랍 장면입니다 \n룩클 여러분과 공유하고 싶어서 글 남겨요 ㅎㅎ','2020-06-28 06:14:32','','볼','드','랍','',4,'20200628061432781957_IMG_0317.jpeg','newyork'),(17,'김구 선생님 뵙고 왔습니다!','효창공원 백범 김구 묘 다녀왔어요.','2020-06-28 06:15:35','','앤더슨벨','앤더슨벨','컨버스','마스크',6,'20200628061535178859_20200628054852582754_효창공원 룩.jpg','test02'),(18,'화보 찍고 왔어요 ㅎㅎㅎ','keds 화보 찍었습니당','2020-06-28 06:18:29','','keds 원피스','원피스','keds 운동화','',4,'20200628061829162058_20200628060615267821_화보.jpg','test03');
/*!40000 ALTER TABLE `looklendar_dailylook` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `looklendar_like`
--

DROP TABLE IF EXISTS `looklendar_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `looklendar_like` (
  `dailylook_num` int NOT NULL,
  `user_id` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`,`dailylook_num`),
  KEY `dailylook_num` (`dailylook_num`),
  CONSTRAINT `looklendar_like_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `looklendar_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `looklendar_like_ibfk_2` FOREIGN KEY (`dailylook_num`) REFERENCES `looklendar_dailylook` (`dailylook_num`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `looklendar_like`
--

LOCK TABLES `looklendar_like` WRITE;
/*!40000 ALTER TABLE `looklendar_like` DISABLE KEYS */;
INSERT INTO `looklendar_like` VALUES (1,'test02'),(2,'hello123'),(2,'test01'),(2,'test02'),(2,'test03'),(2,'test04'),(3,'hello123'),(4,'test01'),(4,'test02'),(4,'test03'),(5,'test02'),(5,'test03'),(7,'test01'),(7,'test03'),(8,'hello123'),(8,'test01'),(9,'admin'),(9,'mrbmrb'),(9,'test01'),(9,'test04'),(10,'test03'),(11,'sangmin34'),(11,'test02'),(11,'test03'),(15,'newyork'),(15,'test03'),(16,'hello123'),(16,'test03'),(18,'test03');
/*!40000 ALTER TABLE `looklendar_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `looklendar_look`
--

DROP TABLE IF EXISTS `looklendar_look`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `looklendar_look` (
  `look_num` int NOT NULL,
  `look_photo` varchar(100) NOT NULL,
  `look_s_photo` varchar(102) NOT NULL,
  `look_outer` varchar(45) DEFAULT NULL,
  `look_top` varchar(45) NOT NULL,
  `look_bot` varchar(45) NOT NULL,
  `look_shoes` varchar(45) NOT NULL,
  `look_acc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`look_num`),
  KEY `look_num` (`look_num`),
  CONSTRAINT `looklendar_look_ibfk_1` FOREIGN KEY (`look_num`) REFERENCES `looklendar_calendar` (`event_num`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `looklendar_look`
--

LOCK TABLES `looklendar_look` WRITE;
/*!40000 ALTER TABLE `looklendar_look` DISABLE KEYS */;
INSERT INTO `looklendar_look` VALUES (4,'20200628053923895169_우디집 카페 룩.jpg','S-20200628053923895169_우디집 카페 룩.jpg','','유핑','시그니처','컨버스','보세 가방'),(6,'20200628054112141859_heewon.png','S-20200628054112141859_heewon.png','','칸코','시그니처','조셉트',''),(10,'20200628054619126223_IMG_5011.jpeg','S-20200628054619126223_IMG_5011.jpeg','','초록색 멜빵 한벌','한벌옷','투명신발','투명모자'),(14,'20200628054852582754_효창공원 룩.jpg','S-20200628054852582754_효창공원 룩.jpg','','앤더슨벨','앤더슨벨','컨버스',''),(15,'20200628055008456977_20200628054440349357_KakaoTalk_20200621_175627411_02.jpg','S-20200628055008456977_20200628054440349357_KakaoTalk_20200621_175627411_02.jpg','코스','쿠어','시그니처','조셉트',''),(20,'20200628060058949011_제시카 크리스탈.png','S-20200628060058949011_제시카 크리스탈.png','질샌더','질샌더','보세','컨버스',''),(21,'20200628060143009521_크리스탈.jpg','S-20200628060143009521_크리스탈.jpg','베트멍 패딩','보세','아크네','컨버스','아크네 목도리'),(27,'20200628060839691120_스크린샷 2020-06-28 오전 5.53.52.png','S-20200628060839691120_스크린샷 2020-06-28 오전 5.53.52.png','','반팔 티','축구반바지','양말',''),(33,'20200628061941339399_IMG_4961.jpeg','S-20200628061941339399_IMG_4961.jpeg','','나시','팬츠','맨발',''),(34,'20200628062015905096_KakaoTalk_Photo_2020-05-26-19-37-05.jpeg','S-20200628062015905096_KakaoTalk_Photo_2020-05-26-19-37-05.jpeg','','나이키 트레이닝복 져지','아디다스 트레이닝복','퓨마','');
/*!40000 ALTER TABLE `looklendar_look` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `looklendar_user`
--

DROP TABLE IF EXISTS `looklendar_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `looklendar_user` (
  `user_id` varchar(20) NOT NULL,
  `user_pw` varchar(100) NOT NULL,
  `user_email` varchar(30) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_nickname` varchar(20) NOT NULL,
  `user_birth` date DEFAULT NULL,
  `user_gender` tinyint NOT NULL DEFAULT '1',
  `user_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_photo` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `looklendar_user`
--

LOCK TABLES `looklendar_user` WRITE;
/*!40000 ALTER TABLE `looklendar_user` DISABLE KEYS */;
INSERT INTO `looklendar_user` VALUES ('admin','pbkdf2:sha256:150000$7wXNQDxl$74c02e8e537e50f197230352aa9bfeb07284da51d95edb112f8cf63d2d9e472e','looklendar@gmail.com','운영자','운영자','1997-01-01',1,'2020-06-28 05:12:37','look_default.png'),('hello123','pbkdf2:sha256:150000$LQFlvfJR$eb5dcd78e87ff450ae432dc0fb16964ad07e2fffa2d1f61a4512b3845adff148','hello@hello.com','이하이','하이염!',NULL,2,'2020-06-28 05:37:39','user_image1.jpg'),('mrbmrb','pbkdf2:sha256:150000$UoJGn889$46e70af714940fd1cf9ade5dc488e81d017360b2e530ed21a24d7942374773a1','mrb@gmail.com','Johnsen Bee','Mr.B zolema',NULL,1,'2020-06-28 05:57:25','user_image1.jpg'),('newyork','pbkdf2:sha256:150000$9N6DQfGA$3e90d710ce4bf9a6952e90c2a42af350e5e92032064874df4a272a579e4dca3c','new@york.com','뉴욕간상민','뉴요커',NULL,1,'2020-06-28 06:09:14','user_image1.jpg'),('sangmin34','pbkdf2:sha256:150000$NVoIe31v$85e712372319dd97512b6bf48e5098e7dd74c38850914def4c5e88ecb07b976f','tkdals2ekd@naver.com','이상민','진짜이상민','1997-11-25',1,'2020-06-28 05:29:31','user_image1.jpg'),('test01','pbkdf2:sha256:150000$kVhZCrOf$c3d198cb2344ef490a861feaf5fc488220002ff38418bc11bfe5663fa06a04c1','test01@looklendar.com','이상민','상민이는자몽이좋아','1997-11-25',1,'2020-06-28 05:12:37','sangmin.jpeg'),('test02','pbkdf2:sha256:150000$qkqb0wCM$4e2f6d6da9f0b7230b5fcc2416f56924d7603c54d42b27011be6f4cd13bfb239','test02@looklendar.com','임희원','이미원','1997-06-05',1,'2020-06-28 05:12:37','heewon.png'),('test03','pbkdf2:sha256:150000$WTXrtDTr$3c794903e9d0d9e4fcd91110569d2c67fabdaaac2ed5295fcf05cd395e7e2f29','test03@looklendar.com','김수정','크리스탈','1998-10-22',2,'2020-06-28 05:12:37','hayoung.jpeg'),('test04','pbkdf2:sha256:150000$UZS25xCa$cebf280e12f551ff1afbe8ee1478c1fe2929c1804d2fbc199182ce5e44c8e472','test04@looklendar.com','송하영','송하빵','1997-09-29',2,'2020-06-28 05:12:37','look_default.png');
/*!40000 ALTER TABLE `looklendar_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `v_looklendar_look`
--

DROP TABLE IF EXISTS `v_looklendar_look`;
/*!50001 DROP VIEW IF EXISTS `v_looklendar_look`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_looklendar_look` AS SELECT 
 1 AS `event_num`,
 1 AS `event_title`,
 1 AS `event_color`,
 1 AS `user_id`,
 1 AS `event_date`,
 1 AS `event_place`,
 1 AS `look_photo`,
 1 AS `look_s_photo`,
 1 AS `look_outer`,
 1 AS `look_top`,
 1 AS `look_bot`,
 1 AS `look_shoes`,
 1 AS `look_acc`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_looklendar_user`
--

DROP TABLE IF EXISTS `v_looklendar_user`;
/*!50001 DROP VIEW IF EXISTS `v_looklendar_user`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_looklendar_user` AS SELECT 
 1 AS `user_id`,
 1 AS `user_email`,
 1 AS `user_name`,
 1 AS `user_nickname`,
 1 AS `user_birth`,
 1 AS `user_gender`,
 1 AS `user_date`,
 1 AS `user_photo`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_looklendar_look`
--

/*!50001 DROP VIEW IF EXISTS `v_looklendar_look`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_looklendar_look` AS select `cal`.`event_num` AS `event_num`,`cal`.`event_title` AS `event_title`,`cal`.`event_color` AS `event_color`,`cal`.`user_id` AS `user_id`,concat(year(`cal`.`event_date`),'-',if((length(month(`cal`.`event_date`)) <> 2),concat('0',month(`cal`.`event_date`)),month(`cal`.`event_date`)),'-',if((length(dayofmonth(`cal`.`event_date`)) <> 2),concat('0',dayofmonth(`cal`.`event_date`)),dayofmonth(`cal`.`event_date`))) AS `event_date`,`cal`.`event_place` AS `event_place`,`lo`.`look_photo` AS `look_photo`,`lo`.`look_s_photo` AS `look_s_photo`,`lo`.`look_outer` AS `look_outer`,`lo`.`look_top` AS `look_top`,`lo`.`look_bot` AS `look_bot`,`lo`.`look_shoes` AS `look_shoes`,`lo`.`look_acc` AS `look_acc` from (`looklendar_calendar` `cal` join `looklendar_look` `lo` on((`cal`.`event_num` = `lo`.`look_num`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_looklendar_user`
--

/*!50001 DROP VIEW IF EXISTS `v_looklendar_user`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_looklendar_user` AS select `looklendar_user`.`user_id` AS `user_id`,`looklendar_user`.`user_email` AS `user_email`,`looklendar_user`.`user_name` AS `user_name`,`looklendar_user`.`user_nickname` AS `user_nickname`,`looklendar_user`.`user_birth` AS `user_birth`,`looklendar_user`.`user_gender` AS `user_gender`,`looklendar_user`.`user_date` AS `user_date`,`looklendar_user`.`user_photo` AS `user_photo` from `looklendar_user` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-28  6:23:48
