﻿using MISA.WEB08.AMIS.COMMON.CustomAttribute;
using MISA.Web08.AMIS.COMMON.Enums;
using MISA.WEB08.AMIS.COMMON.Entities;
using MISA.WEB08.AMIS.COMMON.Resources;
using MISA.WEB08.AMIS.DL;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Drawing;
using System.ComponentModel.DataAnnotations;

namespace MISA.WEB08.AMIS.BL
{
    public class EmployeeBL : BaseBL<Employee>, IEmployeeBL
    {
        #region Field

        private IEmployeeDL _employeeDL;

        #endregion

        #region Constructor
        /// <summary>
        /// Hàm khởi tạo để tiêm phụ thuộc vào class
        /// </summary>
        /// <param name="employeeDL"></param>
        /// Created by : TNMANH (29/09/2022)
        public EmployeeBL(IEmployeeDL employeeDL) : base(employeeDL)
        {
            _employeeDL = employeeDL;
        }

        #endregion

        #region Method

        // Danh sách các API liên quan tới việc lấy thông tin của nhân viên
        #region GetMethod

        /// <summary>
        /// Method giúp trả về file excell danh sách nhân viên
        /// của class EmployeeExport
        /// </summary>
        /// <returns>File excell danh sách nhân viên</returns>
        /// Created by : TNMANH (06/10/2022)
        public byte[] GetExportEmployee()
        {

            var employeeList = _employeeDL.GetExportEmployee();

            // thêm license để dùng free
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;


            using (ExcelPackage package = new ExcelPackage())
            {
                // Nội dung của file excell
                #region ExcellContent

                // Tạo tên tác giả
                package.Workbook.Properties.Author = MISAExportResource.AuthorName;

                // Tạo 1 worksheet trong file đó
                var ws = package.Workbook.Worksheets.Add(MISAExportResource.WorksheetName);

                // Tùy chỉnh độ rộng của từng cột trong file
                #region ExcelColumnWidth
                
                ws.Columns[1].Width = GetTrueColumnWidth(4.29);
                ws.Columns[2].Width = GetTrueColumnWidth(15.29);
                ws.Columns[3].Width = GetTrueColumnWidth(26);
                ws.Columns[4].Width = GetTrueColumnWidth(12);
                ws.Columns[5].Width = GetTrueColumnWidth(15.29);
                ws.Columns[6].Width = GetTrueColumnWidth(26);
                ws.Columns[7].Width = GetTrueColumnWidth(26);
                ws.Columns[8].Width = GetTrueColumnWidth(15.29);
                ws.Columns[9].Width = GetTrueColumnWidth(26);

                #endregion

                // Tạo 1 hàng ngang từ A1 tới I1 để điền tiêu đề "DANH SÁCH NHÂN VIÊN"
                #region ExcelTitleFile

                ws.Cells["A1:I1"].Merge = true;
                ws.Cells["A1:I1"].Value = MISAExportResource.WorksheetName;
                ws.Cells["A1:I1"].Style.Font.SetFromFont("Arial", 16);
                ws.Cells["A1:I1"].Style.Font.Bold = true;
                ws.Cells["A1:I1"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                ws.Cells["A2:I2"].Merge = true;
                ws.Cells["A2:I2"].Style.Font.SetFromFont("Arial", 16);
                #endregion

                // Điền tên cho các cột của table và style
                #region ExcelColumnName

                // điền tiêu đề cột
                ws.Cells["A3"].Value = MISAExportResource.NumberCount;

                // lấy ra danh sách properties của class EmployeeExport
                var props = typeof(EmployeeExport).GetProperties();

                // Thực hiện vòng lặp để thêm tiêu đề cho từng ô B3, C3 trở đi
                for (int i = 0; i < props.Count(); i++)
                {
                    var propName = props[i].Name;
                    ws.Cells[3, i + 2].Value = MISAExportResource.ResourceManager.GetString(propName);
                    ws.Cells[3, i + 2].Style.Font.SetFromFont("Arial", 10);
                }

                // style cho các ô trong hàng 3 trên
                ws.Rows[3].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                ws.Rows[3].Style.Font.Bold = true;
                ws.Cells["A3:I3"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                ws.Cells["A3:I3"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                ws.Cells["A3:I3"].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                ws.Cells["A3:I3"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                ws.Cells["A3:I3"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                ws.Cells["A3:I3"].Style.Fill.BackgroundColor.SetColor(Color.LightGray);

                #endregion

                // Điền các giá trị cần thiết vào bảng, style cho content
                #region ExcelRowValue

                // điền số thứ tự cho cột bên trái
                for (int i = 1; i <= employeeList.Count(); i++)
                {
                    ws.Cells[$"A{i + 3}"].Value = i;
                    ws.Cells[$"A{i + 3}"].Style.Font.SetFromFont("Times New Roman", 11);
                    ws.Cells[$"A{i + 3}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
                }


                // Gán giá trị từ employeeList vào
                var range = ws.Cells["B4"].LoadFromCollection(employeeList);
                range.Style.Font.SetFromFont("Times New Roman", 11);
                range.Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;

                #endregion

                #region FormatColumn

                int lastRecord = employeeList.Count() + 4;

                // Format lại các trường như ngày tháng hay giới tinh, căn lề, bắt đầu từ số 4
                // vì trong excel index đánh từ 1 chứ k phải 0 như trong lập trình

                // Format cột ngày sinh
                ws.Cells[$"E4:E{lastRecord}"].Style.Numberformat.Format = MISAExportResource.DateFormat;
                ws.Cells[$"E4:E{lastRecord}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                // Format cột số thứ tự
                ws.Cells[$"A4:A{lastRecord}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                // Format cột thẻ ngân hàng về dạng số
                ws.Cells[$"H4:H{lastRecord}"].Style.Numberformat.Format = MISAExportResource.NumberFormat;
                ws.Cells[$"H4:H{lastRecord}"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;

                #endregion

                #endregion

                // Trả dòng này để truyền qua bên controller và lưu lại sau
                var excelData = package.GetAsByteArray();
                return excelData;
            }


        }


        /// <summary>
        /// API lọc danh sách nhân viên theo các điều kiện cho trước
        /// </summary>
        /// <param name="keyword">Từ khóa tìm kiếm (mã, tên, số điện thoại của nhân viên)</param>
        /// <param name="limit">Số lượng kết quả trả về của 1 bảng</param>
        /// <param name="offset">Start Index của bảng</param>
        /// <returns>Tổng số bản ghi, tổng số trang, số trang hiện tại, danh sách kết quả</returns>
        /// Created by : TNMANH (29/09/2022)
        public PagingData FilterEmployee(string? keyword, int? pageNumber, int? pageSize)
        {
            return _employeeDL.FilterEmployee(keyword, pageNumber, pageSize);
        }

        #endregion

        // Danh sách các API liên quan tới xóa nhân viên
        #region DeleteMethod

        /// <summary>
        /// API xóa nhiều nhân viên theo danh sách IDs
        /// </summary>
        /// <param name="employeeIDs"></param>
        /// <returns>True hoặc false, true là xóa thành công, false là xóa không thành công</returns>
        /// Created by : TNMANH (05/10/2022)
        public bool DeleteManyEmployee(Guid[] employeeIDs)
        {
            // giá trị rỗng trả về false luôn k gọi tới database nữa
            if(employeeIDs.Length == 0)
            {
                return false;
            }

            // trả về bool khi xóa nhiều
            return _employeeDL.DeleteManyEmployee(employeeIDs);
        }

        #endregion

        // Các hàm xử lý phụ
        #region OtherMethod

        /// <summary>
        /// Hàm xử lý chuyển đổi độ rộng của cột trong excel về đúng giá trị mong muốn
        /// </summary>
        /// <param name="width">độ rộng mong muốn</param>
        /// <returns></returns>
        public static double GetTrueColumnWidth(double width)
        {
            //DEDUCE WHAT THE COLUMN WIDTH WOULD REALLY GET SET TO
            double z = 1d;
            if (width >= (1 + 2 / 3))
            {
                z = Math.Round((Math.Round(7 * (width - 1 / 256), 0) - 5) / 7, 2);
            }
            else
            {
                z = Math.Round((Math.Round(12 * (width - 1 / 256), 0) - Math.Round(5 * width, 0)) / 12, 2);
            }

            //HOW FAR OFF? (WILL BE LESS THAN 1)
            double errorAmt = width - z;

            //CALCULATE WHAT AMOUNT TO TACK ONTO THE ORIGINAL AMOUNT TO RESULT IN THE CLOSEST POSSIBLE SETTING 
            double adj = 0d;
            if (width >= (1 + 2 / 3))
            {
                adj = (Math.Round(7 * errorAmt - 7 / 256, 0)) / 7;
            }
            else
            {
                adj = ((Math.Round(12 * errorAmt - 12 / 256, 0)) / 12) + (2 / 12);
            }

            //RETURN A SCALED-VALUE THAT SHOULD RESULT IN THE NEAREST POSSIBLE VALUE TO THE TRUE DESIRED SETTING
            if (z > 0)
            {
                return width + adj;
            }

            return 0d;
        }

        /// <summary>
        /// Method override lại từ base, để custom lại check trùng mã ứng với mã nhân viên
        /// </summary>
        /// <param name="record"></param>
        /// <returns>ServiceResponse</returns>
        /// Created by: TNMANH (13/10/2022)
        public override ServiceResponse CheckDuplicateCode(Employee record)
        {


            // Lấy ra trường record code trong object recor
            string recordCode = GetRecordCode(record);

            // Kiểm tra xem mã có bị trùng chưa
            var testDuplicateCode = GetDuplicateCode(recordCode);

            if (testDuplicateCode != null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Data = new ErrorResult(
                        ErrorCode.DuplicateCode,
                        MISAResource.DevMsg_Employee_DuplicatedCode,
                        MISAResource.UserMsg_Employee_DuplicatedCode,
                        MISAResource.MoreInfo_Employee_DupplicatedCode
                        )
                };
            }
            else
            {
                return new ServiceResponse
                {
                    Success = true,
                    Data = ""
                };
            }
        }

        public override ServiceResponse ValidateRequestData(Employee record)
        {
            // Validate dữ liệu đầu vào
            var props = typeof(Employee).GetProperties();

            // Tạo list các trường validate lỗi
            List<string> validateFailed = new List<string>();

            // Thực hiện vòng lặp để check lỗi validate
            foreach (var prop in props)
            {
                var propValue = prop.GetValue(record);

                // Kiểm tra xem các trường bắt buộc nhập đã có chưa
                var mustHave = (MustHave?)Attribute.GetCustomAttribute(prop, typeof(MustHave));
                if (mustHave != null && string.IsNullOrEmpty(propValue?.ToString()))
                {
                    validateFailed.Add(mustHave.ErrorMessage);
                }

                if (propValue != null && propValue.ToString() != String.Empty)
                {
                    // Kiểm tra xem các trường đã vượt quá độ dài tối đa chưa
                    var maxLength = (MaxLength?)Attribute.GetCustomAttribute(prop, typeof(MaxLength));
                    if (maxLength != null && propValue.ToString().Length > maxLength.Length)
                    {
                        validateFailed.Add(maxLength.ErrorMessage);
                    }

                    // Kiểm tra xem email đã đúng định dạng chưa
                    var emailValidate = (EmailValidate?)Attribute.GetCustomAttribute(prop, typeof(EmailValidate));
                    if (emailValidate != null && new EmailAddressAttribute().IsValid(propValue.ToString()) == false)
                    {
                        validateFailed.Add(emailValidate.ErrorMessage);
                    }

                    // Kiểm tra xem các trường chỉ nhập số đã đúng định dạng chưa
                    var numberValidate = (NumberValidate?)Attribute.GetCustomAttribute(prop, typeof(NumberValidate));
                    if (numberValidate != null && propValue.ToString().All(char.IsDigit) == false)
                    {
                        validateFailed.Add(numberValidate.ErrorMessage);
                    }
                }
            }

            // Check xem nếu có lỗi văng ra kết quả luôn khỏi chạy đoạn dưới
            if (validateFailed.Count > 0)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Data =
                    new ErrorResult(
                    ErrorCode.ValidateFail,
                    MISAResource.DevMsg_ValidateFailed,
                    MISAResource.UserMsg_ValidateFailed,
                    validateFailed
                    )
                };
            }

            return new ServiceResponse
            {
                Success = true
            };
        }
        #endregion

        #endregion
    }
}
