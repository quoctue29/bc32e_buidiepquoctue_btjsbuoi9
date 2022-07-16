/**
 * Hàm nhận vào 2 tham số và trả về kết quả true hoặc false. True khi hợp lệ và false khi không hợp lệ
 * @param {*} value Giá trị đầu vào 
 * @param {*} selectorError Nơi in ra lỗi
 * @param {*} name là text hiển thị ra tên trường bị lỗi
 */
function kiemTraRong(value,selectorError,name) {    
    //.trim(): Loại bỏ khoảng trống đầu và cuối của chuỗi
    //   abc  =>abc
    if(value.trim() !== ''){
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' Không được bỏ trống ! ';
    return false;

}


function kiemTraTatCaKyTu (value,selectorError,name) {
    var regexLetter = /^[A-Z a-z]+$/;
    if(regexLetter.test(value)){
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' Tất cả là chữ ! ';
    return false;
}

function kiemTraPassword (value,selectorError,name) {
    var regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
    ; 
    if(regexPassword.test(value)){
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' không đúng dạng ';
    return false;
}

function kiemTraTatCaSo (value,selectorError,name) {
    var regexNumber = /^[0-9]+$/; 
    if(regexNumber.test(value)){
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' là số ! ';
    return false;
}

function kiemTraEmail (value,selectorError,name) {
    var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    if(mailformat.test(value)){
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' không đúng dạng ! ';
    return false;
}

function kiemTraNgay (value,selectorError,name) {
    var regexDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if(regexDate.test(value)){
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + ' không đúng dạng ngày ! ';
    return false;
}

function kiemTraDoDai (value,selectorError,name,minLength,maxLength) {
    var lengthValue = value.length;
    if(lengthValue > maxLength || lengthValue < minLength){
        document.querySelector(selectorError).innerHTML = name + ' từ ' + minLength + ' đến ' + maxLength;
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
    return true;
}


function kiemTraGiaTri (value,selectorError,name,minValue,maxValue) {
    value = Number(value);
    if (value > maxValue || value < minValue) {
        document.querySelector(selectorError).innerHTML = name + ' từ ' + minValue + ' đến ' + maxValue;
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
    return true;
}
