import React, {useEffect}from 'react';
import TruongChonNhieuRight from '../Right';

import styles from './TruongChonNhieuBox.module.css'

export default function TruongChonNhieu({arr, id}) {
        const options = arr;
        
        const thongTinInputBox = document.getElementsByClassName(styles.thongTinInputBox)
        const thongTinInput = document.getElementsByClassName(styles.thongTinInput)
        const thongTinList = document.getElementsByClassName(styles.thongTinList)
        const thongTinListItem = document.getElementsByClassName(styles.thongTinListItem)
        const thongTinInputForm = document.getElementsByClassName(styles.thongTinInputForm)
        const thongTinExample = document.getElementsByClassName(styles.thongTinExample)
        const thongtinContainer = document.getElementsByClassName(styles.thongtinContainer)

        //mở nhập inputForm khi bấm vào updateComBoBox
        useEffect(()=>{
            const thongTinInputBoxEvent = (z)=>{
                return(e)=>{
                    if(e.target.children[0]){
                        if(e.target.parentElement.children[1].style.display !== 'block'){
                            e.target.parentElement.children[1].style.display = 'block'
                            e.target.parentElement.children[1].children[0].focus()
                        } 
                    }
                }
            }
            for(let z = 0 ; z <thongTinInputBox.length; z++){
                thongTinInputBox[z].addEventListener('click', thongTinInputBoxEvent(z))
            }
            return()=>{
                for(let z = 0 ; z <thongTinInputBox.length; z++){
                    thongTinInputBox[z].removeEventListener('click', thongTinInputBoxEvent(z))
                }
            }
        },[thongTinInputBox])

        //mở dãy gợi ý khi mà hiện tính năng nhập và tùy chỉnh danh sách theo dữ liệu nhập
        //danh sách gợi ý được lọc qua xem có trùng chữ nào thì mới hiện
        useEffect(()=>{
            const thongTinInputFormEvent = (i)=>{
                return(e)=>{
                    let inputValue = e.target.value.toLowerCase()
                    for( let k = 0 ; k < thongTinListItem.length ; k++){
                        if(thongTinListItem[k].innerHTML.toLowerCase().indexOf(inputValue) > -1){
                            //check xem có bao nhiêu giá trị bị trùng, nếu trùng thì gỡ nó đi khỏi thanh gợi ý,
                            // nếu không trùng thì xét từng chữ cái 1 xem có trùng không, trùng thì gợi ý hiện ra
                            // trường hợp trùng thằng đầu tiên thì hiện tất cả (ý là không có chọn)
                            if(thongTinInputBox[i].children[0].textContent.includes('- Không chọn -')){
                                for(let p = 0; p< thongTinList[i].children.length; p ++){
                                    thongTinList[i].children[k].style.display = 'block';
                                }
                            } else{
                                let count = 0
                                for( let p = 0 ; p< thongTinInputBox[i].children.length ; p++){
                                    if(thongTinInputBox[i].children[p].textContent.includes(thongTinList[i].children[k].innerHTML)){
                                        count = count + 1
                                    }
                                }
                                //nếu không trùng thì mới thêm vào
                                if(count === 0){
                                    thongTinListItem[k].style.display = 'block';
                                } else{
                                thongTinListItem[k].style.display = 'none'
                                }
                            }
                        } else{
                            thongTinListItem[k].style.display = 'none'
                        }
                    }

                }
            }
            for(let i = 0 ; i< thongTinInputForm.length; i++){
                ['click','focus','input'].forEach( evt =>
                    thongTinInputForm[i].children[0].addEventListener(evt,thongTinInputFormEvent(i)) )
                }
            return()=>{
                for(let i = 0 ; i< thongTinInputForm.length; i++){
                    ['click','focus','input'].forEach( evt =>
                        thongTinInputForm[i].children[0].removeEventListener(evt,thongTinInputFormEvent(i)) )
                    }
            }
                
        },[thongTinInputBox, thongTinInputForm, thongTinListItem, thongTinList])
            
        // xử lý sự kiện bấm ra ngoài vùng được chọn
        useEffect(() =>{
            const documentEvent = (event) => {
                //kiểm tra sự kiện có không đã, nếu không có tức là đang ở trang khác
                for(let k = 0 ; k<thongtinContainer.length; k++){
                    if(thongtinContainer[k]){
                            if (!thongTinInputForm[k].contains(event.target)) {
                                thongTinInputForm[k].style.display = 'none'
                          }
                    }}
                }
            document.addEventListener("mousedown", documentEvent
                );
            return()=>{
                document.removeEventListener("mousedown", documentEvent
                );
            }
        },[thongTinInputForm, thongtinContainer])

        //xử lý tính năng nhập nhanh gợi ý vào input
        useEffect(() =>{
            const thongTinListEvent = (i)=>{
                return(e)=>{
                    if(e.target.textContent !== '- Không chọn -'){
                        e.target.parentElement.parentElement.parentElement.style.height = '150px'
                        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.style.alignItems = 'baseline'

                        //tạo thẻ chọn mới nè hihi
                        const theMoi =document.createElement("span")
                        const theMoiEvent = (i)=>{
                            return(e)=>{
                                //thêm luôn tính năng tự hủy khi bấm vào
                                if(thongTinInputBox[i].children.length <2){
                                    const theMoiHai = document.createElement('span')
                                    theMoiHai.classList.add(styles.thongTinExample)
                                    theMoiHai.innerHTML = '- Không chọn -'
                                    thongTinInputBox[i].appendChild(theMoiHai)
                                    theMoiHai.parentElement.parentElement.style.height = ''
                                    theMoiHai.parentElement.parentElement.parentElement.parentElement.style.alignItems = 'center'

                                }
                                e.target.remove()
                            }
                        }
                        theMoi.innerHTML = e.target.textContent
                        theMoi.classList.add(styles.thongTinContent)
                        theMoi.classList.add(styles.thongTinContentDecor)
                        theMoi.addEventListener('click', theMoiEvent(i))
                        let count = 0
                        //check xem có bao nhiêu giá trị bị trùng
                        for( let k = 0 ; k< thongTinInputBox[i].children.length ; k++){
                            if(thongTinInputBox[i].children[k].textContent.includes(e.target.textContent)){
                                count = count + 1
                            }
                        }
                        //nếu không trùng thì mới thêm vào
                        if(count === 0){
                            thongTinInputBox[i].appendChild(theMoi)
                        }
                        
                        thongTinInput[i].value = ''
                        if(thongTinExample[i]){
                            thongTinExample[i].remove()
                        }
                        thongTinInput[i].focus()
                        return()=>{
                            theMoi.removeEventListener('click', theMoiEvent(i))
                        }
                    } else{
                        e.target.parentElement.parentElement.parentElement.style.height = 'auto'
                        
                        // nếu chọn vào trường không chọn thì xóa toàn bộ các nút đã chọn và chỉ giữ lại thằng không chọn thôi
                        
                        for( let k = 0 ; k < thongTinInputBox[i].children.length +1 ; k++){
                            while(thongTinInputBox[i].firstElementChild) {
                                thongTinInputBox[i].firstElementChild.remove();
                             }
                        }


                        if(!thongTinExample[i]){
                            const theMoi =document.createElement("span")
                            theMoi.innerHTML = '- Không chọn -'
                            theMoi.classList.add(styles.thongTinExample)
                            e.target.parentElement.parentElement.parentElement.children[0].appendChild(theMoi)
                        }
                        thongTinInput[i].focus()
                        // focus này để refresh lại danh sách khi ấn vào không chọn
                        
                    }
                }
            }
            for(let i = 0 ; i< thongTinList.length; i++){
                //thêm sự kiện click
                thongTinList[i].addEventListener('click',thongTinListEvent(i) )
                }
            return()=>{
                for(let i = 0 ; i< thongTinList.length; i++){
                    //thêm sự kiện click
                    thongTinList[i].removeEventListener('click',thongTinListEvent(i) )
                    }
            }
        },[thongTinExample, thongTinInput, thongTinInputBox, thongTinList])



        return (
            <div className={styles.thongtinContainer} id = {id}>
                <div className={styles.thongTinInputBox}>
                    <span className={styles.thongTinExample}>- Không chọn -</span>
                    {/* <span className={`${styles.thongTinContent} ${styles.thongTinContentDecor}`}>- Không chọn -</span> */}
                </div>
                <div className={styles.thongTinInputForm}>
                    <input className={styles.thongTinInput} placeholder='Tìm kiếm'/>
                    <ul className={styles.thongTinList}>
                    {options.map((option, index) => (
                        <li className={styles.thongTinListItem} key={index}>{option}</li>
                        ))}
                    </ul>
                    <span className={styles.thongTinInputSearch}></span>
                </div>
            </div>
        );
}
