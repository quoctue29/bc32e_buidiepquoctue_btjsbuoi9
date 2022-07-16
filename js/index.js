
var mangNhanVien = [];

document.querySelector('#btnThemNV').onclick = function() {
    //tạo đối tượng
    var nv = new NhanVien();
    //lấy thông tin input từ người dùng
    nv.tknv = document.querySelector('#tknv').value;
    nv.name = document.querySelector('#name').value;
    nv.email = document.querySelector('#email').value;
    nv.password = document.querySelector('#password').value;
    //xử lý ngày làm
    var datepicker = document.querySelector('#datepicker').value;
    nv.datepicker = moment(datepicker).format('DD-MM-YYYY');
    //
    nv.luongCB = document.querySelector('#luongCB').value;
    nv.chucvu = document.querySelector('#chucvu').value;
    nv.gioLam = document.querySelector('#gioLam').value;
    console.log(nv);
        //kiểm tra dữ liệu sinh viên có hợp lệ hay khoonh??
    /*----------------------Kiểm tra rổng---------*/
    var valid = true;
    valid = kiemTraRong(nv.tknv,'#error_required_tknv','Tài Khoản') & kiemTraRong(nv.name,'#error_required_name','Họ Và Tên') & kiemTraRong(nv.email,'#error_required_email','Email') & kiemTraRong(nv.password,'#error_required_password','Mật Khẩu') & kiemTraRong(nv.datepicker,'#error_required_datepicker','Ngày') & kiemTraRong(nv.luongCB,'#error_required_luongCB','Lương Cơ Bản') & kiemTraRong(nv.gioLam,'#error_required_gioLam','Giờ Làm');
    /*----------------------Kiểm tra định dạng dữ liệu -----------------*/
    valid &= kiemTraTatCaKyTu(nv.name,'#error_allLetter_name','Họ và Tên') & kiemTraEmail(nv.email,'#error_email','Email') & kiemTraNgay(nv.datepicker,'#error_date','Ngày') & kiemTraPassword(nv.password,'#error_password','Mật Khẩu');
    /*----------------------Kiểm tra định dạng số  -----------------*/  
    valid &= kiemTraGiaTri(nv.luongCB,'#error_max_min_value_luongCB','Lương cơ bản',1000000,20000000) & kiemTraGiaTri(nv.gioLam,'#error_max_min_value_gioLam','Giờ làm',80,200);

    valid &= kiemTraDoDai(nv.password,'#error_max_min_length_password','Mật Khẩu',6,10);



    if(valid != true) { //khác true khi đã dính ít nhất 1 if ở trên
        return;
    }








    //Mỗi lần bấm thêm nhân viên sẽ đưa object nhân viên vào mangNhanVien
    mangNhanVien.push(nv);
    console.log('mangNhanVien',mangNhanVien);
    //Gọi hàm từ mảng sinh viên tạo ra html cho table
    renderTableNhanVien(mangNhanVien);
    //Gọi hàm lưu mảng sinh viên vào localstrage
    // luuLocalStorage();

}
/**
 * 
 * @param {*} arrNhanVien : là 1 mảng nhân viên có dạng [{tknv:1,...}, {tknv:2,...}, {tknv:3,...},...]
 * @returns trả về kết quả là html <tr>...</tr> <tr>...</tr> <tr>...</tr> ...
 */
//    0                       1                   2
function renderTableNhanVien(arrNhanVien) { // [{tknv:1,...}, {tknv:2,...}, {tknv:3,...},...]
    var html = '';
    for (var index = 0; index < arrNhanVien.length; index++) {
        //Mỗi lần duyệt lấy ra 1 nhân viên
        var nv = arrNhanVien[index];
        //Bổ sung phương thức tính tổng cho object 
        nv.tinhTongLuong = function () {
            var tongLuong = 0;
            if (this.chucvu === 'Sếp' ) {
                tongLuong = Number(this.luongCB) * 3;
            } else if (this.chucvu === 'Trưởng phòng'){
                tongLuong = Number(this.luongCB) * 2;
            } else if (this.chucvu === 'Nhân viên'){
                tongLuong = Number(this.luongCB);
            } else {
                tongLuong = 'Không hiển thị';
            }
            
            return tongLuong;
        }
        //Bổ sung phương thức xếp loại cho object 
        nv.xepLoaiNhanVien = function () {
            var xepLoai = '';
            if (this.gioLam >= 192) {
                xepLoai = 'Nhân viên xuất sắc';
            } else if (this.gioLam >= 176 ) {
                xepLoai = 'Nhân viên giỏi';
            } else if (this.gioLam >= 160) {
                xepLoai = 'Nhân viên khá';
            } else if (this.gioLam < 160) {
                xepLoai = 'Nhân viên trung bình';
            } else {
                xepLoai = 'Không hiển thị';
            }
            
            return xepLoai;
        }
        //Tạo ra 1 chuỗi html tr và đưa vào output
        html += `
            <tr>
                <td>${nv.tknv}</td>
                <td>${nv.name}</td>
                <td>${nv.email}</td>
                <td>${nv.datepicker}</td>
                <td>${nv.chucvu}</td>
                <td>${nv.tinhTongLuong()}</td>
                <td>${nv.xepLoaiNhanVien()}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${nv.tknv}')">Xoá</button>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="chinhSua('${nv.tknv}')">Chỉnh sửa</button>
                </td>
            </tr>
        `; //Dưới phím esc `
    }
    document.querySelector('#tableDanhSach').innerHTML = html;
    return html;
}

