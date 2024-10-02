export function phoneNumberFormat(phoneNumber) {
    // Loại bỏ tất cả các ký tự không phải số
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  
    // Kiểm tra độ dài số điện thoại hợp lệ (10 hoặc 11 số)
    if (cleaned.length === 10) {
      // Định dạng số điện thoại có 10 số
      return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    } else if (cleaned.length === 11) {
      // Định dạng số điện thoại có 11 số
      return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
    } else {
      return null; // Trả về null nếu không hợp lệ
    }
  }
  