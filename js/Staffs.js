function Staff(
  account,
  name,
  email,
  password,
  date,
  basicSalary,
  title,
  timeWork
) {
  this.account = account;
  this.name = name;
  this.email = email;
  this.password = password;
  this.date = date;
  this.basicSalary = basicSalary;
  this.title = title;
  this.timeWork = timeWork;
}

Staff.prototype.calcSalary = function () {
  let totalSalary = 0;
  if (this.title === "director") {
    return (totalSalary = this.basicSalary * 3 * this.timeWork);
  }
  if (this.title === "leader") {
    return (totalSalary = this.basicSalary * 2 * this.timeWork);
  }
  if (this.title === "staff") {
    return (totalSalary = this.basicSalary * this.timeWork);
  }
};

Staff.prototype.rank = function () {
  if (this.timeWork >= 192) {
    return "xuất sắc";
  } else if (this.timeWork >= 176) {
    return "giỏi";
  } else if (this.timeWork >= 160) {
    return "khá";
  } else {
    return "trung bình";
  }
};
