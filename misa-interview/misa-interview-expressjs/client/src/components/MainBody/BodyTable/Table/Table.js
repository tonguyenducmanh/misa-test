import React, {useEffect } from "react";

import { HandleCheckAll } from "./HandleCheckAll";
import { Customers } from "./Customers/Customers";
import styles from './Table.module.css'

export const Table = () =>{
    
    useEffect( () =>{
        HandleCheckAll()
    },[])
    return (
        <div className={styles.tableContainer}>
        <table className={styles.table}>
        <thead>
            <tr>
                <td className={`${styles.icon} ${styles.iconHeading}` }id='iconCheckAll'>
                </td>
                <td className={styles.tdOne}>Thẻ
                </td>
                <td className={styles.tdTwo}>Xưng hô
                </td>
                <td className={styles.tdThree}>Họ và tên
                </td>
                <td className={styles.tdFour}>Chức danh
                </td>
                <td className={styles.tdFive}>ĐT di động
                </td>
                <td className={styles.tdSix}>ĐT cơ quan
                </td>
                <td className={styles.tdSeven}>Email cơ quan
                </td>
                <td className={styles.tdEight}>Email cá nhân
                </td>
                <td className={styles.tdNine}>Tổ chức
                </td>
                <td className={styles.tdTen}>Địa chỉ
                </td>
                <td className={styles.tdEleven}>Tỉnh/Thành phố
                </td>
                <td className={styles.tdTwelve}>Quận/Huyện
                </td>
                <td className={styles.tdThirteen}>Phường/Xã
                </td>
                <td className={styles.tdFourteen}>Nguồn gốc
                </td>
                <td className={styles.tdFifteen}>Loại hình
                </td>
                <td className={styles.tdSixteen}>Lĩnh vực
                </td>
                <td className={styles.tdSeventeen}>Mô tả
                </td>
                <td className={styles.tdNineteen}>Chủ sở hữu
                </td>
                <td className={styles.tdTwenty}>Doanh thu
                </td>
                <td className={styles.tdTwentyOne}>Dùng chung
                </td>
                <td className={styles.tdTwentyTwo}>Zalo
                </td>
            </tr>
        </thead>
           <Customers/>
        </table>
        </div>
    )
}