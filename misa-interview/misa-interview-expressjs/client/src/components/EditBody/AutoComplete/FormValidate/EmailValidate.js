import styles from '../../EditBody.module.css'

export const EmailValidate = () =>{
    // const emailAtoZs = document.getElementsByClassName(styles.thongtinAtoZ)
    const emailAtoZs = []
    emailAtoZs.push(document.getElementById('emailCaNhanEdit'))
    emailAtoZs.push(document.getElementById('emailCoQuanEdit'))
    const emailAtoZsEvent = (e)=>{
        const re = new RegExp(/[a-z0-9@.]/i);

        if(e.target.value !== ''){
            const textTest = e.target.value.split('')
            let z = 0
            for(let k = 0 ; k <textTest.length; k++){
                    if(re.test(textTest[k])){
                        z ++
                    }
            }

            if(z === textTest.length){
                e.target.classList.remove(styles.thonngTinWarning)
                e.target.parentElement.children[1].style.display = 'none'
                e.target.parentElement.parentElement.children[0].classList.remove(styles.thongTinTitleWarning)
            } else{
                e.target.classList.add(styles.thonngTinWarning)
                e.target.parentElement.children[1].style.display = 'block'
                e.target.parentElement.parentElement.children[0].classList.add(styles.thongTinTitleWarning)
            }
            

        }else{
            e.target.classList.remove(styles.thonngTinWarning)
            e.target.parentElement.children[1].style.display = 'none'
            e.target.parentElement.parentElement.children[0].classList.remove(styles.thongTinTitleWarning)

        }
}
    for(let i = 0; i< emailAtoZs.length; i++){


        ['blur', 'input'].forEach( evt =>

            emailAtoZs[i].addEventListener(evt,emailAtoZsEvent ))
    }
    return()=>{
        for(let i = 0; i< emailAtoZs.length; i++){

    
            ['blur', 'input'].forEach( evt =>
    
                emailAtoZs[i].removeEventListener(evt,emailAtoZsEvent ))
        }
    }
}