﻿using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System.Diagnostics;
using System.Text;
using web_scraping_csharp.Controllers;
using web_scraping_csharp.Services;

namespace web_scraping_csharp
{
    public partial class Form1 : Form
    {
        //những method khác có điều kiện là khi label 2 là Kết quả thì sẽ dừng vòng lặp đang chạya
        void RunChromeAllPages()
        {
            TableResult.Clear();
            TableTitle.Text = "Đang tiến hành cào dữ liệu (lưu ý: không ẩn trình duyệt chrome)";
            //tạm thời tắt tính năng ấn vào nút để tránh trường hợp cào chồng lên nhau
            CrawlSomePagesButton.Enabled = false;
            CrawlAllPagesButton.Enabled = false;
            StartPageNum.Enabled = false;
            PageRangeNum.Enabled = false;
            SaveToDbButton.Enabled = true;
            SaveToFileButton.Enabled = true;
            StopCrawl.Enabled = true;
            //chọn trang web muốn runChrome
            switch (ListCategories.Text)
            {
                case "Nhà đất bán":
                    RunChromeAllNhadatban();
                    break;
                case "Nhà đất cho thuê":
                    RunChromeAllNhadatchothue();
                    break;
                case "Dự án":
                    RunChromeAllDuan();
                    break;
                case "Tin tức":
                    RunChromeTintuc();
                    break;
                case "Wiki BĐS":
                    RunChromeWiki();
                    break;
                case "Phong Thủy":
                    RunChromePhongthuy();
                    break;
                case "Nội-Ngoại thất":
                    RunChromeNoingoaithat();
                    break;
                case "Nhà môi giới":
                    RunChromeAllNhamoigioi();
                    break;
                case "Doanh nghiệp":
                    RunChromeDoanhnghiep();
                    break;
                default:
                    break;
            }

            TableTitle.Text = "Kết quả";
            //bật lại tính năng nhấn vào nút
            CrawlSomePagesButton.Enabled = true;
            StartPageNum.Enabled = true;
            StopCrawl.Enabled = false;
            CrawlAllPagesButton.Enabled = true;
            PageRangeNum.Enabled = true;
        }

    }
}