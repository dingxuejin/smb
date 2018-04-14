-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2018-04-09 11:16:42
-- 服务器版本： 5.5.54-log
-- PHP Version: 5.4.45

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shangmaiba`
--

-- --------------------------------------------------------

--
-- 表的结构 `adpic`
--

CREATE TABLE IF NOT EXISTS `adpic` (
  `id` int(11) unsigned NOT NULL,
  `title` varchar(32) DEFAULT NULL,
  `pic` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `add_time` datetime DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `adpic`
--

INSERT INTO `adpic` (`id`, `title`, `pic`, `link`, `add_time`) VALUES
(1, '123123123', 'pic/2018-03-30/5abe3edf78115.jpg', 'ewrerwer', '2018-03-09 15:56:39');

-- --------------------------------------------------------

--
-- 表的结构 `allset`
--

CREATE TABLE IF NOT EXISTS `allset` (
  `id` int(11) unsigned NOT NULL,
  `price` int(11) DEFAULT NULL,
  `v_price` int(11) DEFAULT NULL,
  `a_price` int(11) DEFAULT NULL,
  `t_price` int(11) DEFAULT NULL,
  `sv_price` int(11) DEFAULT NULL,
  `sa_price` int(11) DEFAULT NULL,
  `st_price` int(11) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `allset`
--

INSERT INTO `allset` (`id`, `price`, `v_price`, `a_price`, `t_price`, `sv_price`, `sa_price`, `st_price`) VALUES
(1, 9, 9, 9, 9, 4, 4, 4);

-- --------------------------------------------------------

--
-- 表的结构 `chongzhi`
--

CREATE TABLE IF NOT EXISTS `chongzhi` (
  `id` int(11) unsigned NOT NULL,
  `openid` varchar(255) DEFAULT NULL,
  `p_price` int(11) DEFAULT NULL,
  `add_time` datetime DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `chongzhi`
--

INSERT INTO `chongzhi` (`id`, `openid`, `p_price`, `add_time`) VALUES
(1, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', 1, '2018-03-31 14:52:31'),
(2, 'oTFwI0Xq96DzeqRb33JqiXh2Gtwo', 4, '2018-03-31 15:43:36');

-- --------------------------------------------------------

--
-- 表的结构 `class1`
--

CREATE TABLE IF NOT EXISTS `class1` (
  `class_id` int(11) unsigned NOT NULL,
  `class_name` varchar(32) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `add_time` datetime DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `class1`
--

INSERT INTO `class1` (`class_id`, `class_name`, `pid`, `add_time`) VALUES
(9, '音频', 0, '2018-03-11 19:03:11'),
(51, '音乐视频', 37, '2018-03-23 21:12:32'),
(50, '娱乐视频', 37, '2018-03-23 21:12:31'),
(37, '视频', 0, '2018-03-11 22:08:58'),
(49, '新闻视频', 37, '2018-03-23 21:12:27'),
(48, '音频分类2', 9, '2018-03-23 19:27:06'),
(47, '音频分类1', 9, '2018-03-23 19:26:54'),
(46, '视频分类2', 37, '2018-03-23 19:26:42'),
(45, '视频分类1', 37, '2018-03-23 19:26:19'),
(52, '新分类', 47, '2018-04-03 11:41:26');

-- --------------------------------------------------------

--
-- 表的结构 `content`
--

CREATE TABLE IF NOT EXISTS `content` (
  `id` int(11) unsigned NOT NULL,
  `userid` varchar(32) DEFAULT NULL,
  `title` varchar(32) DEFAULT NULL COMMENT '房源名称',
  `class1` varchar(32) DEFAULT NULL COMMENT '区',
  `class2` varchar(32) DEFAULT NULL,
  `class3` varchar(32) DEFAULT NULL,
  `title_pic` text COMMENT '照片',
  `content` text COMMENT '备注',
  `state` varchar(32) DEFAULT NULL COMMENT '0已审核1待审核2未通过',
  `add_time` datetime DEFAULT NULL COMMENT '添加时间',
  `click` int(11) DEFAULT NULL COMMENT '点击量',
  `collection` int(11) DEFAULT NULL COMMENT '收藏量',
  `on_show` int(11) DEFAULT '0' COMMENT '0上架/1下架',
  `ishot` int(11) DEFAULT NULL COMMENT '0普通/1推荐',
  `link` text,
  `p_price` int(11) DEFAULT NULL COMMENT '观看价格',
  `s_price` int(11) DEFAULT NULL COMMENT '分享价格',
  `pinglun` int(11) NOT NULL DEFAULT '0',
  `shichang` int(11) NOT NULL DEFAULT '120',
  `2a` text
) ENGINE=MyISAM AUTO_INCREMENT=171 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `feedback`
--

CREATE TABLE IF NOT EXISTS `feedback` (
  `id` int(11) unsigned NOT NULL,
  `openid` varchar(255) DEFAULT NULL,
  `content` text,
  `add_time` datetime DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `feedback`
--

INSERT INTO `feedback` (`id`, `openid`, `content`, `add_time`) VALUES
(5, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', '地对地导弹', '2018-03-30 16:43:07');

-- --------------------------------------------------------

--
-- 表的结构 `kongzhi`
--

CREATE TABLE IF NOT EXISTS `kongzhi` (
  `id` int(11) unsigned NOT NULL,
  `show` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `liushui`
--

CREATE TABLE IF NOT EXISTS `liushui` (
  `id` int(11) unsigned NOT NULL,
  `class` varchar(11) DEFAULT NULL,
  `content_id` int(11) DEFAULT NULL,
  `openid` varchar(32) DEFAULT NULL,
  `rent` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `add_time` datetime DEFAULT NULL,
  `leibie` int(11) DEFAULT NULL COMMENT '0售出/1分享加/2购买/3分享减/4充值'
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `liushui`
--

INSERT INTO `liushui` (`id`, `class`, `content_id`, `openid`, `rent`, `content`, `add_time`, `leibie`) VALUES
(1, '+', 61, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', 123, '所有的资金流水记录描述', '2018-03-22 00:00:00', 0),
(2, '-', 61, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', 123, '所有的资金流水记录描述', '2018-03-22 00:00:00', 0),
(3, '+', 73, '0', 5, '资源售出', '2018-03-31 13:46:17', 0),
(4, '-', 73, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', 5, '购买资源', '2018-03-31 13:46:17', 2),
(5, '+', 74, '0', 5, '资源售出', '2018-03-31 13:53:15', 0),
(6, '-', 74, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', 5, '购买资源', '2018-03-31 13:53:15', 2),
(7, '+', 58, '0', 1, '资源售出', '2018-03-31 15:10:05', 0),
(8, '-', 58, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', 1, '购买资源', '2018-03-31 15:10:05', 2),
(9, '+', 55, '0', 1, '资源售出', '2018-03-31 15:10:46', 0),
(10, '-', 55, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', 1, '购买资源', '2018-03-31 15:10:46', 2),
(11, '+', 66, '0', 1, '资源售出', '2018-03-31 15:11:28', 0),
(12, '-', 66, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', 1, '购买资源', '2018-03-31 15:11:28', 2);

-- --------------------------------------------------------

--
-- 表的结构 `order1`
--

CREATE TABLE IF NOT EXISTS `order1` (
  `order_id` int(11) unsigned NOT NULL,
  `content_id` int(11) DEFAULT NULL,
  `openid` varchar(355) DEFAULT NULL,
  `p_price` float DEFAULT NULL,
  `add_time` datetime DEFAULT NULL,
  `tj_openid` varchar(255) DEFAULT NULL,
  `s_price` float DEFAULT NULL,
  `userid` varchar(255) DEFAULT NULL COMMENT '发布者'
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `order1`
--

INSERT INTO `order1` (`order_id`, `content_id`, `openid`, `p_price`, `add_time`, `tj_openid`, `s_price`, `userid`) VALUES
(1, 61, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', 123, '2018-03-29 00:00:00', NULL, NULL, '0'),
(2, 67, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', 123, '2018-03-01 00:00:00', NULL, NULL, '0'),
(3, 68, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', NULL, NULL, NULL, NULL, '0'),
(4, 69, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', NULL, NULL, NULL, NULL, '0'),
(5, 73, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', 5, '2018-03-31 13:46:17', NULL, 0, '0'),
(6, 74, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', 5, '2018-03-31 13:53:15', NULL, 0, '0'),
(7, 58, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', 1, '2018-03-31 15:10:05', NULL, 0, '0'),
(8, 55, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', 1, '2018-03-31 15:10:46', NULL, 0, '0'),
(9, 66, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', 1, '2018-03-31 15:11:28', NULL, 0, '0');

-- --------------------------------------------------------

--
-- 表的结构 `pinglun`
--

CREATE TABLE IF NOT EXISTS `pinglun` (
  `id` int(11) unsigned NOT NULL,
  `content_id` int(11) DEFAULT NULL,
  `openid` varchar(32) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `add_time` datetime DEFAULT NULL,
  `zan` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `pinglun`
--

INSERT INTO `pinglun` (`id`, `content_id`, `openid`, `content`, `add_time`, `zan`) VALUES
(3, 61, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', '很好看', '2018-03-29 14:07:28', 0),
(4, 61, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', '很好看的的', '2018-03-29 14:14:19', 0),
(5, 61, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', '不错', '2018-03-29 15:24:39', 0),
(6, 61, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', '111', '2018-03-29 15:25:52', 0),
(7, 61, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', '很不错', '2018-03-29 15:30:13', 0),
(8, 61, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', 'kkkkkkk', '2018-03-29 15:31:53', 0),
(9, 61, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', 'ccc', '2018-03-29 15:33:59', 0),
(10, 61, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', '11111', '2018-03-29 15:53:48', 0),
(11, 67, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', '精彩', '2018-03-30 13:38:46', 0),
(12, 67, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', '很听', '2018-03-30 15:35:02', 0),
(13, 166, 'oTFwI0Xq96DzeqRb33JqiXh2Gtwo', '很好', '2018-04-03 15:56:07', 0);

-- --------------------------------------------------------

--
-- 表的结构 `tixian`
--

CREATE TABLE IF NOT EXISTS `tixian` (
  `id` int(11) unsigned NOT NULL,
  `openid` varchar(255) DEFAULT NULL,
  `money` int(11) DEFAULT NULL,
  `wechat` varchar(32) DEFAULT NULL,
  `add_time` datetime DEFAULT NULL,
  `state` varchar(32) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `tixian`
--

INSERT INTO `tixian` (`id`, `openid`, `money`, `wechat`, `add_time`, `state`) VALUES
(6, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', 44, 'wecan', '2018-03-30 18:45:03', '已结款'),
(5, 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', 1, 'we', '2018-03-30 18:44:52', '已结款');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) unsigned NOT NULL,
  `nickname` varchar(32) DEFAULT NULL,
  `openid` varchar(32) DEFAULT NULL,
  `parent_id` varchar(32) DEFAULT '0' COMMENT '推荐人ID',
  `head_img` varchar(256) DEFAULT NULL,
  `phone` varchar(16) DEFAULT NULL,
  `add_time` datetime DEFAULT NULL,
  `token` varchar(256) DEFAULT NULL,
  `name` varchar(32) DEFAULT NULL,
  `idnum` varchar(32) DEFAULT NULL,
  `idpic` varchar(246) DEFAULT NULL,
  `money` float DEFAULT '0',
  `money_all` int(11) NOT NULL DEFAULT '0',
  `state` varchar(32) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=74 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `nickname`, `openid`, `parent_id`, `head_img`, `phone`, `add_time`, `token`, `name`, `idnum`, `idpic`, `money`, `money_all`, `state`) VALUES
(62, '守信', 'oTFwI0Xq96DzeqRb33JqiXh2Gtwo', '0', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTImo6AE67mJZwrPQyxeu87FsXDgZOr3M4conukgJzL6Micbw3BgE2dIfFvEjhulfGE2LIxAe90XjPw/0', NULL, '2018-03-31 15:29:26', 'UotiyGBmHCM9LMOoftshPNN2s8R0Pkv99pS7vTUDW6c8iqWXkPEz2S2UrklG4ggD6yb2Sv5f1IOKya7jqcjSvLdmwYt1Fa4c9FEsBa72ildgWL0MoJ5jVJ6R80idANQaTU2UuAncl0TIbjUZtqJOzf67GPLG21hmlJGgJuTvVdDwWYWPO64NMAlSPwYhXG4JQaq05JVqmZnJnKZCgtQstBKIx9qUfU4vvUW04hQRHD0vNpxuiNmbOxkM6a7MuBHp', NULL, NULL, NULL, 4, 0, '未认证'),
(59, '上麦吧', '0', '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 13, 13, NULL),
(67, 'A0-灵魂摆渡', 'oTFwI0ZOiYG9t5tZavrfMmYBofLA', '0', 'https://wx.qlogo.cn/mmopen/vi_32/7kmHAcpbQNUeMVicVDic2F8icrEQCK9knnmgwevlzeIOMjibtgUqJXMnFqMkicpfdsvmSW3N4YDibsWJo0zibGyvo9bSQ/0', NULL, '2018-03-31 22:31:22', 'At0X10uDvmgMDHTxsRxQ1D6qC4TzZNvZGWm8mgci3Sv60O3S619x4Fo6aH6zU2Y1oLzbrbTUuOrV3VdAmMyQSmnttTsOmRga2fMUR5fMk67OrLOeXMugyh9sB2GojnYL2b6kGLwrh4F9fTND5Ij4qTWsl3g4QFgjgM3nY0eFujfaDtd8BXDsgZk1s1wJ6dsMqWzOmeUhYzR1tvAvSDny380VzX45AXiqjiF6WZOlZ6NS1NNjRBik9JG86bE7ymYh', NULL, NULL, NULL, 20, 0, '未认证'),
(63, '易程   专业app定制', 'oTFwI0QlovgVVc-huqip-pvHep_4', '0', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJGv4zdYM3t0WiaribnIzibNQiaxgNckIIZa8Epnq9JcG1fpQ3AToUXBW4kD7kY9xnyicbCyyFNwBFsMQQ/0', NULL, '2018-03-31 15:56:39', 'efjlRGg2Dxowve9TLtIsQInVXjZDfqZU5JFnPmPTjEQfjpyujHnAPaVcUkfAaFUGO0u4MKnvOEayt9sdhgdwRy9bjOcUUx19XVD95r5kvGipgb2XRGT8FsKoHmJ2kaBHvFh1wNLsTuhA5KXmRgVW95LhSUJDuKKqPsSMF3EZXmZtxmgO3BaD7lkqGttAEErUwJ6Bdb1BYruVda9HbKLJvvzCpsCtwtOtDlvgWWhkNbFrMfznpKxlFwnvpqpmkDfn', NULL, NULL, NULL, 0, 0, '未认证'),
(64, 'rdgztest_DWOMTK', 'oTFwI0adv8qTLBnPPBsXcC7DhFjY', '0', '', NULL, '2018-03-31 19:06:35', 'BUpNpHeTCkRnuEkeIEUXpjh1XSGtowuqQjDGqhZt2hgXl1Bu5WRVFzm3RtXGpRwGAANrickLU18GtaAYwSkCR668ZtePLbWLb9DTMn46PCcIcc79uRcLoJkODZ4OAq0cZ3vbR0H63kfGWMgR4S2T1N75cCjdsJPRcLttbA0FlFLHSrYnKrGcEeHhgrU8A9qdlj7Xkx25CedV6BIhtPTyt1faSAITazwVj3i31Kz4pcpVeyC8NW6HnMhGMqZmpWH8', NULL, NULL, NULL, 0, 0, '未认证'),
(65, 'rdgztest_RTEPAP', 'oTFwI0Wmf54L9a7es-Y7N-YhWsPk', '0', '', NULL, '2018-03-31 21:17:59', 'cIexOCUnn3FAg75rAh4jMYPJv5iAUEoxM3v05POTjUT0roRr6mbiKqrGWaHheweqZaQvp5O9p8zgXR8tDJbOA3VWD3DhZh7oSokHTygI7gpuxXnB7ZQ7sbtvFwc4eKTwyDESCl191R4ZeR0Mhgj9Sd5XaHsPSLLQPQ9SCAs3RWsweTJVzsuS6ZgG78Vpk7GzofSqgKTy6MvK5E55x0o3q4aXCwNn3TnRzFIfP1eme9wKe2gct4FjzgHCcVpGecXe', NULL, NULL, NULL, -1, 0, '未认证'),
(68, 'rdgztest_KOANYV', 'oTFwI0V1ZLEh46209r1yYKUyEjnY', '0', '', NULL, '2018-04-01 15:07:44', 'smiyCrzqbF8pxeaOFVE75kiDjXYS2MxUygSB7RsIX0xUF88Kuci0W03GosYQFWbDCtF9Lxi8Yfs3N1eIDW80nC6cvvsAR3EUXJu8GcH5RAy51ce4zMvnP1ZKXRKelOzIYth55pAnpzTQcxlbKgYZIo95FkKrzJAXCis87tWWsfd4dZFoF4NOSnjY8uP7DQuGynf5gBs8h6DUvIIAdWPwJzUhtaPxqKEpxjUekNN1jQmeZufCRuy1tTInuYkk8oa5', NULL, NULL, NULL, 0, 0, '未认证'),
(69, 'rdgztest_JXSKGO', 'oTFwI0aAjzVlJ7Dte19Jfl0zTD6A', '0', '', NULL, '2018-04-04 06:26:09', 'OTKcYOBqx5iHSyc8AZe470YcuK1ToNQD60fufglcM4j43WD3liySJWuE7WXV9dZFEEAjklVxPF2j15MNOK5Y702Emq0V4p18u1ReNdc3iEMJaZXo9sNHTfMG5c2z2t7WVpB82dCKiOUSdhHNaUVuz7A5K24dWCAhrBQUfS5Y7pgL7nZIIkCISDd25IGrLG9DHpXnIsLgisrPgQYoB0xT4amzjsruy0xGQVuYNGEwywMeNa3PB095BV4kOWfNmdUD', NULL, NULL, NULL, 0, 0, '未认证'),
(70, '热爱生活，拥抱人生', 'oTFwI0fh5NMTMxybFC2pRfaD-KQY', '0', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIsJn8LxgYAtxdkFxG9JB1YhHXKQrUHibg0yQEMyUIb6f1B1yZtQbicfHO4wM3X4TqdjsSbFk1vicyibA/0', NULL, '2018-04-04 15:06:49', 'OjGa8ZBZ5w9OEQ0NZmTGmkFA80xq6MYlv4W4uXt0U2eYiFbHruOefUeOkcFRo3CkyZOsnISHax6TDH0uCf9izNwjqBBf4EZ23eVRmeYWbugeCH9FmInmWj6Ml7rQbRiFvEWiikFTflyis7negb1CVxPG4HWGYFLUJ7CrSHLysJgkh4ZXGqZ1oe8TmuZLAa5JI8B0fMY8WFTDaj0g9qHY5fhRaG2ahykp6mQLzfkVkDZUmpBWgIkLo22Z8vAQtkGZ', NULL, NULL, NULL, 0, 0, '未认证'),
(71, 'sf796652', 'oTFwI0TGv9tS8Am1OwUgsZfUlmu4', '0', NULL, NULL, '2018-04-05 09:39:18', 'T05COXBtCQUx1yVl14dVUbVyXnPuHVg1mM4Aa6ucnO9OMvAe0dzkPUjdIy7PUOhG1MHBiCe5ROk4JlI9ZITe3CRcApsUE915l974cLAtZkX866Hvf1aJ3sl4iepmNRSzrp43A4XZPlylSFhx7RHAJt5r7Uelcwl3mPwmjUMyFLkXR1Voi2osWUkteYfQV0kHghuZBHYGSI49apXTSMLe6w8LVN2gdMoTuijvqICIR6hrVFLeRWSoTqAeD2UhfJB9', NULL, NULL, NULL, 0, 0, '未认证'),
(72, 'rdgztest_IHHEXO', 'oTFwI0bv-S9O8lYCNcJj18C2oEP8', '0', '', NULL, '2018-04-05 18:11:16', 'wlH41ZsURtokRVsItGJPHDrIQvcCw7vtTCYl1QFjKu32PWaJ2jYamPiCLVFIsACMD0x5hCOrxiUNEuW6dlG0Bp3NL8WD9YQdoNI5QXXNFh1JcogP9ngadJnoiJsR8IvWVDsc1Qq6yRgaFXqeK6PnfDcYN5gldbIzfAbGR1cPjSpogf3qMiesmQQzlwkZ7tZMtASK2v0LOPAuv3kHMZzygPy2LirjbQv5ROgkJGwXWwRR0BYc1YbHd99pS08uh4Zz', NULL, NULL, NULL, 0, 0, '未认证'),
(73, '黑黑', 'oTFwI0cGsG3sxgOFZN9eG4f4XAug', '0', 'https://wx.qlogo.cn/mmopen/vi_32/g02zZSR3IibjmDPibAeP77Y1jMwtuaULkKlX3097dzntBwsLw59ueJYQElNSNTUcw9negmj2p43bm0cOJWRcSjNQ/0', NULL, '2018-04-08 19:33:27', 'jlCZMJIE0FnQK6ENAVv7RqZX9zXWn9m7Vpw7yFbZKZfVvj9wE44VUtjtsGQggDNBsK9qPLP0avm6eV2jpwEJpnDiuTYaWccPmMFBXV2yQO5v9xeYuj8k7c31vrCS4e7QrdSPzkOQzjL8hqxc96WGIq8EiaXMPu3G8lV769o5SzEzpBbZ7y5goDk6eHjtCMzaxUI4twzMwDMmFnLdmhTblDIZLrSNDRoBcw55t5iq9ucfioS45bGQfOgqGyEJQsLs', NULL, NULL, NULL, 0, 0, '未认证');

-- --------------------------------------------------------

--
-- 表的结构 `yuyue`
--

CREATE TABLE IF NOT EXISTS `yuyue` (
  `id` int(11) unsigned NOT NULL,
  `openid` varchar(255) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `yu_time` varchar(32) DEFAULT NULL,
  `state` varchar(11) DEFAULT NULL,
  `add_time` datetime DEFAULT NULL,
  `pass` varchar(32) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `yuyue`
--

INSERT INTO `yuyue` (`id`, `openid`, `room_id`, `yu_time`, `state`, `add_time`, `pass`) VALUES
(11, 'omJHx0PEazotO77PVWy132hu934Y', 41, '2018-03-18 12:01:00', '待审核', '2018-03-18 14:28:45', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `zhuanfa`
--

CREATE TABLE IF NOT EXISTS `zhuanfa` (
  `id` int(11) unsigned NOT NULL,
  `tj_openid` varchar(255) DEFAULT NULL,
  `content_id` int(11) DEFAULT NULL,
  `add_time` datetime DEFAULT NULL,
  `openid` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adpic`
