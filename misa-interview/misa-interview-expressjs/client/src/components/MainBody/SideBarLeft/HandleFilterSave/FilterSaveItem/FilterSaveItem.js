import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './FilterSaveItem.module.css'

import { fetchFiltersList } from '../../../../../features/filters/filtersSlice'

import { HandleFilterItemOpenMenu } from './HandleFilterItemOpenMenu/HandleFilterItemOpenMenu'
import { HandleDeleteFilter } from './HandleDeleteFilter/HandleDeleteFilter'
import { HandleFilterEditName } from './HandleFilterEditName/HandleFilterEditName'
import { HandleApplyFilter } from './HandleApplyFilter/HandleApplyFilter'

export const FilterSaveItem = () =>{
    let filtersLists
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchFiltersList())
    },[dispatch,filtersLists])

    filtersLists = useSelector(state => state.filters.filters)


    

    //ẩn menu nhỏ khi ấn ra ngoài
    useEffect(()=>{
        const filterSaveItemMenuTool = document.getElementsByClassName(styles.filterSaveItemMenuTool)
        const mousedownEvent = (event) => {
            for(let i = 0 ; i < filterSaveItemMenuTool.length; i++){
                if(!filterSaveItemMenuTool[i].contains(event.target)){
                    filterSaveItemMenuTool[i].style.display = 'none'
                }
            }
        }
        document.addEventListener("mousedown",mousedownEvent );
        return () =>{
            document.removeEventListener("mousedown",mousedownEvent )
            }
    },[])
    return(
        <span className={styles.filterContainer}>

        {filtersLists.map((filter) =>(
            <span className={styles.filterSaveItem}
                key={filter._id}
                >
                    <span className={styles.filterSaveItemTitle}
                        onClick={(e)=>HandleApplyFilter(filter,e)}
                    >
                        {filter.name}
                    </span>
                    <span className={`${styles.icon} ${styles.filterSaveItemMenu}`}
                        onClick={(e)=>HandleFilterItemOpenMenu(e)}
                    >
                    </span>
                    <span className={styles.filterSaveItemMenuTool}>
                        <span className={`${styles.icon} ${styles.filterSaveItemChangeName}`}
                            onClick={(e)=>HandleFilterEditName(e)}
                        >Đổi tên</span>
                        <span className={`${styles.icon} ${styles.filterSaveItemDelete}`}
                            onClick={(e)=>HandleDeleteFilter(dispatch,e)}
                        >Xóa</span>
                        <span className={`${styles.filterSaveItemId}`}>{filter._id}</span>
                    </span>
                </span>
        ))}
        </span>
    )
}