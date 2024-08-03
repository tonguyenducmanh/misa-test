import { createCustomer } from "../../../features/customers/customersSlice";
import { resetLocation } from '../../../features/location/locationSlice';

import styles from '../CreateBar.module.css'
import stylesTwo from '../../CreateBody/AutoComplete/TruongChonNhieuBox.module.css'
import stylesThree from '../../CreateBody/CreateBody.module.css'
import stylesFour from '../CreateBar.module.css'

export const HandleSaveAndAdd = (dispatch) =>{
    const notifyNotEnough = document.getElementById('notifyNotEnough')
    const notifySuccess = document.getElementById('notifySuccess')
    const thongtinMustHaves = document.getElementsByClassName(stylesThree.thongtinMustHave)
    
    const notifyNotEnoughEvent = ()=>{
        notifyNotEnough.classList.remove(stylesFour.notifyNotEnoughAni)
    }

    const notifySuccessEvent = ()=>{
        notifySuccess.classList.remove(styles.notifySuccessAni)
    }
    const saveButton = document.getElementById('saveAndAddButton')

    const saveButtonEvent = () =>{
        //check xem mấy thông tin quan trọng đã điền hết chưa
        let thongtinChuaDien = 0
        for( let i = 0 ; i < thongtinMustHaves.length; i++){
            if(thongtinMustHaves[i].value === ''){
                thongtinChuaDien ++
                thongtinMustHaves[i].classList.add(stylesThree.thonngTinWarning)
                thongtinMustHaves[i].parentElement.children[1].style.display = 'block'
                thongtinMustHaves[i].parentElement.parentElement.children[0].classList.add(stylesThree.thongTinTitleWarning)
                
                //hiện thông báo nhập cho ló đầy đủ vào
                //thông báo rằng người dùng chỉ có thể sửa 1 tiềm năng 1 lúc
                notifyNotEnough.classList.add(stylesFour.notifyNotEnoughAni)
                notifyNotEnough.addEventListener("transitionend", notifyNotEnoughEvent);
            }
        }
        
        if(thongtinChuaDien === 0){
            const anh =  document.getElementById('anhValue')
            const maTiemNang = document.getElementById('maTiemNang').value
            const xungHo = document.getElementById('xungHo').textContent
            const firstName = document.getElementById('firstName').value
            const lastName = document.getElementById('lastName').value
            const phongBan = document.getElementById('phongBan').textContent
            const chucDanh = document.getElementById('chucDanh').textContent
            const dienThoaiDiDong = document.getElementById('dienThoaiDiDong').value
            const dienThoaiCoQuan = document.getElementById('dienThoaiCoQuan').value
            const nguonGoc = document.getElementById('nguonGoc').textContent
            const zalo = document.getElementById('zalo').value
            const emailCaNhan = document.getElementById('emailCaNhan').value
            const emailCoQuan = document.getElementById('emailCoQuan').value
            const toChuc = document.getElementById('toChuc').value
            const maSoThue = document.getElementById('maSoThue').value
            const taiKhoanNganHang = document.getElementById('taiKhoanNganHang').value
            const moTaiNganHang = document.getElementById('moTaiNganHang').value
            const ngayThanhLap = document.getElementById('ngayThanhLap').value
            const loaiHinh = document.getElementById('loaiHinh').textContent
            const linhVuc = document.getElementById('linhVuc').textContent
            const nganhNghe = document.getElementById('nganhNghe').textContent
            const doanhThu = document.getElementById('doanhThu').textContent
            const quocGia = document.getElementById('quocGia').textContent
            const tinhThanh = document.getElementById('tinhThanh').textContent
            const quanHuyen = document.getElementById('quanHuyen').textContent
            const phuongXa = document.getElementById('phuongXa').textContent
            const soNha = document.getElementById('soNha').value
            const maVung = document.getElementById('maVung').value
            const moTa = document.getElementById('moTa').value
            const history = document.getElementById('history').value
            const dungChungCheck = document.getElementById('dungChung')
            const loaiTiemNang = document.getElementById('loaiTiemNang').children
            const the = ['']
            //lúc khởi tạo tiềm năng thì cho thẻ giá trị rỗng
           

            const data = new FormData()

            data.append('_id',maTiemNang)
            
            xungHo !== '- Không chọn -' ? data.append('xungHo', xungHo) : data.append('xungHo', '')
            
            let anhValue = 0
            anh.files.length !== '0' ? anhValue = anh.files[0] : anhValue = 0

            data.append('anhValue', anhValue)
            data.append('hoVaDem',firstName)
            data.append('ten',lastName)

            phongBan !== '- Không chọn -' ? data.append('phongBan', phongBan) : data.append('phongBan', '')

            chucDanh !== '- Không chọn -' ? data.append('chucDanh', chucDanh) : data.append('chucDanh', '')

            data.append('dienThoaiDiDong', dienThoaiDiDong)
            data.append('dienThoaiCoQuan', dienThoaiCoQuan)

            nguonGoc !== '- Không chọn -' ? data.append('nguonGoc', nguonGoc) : data.append('nguonGoc', '')

            data.append('zalo', zalo)
            data.append('emailCaNhan', emailCaNhan)
            data.append('emailCoQuan', emailCoQuan)
            data.append('toChuc', toChuc)
            data.append('maSoThue', maSoThue)
            data.append('taiKhoanNganHang', taiKhoanNganHang)
            data.append('moTaiNganHang', moTaiNganHang)
            data.append('ngayThanhLap', ngayThanhLap)

            loaiHinh !== '- Không chọn -' ? data.append('loaiHinh', loaiHinh) : data.append('loaiHinh', '')

            linhVuc !== '- Không chọn -' ? data.append('linhVuc', linhVuc) : data.append('linhVuc', '')

            nganhNghe !== '- Không chọn -' ? data.append('nganhNghe', nganhNghe) : data.append('nganhNghe', '')

            doanhThu !== '- Không chọn -' ? data.append('doanhThu', doanhThu) : data.append('doanhThu', '')

            quocGia !== '- Không chọn -' ? data.append('quocGia', quocGia) : data.append('quocGia', '')

            tinhThanh !== '- Không chọn -' ? data.append('tinhThanh', tinhThanh) : data.append('tinhThanh', '')

            quanHuyen !== '- Không chọn -' ? data.append('quanHuyen', quanHuyen) : data.append('quanHuyen', '')

            phuongXa !== '- Không chọn -' ? data.append('phuongXa', phuongXa) : data.append('phuongXa', '')

            data.append('soNha', soNha)
            data.append('maVung', maVung)
            data.append('moTa', moTa)
            
            const historyArray = history.replace(/(\r\n|\n|\r)/gm, "").split(';')

            for(let k=0; k< historyArray.length; k++){
                if(historyArray[k] !=='- Không chọn -'){
                    data.append('history[]', historyArray[k])
                }else{
                    data.append('history[]', '')
                }
            }

            let loaiTiemNangArray = []
            for(let i = 0 ; i < loaiTiemNang.length; i ++){
                loaiTiemNangArray.push(loaiTiemNang[i].textContent)
            }

            for(let k=0; k< loaiTiemNangArray.length; k++){
                if(loaiTiemNangArray[k] !=='- Không chọn -'){
                    data.append('loaiTiemNang[]', loaiTiemNangArray[k])
                }else{
                    data.append('loaiTiemNang[]', '')
                }
            }

            let theArray = []
            for(let i = 0 ; i < the.length; i ++){
                theArray.push(the[i])
            }

            for(let k=0; k< theArray.length; k++){
                if(theArray[k] !=='- Không chọn -'){
                    data.append('the[]', theArray[k])
                }else{
                    data.append('the[]', '')
                }
            }

            let dungChungBtn = false
            
            if(dungChungCheck.classList.contains(stylesThree.iconChecked)){
                dungChungBtn = true
            }
            data.append('dungChung', dungChungBtn)
            dispatch(createCustomer(data))
            dispatch(resetLocation())
            
            notifySuccess.classList.add(styles.notifySuccessAni)
            notifySuccess.addEventListener("transitionend",notifySuccessEvent );

            //xóa toàn bộ thông tin cần nhập vào để nhập mới
            document.getElementById('anhValue').value = []
            const avatarValue = document.getElementById('avatarValue')
            avatarValue.removeAttribute('style')
            // xóa style inline css để dùng lại cái file css bên ngoài cho avatar


            const maTiemNangPlus = parseInt(maTiemNang.split('').slice(2,17).join('')) + 1
            const zeroPad = (num, places) => String(num).padStart(places, '0')
            const TiemNangMoi =zeroPad(maTiemNangPlus, 15)
            const maTiemNangMoi = `TN${TiemNangMoi}`


            document.getElementById('maTiemNang').value = maTiemNangMoi
            document.getElementById('xungHo').textContent = '- Không chọn -'
            document.getElementById('xungHo').style.color = '#9ba3b2'
            document.getElementById('firstName').value = ''
            document.getElementById('lastName').value = ''
            document.getElementById('fullName').innerHTML = ''
            document.getElementById('phongBan').textContent = '- Không chọn -'
            document.getElementById('phongBan').style.color = '#9ba3b2'
            document.getElementById('chucDanh').textContent = '- Không chọn -'
            document.getElementById('chucDanh').style.color = '#9ba3b2'
            document.getElementById('dienThoaiDiDong').value = ''
            document.getElementById('dienThoaiCoQuan').value = ''
            document.getElementById('nguonGoc').textContent = '- Không chọn -'
            document.getElementById('nguonGoc').style.color = '#9ba3b2'
            document.getElementById('zalo').value = ''
            document.getElementById('emailCaNhan').value = ''
            document.getElementById('emailCoQuan').value = ''
            document.getElementById('toChuc').value = ''
            document.getElementById('maSoThue').value = ''
            document.getElementById('taiKhoanNganHang').value = ''
            document.getElementById('moTaiNganHang').value = ''
            document.getElementById('ngayThanhLap').value = ''
            document.getElementById('loaiHinh').textContent = '- Không chọn -'
            document.getElementById('loaiHinh').style.color = '#9ba3b2'
            document.getElementById('linhVuc').textContent = '- Không chọn -'
            document.getElementById('linhVuc').style.color = '#9ba3b2'
            document.getElementById('nganhNghe').textContent = '- Không chọn -'
            document.getElementById('nganhNghe').style.color = '#9ba3b2'
            document.getElementById('doanhThu').textContent = '- Không chọn -'
            document.getElementById('doanhThu').style.color = '#9ba3b2'
            document.getElementById('quocGia').textContent = '- Không chọn -'
            document.getElementById('quocGia').style.color = '#9ba3b2'
            document.getElementById('tinhThanh').textContent = '- Không chọn -'
            document.getElementById('tinhThanh').style.color = '#9ba3b2'
            document.getElementById('quanHuyen').textContent = '- Không chọn -'
            document.getElementById('quanHuyen').style.color = '#9ba3b2'
            document.getElementById('phuongXa').textContent = '- Không chọn -'
            document.getElementById('phuongXa').style.color = '#9ba3b2'
            document.getElementById('soNha').value = ''
            document.getElementById('diaChiTongHop').value = ''
            document.getElementById('maVung').value = ''
            document.getElementById('moTa').value = ''
            document.getElementById('history').value = ''


}}

    saveButton.addEventListener('click', saveButtonEvent )
    
    return()=>{
        saveButton.removeEventListener('click', saveButtonEvent )
        notifyNotEnough.removeEventListener("transitionend", notifyNotEnoughEvent);
        notifySuccess.removeEventListener("transitionend",saveButtonEvent );
    
        }
}