function chinhSua(tknvClick) {
    //tìm ra vị trí của nhân viên được click trong mảng
    var indexEdit = mangNhanVien.findIndex(nv => nv.tknv === tknvClick);
    //Lấy ra thông tin nhân viên tại vị trí đó
    var nvEdit = mangNhanVien[indexEdit];
    console.log('nvEdit', nvEdit);

    //Khoá lại mã nhân viên
    document.querySelector('#tknv').disabled = true;
    //Gán các giá trị lên giao diện
    document.querySelector('#tknv').value = nvEdit.tknv;
    document.querySelector('#name').value = nvEdit.name;
    document.querySelector('#password').value = nvEdit.password;
    document.querySelector('#email').value = nvEdit.email;
    document.querySelector('#luongCB').value = nvEdit.luongCB;
    document.querySelector('#chucvu').value = nvEdit.chucvu;
    document.querySelector('#gioLam').value = nvEdit.gioLam;
    var dateMoment = moment(nvEdit.datepicker).format('YYYY/MM/DD');
    console.log(dateMoment);
    document.querySelector('#datepicker').value = dateMoment;
}

document.querySelector('#btnCapNhat').onclick = function(){
    //Lấy dữ liệu người dùng thay đổi trên giao diện
    var nv = new NhanVien();
    console.log(nv)
     //lấy thông tin input từ người dùng
     nv.tknv = document.querySelector('#tknv').value;
     nv.name = document.querySelector('#name').value;
     nv.email = document.querySelector('#email').value;
     nv.password = document.querySelector('#password').value;
     //xử lý ngày làm
     var datepicker = document.querySelector('#datepicker').value;
     nv.datepicker = moment(datepicker).format('DD-MM-YYYY');
     //
     nv.luongCB = document.querySelector('#luongCB').value;
     nv.chucvu = document.querySelector('#chucvu').value;
     nv.gioLam = document.querySelector('#gioLam').value;

    //Tìm ra thằng trong mảng cần chỉnh sửa
    var indexEdit = mangNhanVien.findIndex(nhanVien => nhanVien.tknv === nv.tknv);
    //Lấy nhân viên trong mảng thay đổi thành thông tin trên giao diện mà người edit
    mangNhanVien[indexEdit].name = nv.name;
    mangNhanVien[indexEdit].email = nv.email;
    mangNhanVien[indexEdit].password = nv.password;
    mangNhanVien[indexEdit].luongCB = nv.luongCB;
    mangNhanVien[indexEdit].chucvu = nv.chucvu;
    mangNhanVien[indexEdit].gioLam = nv.gioLam;
    //Tạo lại bảng nhân viên mới sau khi thay đổi
    renderTableNhanVien(mangNhanVien);
    //Mở lại nút mã nhân viên
    document.querySelector('#tknv').disabled = false;
    //Lưu localstorage sau khi sửa
    // luuLocalStorage();
}

function xoaNhanVien(maNhanVienClick) {
    //hàm trong .findIndex sẽ tự động chạy đến khi nào tìm thấy hoặc hết mảng (không thấy thì trả về -1);
    var indexDel = mangNhanVien.findIndex(nv => nv.tknv === maNhanVienClick);
    if (indexDel !== -1) {
        mangNhanVien.splice(indexDel, 1);
    }
    //Gọi hàm tạo lại table sau khi xoá
    renderTableNhanVien(mangNhanVien);
}