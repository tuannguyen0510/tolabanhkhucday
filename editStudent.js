var nameInp = document.getElementById('name');
//tìm xóa sửa       
function getdata() {
    fetch('https://646b70ec7d3c1cae4ce3cd87.mockapi.io/students', {
        method: 'GET'
    })
        .then(async function (response) {
            let students = await response.json();
            var student = await students.filter(function (hocVien) {
                return hocVien.name.includes(nameInp.value);
            })
            if (student.length > 0) {
                displayStudents(student);
                delStudent();
                EditStudent();

            } else {
                var table = document.querySelector('table');
                // table.remove();
                nameInp.value = ""
                displayStudents(student);
                document.getElementById('NameErr').innerText = 'không tìm thấy học viên';
                document.getElementById('NameErr').className = 'text-danger';
            }
        })
        .catch(function (error) {
            console.log('có lỗi');
        })
}

//hiển thị học viên tìm được
function displayStudents(students) {
    var listFind = document.getElementById('student');
    var Tbody = '';
    students.forEach(student => {
        Tbody +=
            `<tr>
                        <td>${student.id}</td>
                         <td>${student.name}</td>
                         <td>${student.age}</td>
                         <td>${student.address}</td> 
                         <td><button class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">Sửa</button> <button class="btn btn-outline-danger">Xóa</button></td> 
                     </tr> `
    })
    listFind.innerHTML = Tbody;
    document.getElementById('NameErr').innerText = 'Tìm thấy học viên: ';
    document.getElementById('NameErr').className = "text-success";
}
// click 1
document.getElementById('Find').addEventListener('click', function (event) {
    event.preventDefault();
    if (nameInp.value != '') {
        getdata();

    } else {
        document.getElementById('NameErr').innerText = 'Vui lòng nhập tên';
        document.getElementById('NameErr').className = 'text-danger';
    }
})
//Xóa học viên:
function delStudent() {
    var xoa = document.querySelectorAll('.btn.btn-outline-danger');
    xoa.forEach(btn => {
        btn.onclick = function () {
            var id = btn.parentNode.parentNode.firstElementChild.textContent;
            var confirmed = confirm('Bạn có chắc chắn xóa');
            if (confirmed) {
                deleteData(id);
                alert('Xóa thành công');

            } else {
                console.log('Xóa bị hủy bỏ');
            }

        }
    });
}
function deleteData(id) {
    fetch(`https://646b70ec7d3c1cae4ce3cd87.mockapi.io/students/${parseInt(id)}`, {
        method: 'DELETE'
    })
        .then(function (response) {
            if (response.ok) {
                getdata();
                console.log('xóa thành công');
            } else {
                console.log('xóa thất bại');
            }
        })
        .catch(function (error) {
            console.log('có lỗi');
        })
}

//Sửa học viên
var nameEdit = document.getElementById('nameEdit');
var ageEdit = document.getElementById('ageEdit');
var addressEdit = document.getElementById('addressEdit');
function EditStudent() {
    var editButton = document.querySelectorAll('.btn.btn-outline-primary');
    editButton.forEach(btn => {
        btn.onclick = function () {
            var id = btn.parentNode.parentNode.firstElementChild;
            nameEdit.value = id.nextElementSibling.textContent;
            nameEdit.name = id.textContent;
            ageEdit.value = id.nextElementSibling.nextElementSibling.textContent;
            addressEdit.value = id.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
        }
    });
}
function editID(id) {
    var editData = {
        name: nameEdit.value,
        age: ageEdit.value,
        address: addressEdit.value
    }
    var putData = JSON.stringify(editData);
    console.log(putData);
    fetch(`https://646b70ec7d3c1cae4ce3cd87.mockapi.io/students/${parseInt(id)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: putData
    })
        .then(function (response) {
            if (response.ok) {
                console.log('sửa học viên thành công');
                getdata()
            } else {
                console.log('sửa học viên thất bại');
            }
        })
        .catch(function (error) {
            console.log('có lỗi');
        })
}
// click 2
var putEdit = document.getElementById('buttonChange');
putEdit.onclick = async function (event) {
    event.preventDefault();
    var id = nameEdit.name;
    var formIn = document.querySelector('form');
    var inputElement = formIn.querySelectorAll('input, textarea');
    console.log(inputElement);
    inputElement.forEach(element => {
        if (element.value == '') {
            element.nextElementSibling.innerText = '*vui lòng không để trống';
            element.nextElementSibling.className = 'text-danger'
            return;
        } else {
            element.nextElementSibling.innerText = ''
        }
    });
    var checked = Array.from(inputElement).every(function (inPut) {
        return inPut.value.length > 0;
    })
    console.log(checked);
    if (checked) {
        editID(id)
        document.getElementById('add').innerText = 'Thay đổi thông tin thành công ^^--';
        document.getElementById('add').className = 'text-success';
    } else {
        console.log('vui lòng không để trống');
        return;
    }

}