--
ALTER TABLE `adpic`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `allset`
--
ALTER TABLE `allset`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chongzhi`
--
ALTER TABLE `chongzhi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class1`
--
ALTER TABLE `class1`
  ADD PRIMARY KEY (`class_id`);

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kongzhi`
--
ALTER TABLE `kongzhi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `liushui`
--
ALTER TABLE `liushui`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order1`
--
ALTER TABLE `order1`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `pinglun`
--
ALTER TABLE `pinglun`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tixian`
--
ALTER TABLE `tixian`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `yuyue`
--
ALTER TABLE `yuyue`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zhuanfa`
--
ALTER TABLE `zhuanfa`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adpic`
--
ALTER TABLE `adpic`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `allset`
--
ALTER TABLE `allset`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `chongzhi`
--
ALTER TABLE `chongzhi`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `class1`
--
ALTER TABLE `class1`
  MODIFY `class_id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=53;
--
-- AUTO_INCREMENT for table `content`
--
ALTER TABLE `content`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=171;
--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `kongzhi`
--
ALTER TABLE `kongzhi`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `liushui`
--
ALTER TABLE `liushui`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `order1`
--
ALTER TABLE `order1`
  MODIFY `order_id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `pinglun`
--
ALTER TABLE `pinglun`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `tixian`
--
ALTER TABLE `tixian`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=74;
--
-- AUTO_INCREMENT for table `yuyue`
--
ALTER TABLE `yuyue`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `zhuanfa`
--
ALTER TABLE `zhuanfa`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
