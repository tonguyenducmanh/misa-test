import styles from './Customers.module.css'
import stylesTwo from '../../Table/Table.module.css'
import stylesThree from '../../../../ActionBar/ActionBar.module.css'


export const HandleCheck = (limit) =>{
    const actionBarOne = document.getElementById('actionBarOne')
    const actionBarTwo = document.getElementById('actionBarTwo')
    const checkAllButton = document.getElementById('iconCheckAll')
    const countCheck = document.getElementById('countCheck')
    const checked = document.getElementsByClassName(styles.iconButtonCustomers)
    const iconChecks = document.getElementsByClassName(styles.iconHeadingChecked)
    
    
    for (let i = 0; i < checked.length; i++) {
            let ch = checked[i];
            ch.onclick = function (e) {
            if (this.classList.contains(styles.iconHeadingChecked)) {
                this.classList.add(styles.iconHeading);
                this.classList.remove(styles.iconHeadingChecked);
                e.target.parentElement.classList.remove(styles.itemChecked)
                e.target.parentElement.children[0].classList.remove(styles.iconButtonCustomersChecked)
            }
            else if(this.classList.contains(styles.iconHeading)) {
                e.target.parentElement.children[0].classList.add(styles.iconButtonCustomersChecked)
                this.classList.add(styles.iconHeadingChecked);
                this.classList.remove(styles.iconHeading);
                e.target.parentElement.classList.add(styles.itemChecked)

                //hiện menu chỉnh sửa nhanh
                actionBarOne.classList.add(stylesThree.hiddenComponent)
                }
                actionBarTwo.classList.remove(stylesThree.hiddenComponent)
                if(iconChecks.length === 0){
                    actionBarOne.classList.remove(stylesThree.hiddenComponent)  
                    actionBarTwo.classList.add(stylesThree.hiddenComponent)
            }
            
           
            countCheck.innerHTML = `Đã chọn ${iconChecks.length}`
            //nếu check tất cả nút thì check nút check all và ngược lại
            if( limit !== iconChecks.length){
                checkAllButton.classList.remove(stylesTwo.iconHeadingChecked)
                checkAllButton.classList.add(stylesTwo.iconHeading)
            }else{
                checkAllButton.classList.add(stylesTwo.iconHeadingChecked)
                checkAllButton.classList.remove(stylesTwo.iconHeading)
            }

            }
        };
    
}
