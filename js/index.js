//tạo mảng danh sách nhân viên
let staffList = [];

function getElement(selector) {
  return document.querySelector(selector);
}

function createStaff() {
  let account = getElement("#tknv").value;
  let name = getElement("#name").value;
  let email = getElement("#email").value;
  let password = getElement("#password").value;
  let date = getElement("#datepicker").value;
  let basicSalary = +getElement("#luongCB").value;
  let title = getElement("#chucvu").value;
  let timeWork = +getElement("#gioLam").value;
  let rank = "";

  let isValid = validate();
  if (!isValid) {
    return;
  }

  const staff = new Staff(
    account,
    name,
    email,
    password,
    date,
    basicSalary,
    title,
    timeWork,
    rank
  );

  staffList.push(staff);

  renderTable(staffList);

  resetForm();
}

function renderTable(staffList) {
  let html = "";
  for (let i = 0; i < staffList.length; i++) {
    let staff = staffList[i];
    html += `
        <tr>
          <td>${staff.account}</td>
          <td>${staff.name}</td>
          <td>${staff.email}</td>
          <td>${staff.date}</td>
          <td>${staff.title}</td>
          <td>${staff.calcSalary()}</td>
          <td>${staff.rank()}</td>
          <td>
          <button     
          class="btn btn-primary"
          onclick="selectStaffToUpdate('${staff.account}')"
          data-toggle="modal"
          data-target="#myModal"
          >
          Chỉnh sửa
          </button>
          <button 
          class="btn btn-danger" 
          onclick="deleteStaff('${staff.account}')"
          >
          Xoá
          </button>
        </td>
        </tr>
      `;
  }
  getElement("#tableDanhSach").innerHTML = html;
}

//Hàm reset giá trị của các input
function resetForm() {
  getElement("#tknv").value = "";
  getElement("#name").value = "";
  getElement("#email").value = "";
  getElement("#password").value = "";
  getElement("#datepicker").value = "";
  getElement("#luongCB").value = "";
  getElement("#chucvu").value = "";
  getElement("#gioLam").value = "";
}

// Hàm xoá nhân viên theo Account
function deleteStaff(staffAcc) {
  staffList = staffList.filter((staff) => {
    return staff.account !== staffAcc;
  });

  // Gọi hàm renderTable để cập nhật giao diện
  renderTable(staffList);
}
// Hàm tìm sinh viên theo account để fill thông tin lên form
function selectStaffToUpdate(staffAcc) {
  // B1: Tìm sinh viên muốn chỉnh sửa dựa vào account
  let selectedStaff = staffList.find((staff) => {
    // Nếu return về true => trả ra giá trị của phần tử dang duyệt qua
    // Trả ra undefined nếu tất cả đều return về false
    return staff.account === staffAcc;
  });

  // B2: lấy thông tin của nhân viên tìm được để fill lên form
  getElement("#tknv").value = selectedStaff.account;
  getElement("#name").value = selectedStaff.name;
  getElement("#email").value = selectedStaff.email;
  getElement("#password").value = selectedStaff.password;
  getElement("#datepicker").value = selectedStaff.date;
  getElement("#luongCB").value = selectedStaff.basicSalary;
  getElement("#chucvu").value = selectedStaff.title;
  getElement("#gioLam").value = selectedStaff.timeWork;

  //B3: Disable input mã sv và button thêm nhân viên
  getElement("#btnThemNV").disabled = true;
  getElement("#tknv").disabled = true;
}

// Hàm cập nhật thông tin sinh viên
function updateStaff() {
  // B1: DOM
  let account = getElement("#tknv").value;
  let name = getElement("#name").value;
  let email = getElement("#email").value;
  let password = getElement("#password").value;
  let date = getElement("#datepicker").value;
  let basicSalary = +getElement("#luongCB").value;
  let title = getElement("#chucvu").value;
  let timeWork = +getElement("#gioLam").value;

  let isValid = validate();
  if (!isValid) {
    return;
  }

  // B2: Khởi tạo object staff
  const staff = new Staff(
    account,
    name,
    email,
    password,
    date,
    basicSalary,
    title,
    timeWork
  );

  //B3: cập nhật thông tin mới của staff
  let index = staffList.findIndex((staff) => {
    return staff.account === account;
  });
  staffList[index] = staff;

  // B4: gọi hàm renderTable để cập nhật giao diện
  renderTable(staffList);

  resetForm();
}

function validate() {
  let isValid = true;

  //kiểm tra tài khoản
  let account = getElement("#tknv").value;
  if (!account.trim()) {
    isValid = false;
    getElement("#tbTKNV").innerHTML = "account sinh viên không được để trống";

    getElement("#tbTKNV").innerHTML = "";
  } else if (!/^\d+$/.test(account)) {
    isValid = false;
    getElement("#tbTKNV").innerHTML = "account không hợp lệ";
  }

  // kiểm tra tên staff
  let name = getElement("#name").value;
  if (!name.trim()) {
    isValid = false;
    getElement("#tbTen").innerHTML = "Tên không được để trống";
  } else if (!/^[a-zA-Z]+$/.test(name)) {
    isValid = false;
    getElement("#tbTen").innerHTML = "tên không hợp lệ";
  } else {
    getElement("#tbTen").innerHTML = "";
  }

  // Kiểm tra email
  let email = getElement("#email").value;
  if (!email.trim()) {
    isValid = false;
    getElement("#tbEmail").innerHTML = "Email sinh viên không được để trống";
  } else if (!/^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
    isValid = false;
    getElement("#tbEmail").innerHTML = "Email không hợp lệ";
  } else {
    getElement("#tbEmail").innerHTML = "";
  }

  // Kiểm tra password
  let password = getElement("#password").value;
  if (!password.trim()) {
    isValid = false;
    getElement("#tbMatKhau").innerHTML = "Pass không được để trống";
  } else if (
    !/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,10})/.test(password)
  ) {
    isValid = false;
    getElement("#tbMatKhau").innerHTML = "Pass không hợp lệ";
  } else {
    getElement("#tbMatKhau").innerHTML = "";
  }

  // Kiểm tra lương
  if (salary < 1000000 || salary > 20000000) {
    getElement("#tbLuongCB").innerHTML = "Lương cơ bản không hợp lệ";
    isValid = false;
  }
  // Kiểm tra chức vụ
  if (title == "Chọn chức vụ") {
    getElement("#tbChucVu").innerHTML = "không được bỏ trống chức vụ";
    isValid = false;
  }

  // Kiểm tra giờ làm
  if (timeWork < 80 || timeWork > 200) {
    getElement("#tbGiolam").innerHTML = "Giờ làm không hợp lệ ( 80h-200h) ";
    isValid = false;
  }
  return isValid;
}

// //hàm tìm kiếm nhân viên theo xếp loại
// function searchStaff() {
//   //B1: Dom
//   let search = getElement("#searchName").value;

//   //B2: lọc những user có thành tích khớp với giá trị search
//   let newStaffList = staffList.filter(() => {
//     let rank = staff.rank.toLowerCase();
//     search = search.toLowerCase();
//     return rank.indexOf(search) !== -1;
//   });

//   // B3: Gọi hàm renderTable để hiển thị ra giao diện
//   renderTable(newStaffList);
// }
