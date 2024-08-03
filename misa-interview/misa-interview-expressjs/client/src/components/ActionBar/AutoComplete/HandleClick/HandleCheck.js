import styles from '../Right.module.css'

export const HandleCheck = () =>{
    const DungChungQuick = document.getElementById('DungChungQuick')
    const DungChungQuickEvent = (e) => {
        if(DungChungQuick.classList.contains(styles.iconCheck)){
            DungChungQuick.classList.remove(styles.iconCheck)
            DungChungQuick.classList.add(styles.iconChecked)
        } else{
            DungChungQuick.classList.add(styles.iconCheck)
            DungChungQuick.classList.remove(styles.iconChecked)
        }
    }
    DungChungQuick.addEventListener('click', DungChungQuickEvent )
    return () =>{
    DungChungQuick.removeEventListener('click', DungChungQuickEvent )

    }
}