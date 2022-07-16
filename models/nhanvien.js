// kiểu dữ liệu nhân viên

function NhanVien () {
    this.tknv = '';
    this.name = '';
    this.email = '';
    this.password = '';
    this.datepicker = '';
    this.luongCB = 0;
    this.chucvu = '';
    this.gioLam = 0;

    // Tính tổng lương
    this.tinhTongLuong = function () {
        var tongLuong = 0;
        if (this.chucvu === 'Sếp' ) {
            tongLuong = Number(this.luongCB) * 3;
        } else if (this.chucvu === 'Trưởng Phòng'){
            tongLuong = Number(this.luongCB) * 2;
        } else if (this.chucvu === 'Nhân Viên'){
            tongLuong = Number(this.luongCB);
        } else {
            tongLuong = 'Không hiển thị';
        }
        
        return tongLuong;
    }
    // Xếp loại
    this.xepLoaiNhanVien = function () {
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





}