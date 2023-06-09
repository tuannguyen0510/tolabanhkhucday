function getdata1() {
    fetch('https://646b70ec7d3c1cae4ce3cd87.mockapi.io/students', {
        method: 'GET'
    })
        .then(async function (response) {
            let students = await response.json();
            console.log(students);
            displayStudents1(students);
        })
        .catch(function (er) {
            alert('có lỗi');
        })
}
function displayStudents1(students) {
    let studentsE = document.getElementById('students');
    let html = '';
    for (var student of students) {
        html += `
        <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.address}</td> 
        <td>Modul 1: ${student.modul1}<br>Modul 2:  ${student.modul2}<br>Modul 3: ${student.modul3}<br>Modul 4: ${student.modul4}<br> </td>
        </tr> `
    }
    studentsE.innerHTML = html;
}
getdata1();
function getdata2() {
    fetch('https://646b70ec7d3c1cae4ce3cd87.mockapi.io/students', {
        method: 'GET'
    })
        .then(async function (response) {
            let students = await response.json();
            var student = await students.filter(function (hocVien) {
                return hocVien.name.includes(nameInp.value);
            })
            if (student.length > 0) {
                displayStudents2(student);
                GStudent();
                NhapDiemSo();

            } else {
                getdata1();
                document.getElementById('NameErr').innerText = 'Không tìm thấy học viên';
                document.getElementById('NameErr').className = 'text-danger';
            }
        })
        .catch(function (error) {
            console.log('có lỗi');
        })
}

//hiển thị học viên tìm được
function displayStudents2(students) {
    var listFind = document.getElementById('students');
    var Tbody = '';
    students.forEach(student => {
        Tbody +=
            `<tr>
                        <td>${student.id}</td>
                         <td>${student.name}</td>
                         <td>${student.age}</td>
                         <td>${student.address}</td> 
                         <td><button class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal" data-id="${student.id}">Thêm điểm</button></td> 
                     </tr> `
    })
    listFind.innerHTML = Tbody;
    document.getElementById('NameErr').innerText = 'Tìm thấy học viên ';
    document.getElementById('NameErr').className = "text-success";
    document.getElementsByTagName('table')[0].style.display = "table";
}
// click 1
var nameInp = document.getElementsByTagName('input')[0];
document.getElementById('Find').addEventListener('click', function (event) {
    event.preventDefault();
    if (nameInp.value != '') {
        getdata2();
        GStudent();
    } else {
        getdata1();
        document.getElementById('NameErr').innerText = '';
    }
})
//add grade
var moDul1 = document.getElementById('modul1');
var moDul2 = document.getElementById('modul2');
var moDul3 = document.getElementById('modul3');
var moDul4 = document.getElementById('modul4');

function GStudent() {
    var GButton = document.querySelectorAll('.btn.btn-outline-primary');

    GButton.forEach(btn => {
        btn.onclick = function () {
            var id = btn.dataset.id;
            var name = btn.parentNode.parentNode.firstElementChild.nextElementSibling.textContent;
            NhapDiemSo(id);
        }
    });
}
function addGrade(id) {
    // var TrungBinh = (parseFloat(moDul1.value) + parseFloat(moDul2.value) + parseFloat(moDul3.value) + parseFloat(moDul4.value)) / 4;
    var grades = {
        modul1: moDul1.value,
        modul2: moDul2.value,
        modul3: moDul3.value,
        modul4: moDul4.value,
        TB: TrungBinh
    }
    var putData = JSON.stringify(grades);
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
                alert('nhập điểm số thành công');
                getdata2()
            } else {
                alert('nhập điểm số thất bại');
            }
        })
        .catch(function (error) {
            console.log('có lỗi');
        })
}
function NhapDiemSo(id) {
    var addScore = document.getElementById('buttonChange');
    addScore.onclick = function (event) {
        event.preventDefault();
        var isValid = true;
        if (moDul1.value === '') {
            document.getElementById('modul1E').innerText = 'Vui lòng nhập điểm số modul 1';
            isValid = false;
        } else {
            document.getElementById('modul1E').innerText = '';
        }

        if (moDul2.value === '') {
            document.getElementById('modul2E').innerText = 'Vui lòng nhập điểm số modul 2';
            isValid = false;
        } else {
            document.getElementById('modul2E').innerText = '';
        }

        if (moDul3.value === '') {
            document.getElementById('modul3E').innerText = 'Vui lòng nhập điểm số modul 3';
            isValid = false;
        } else {
            document.getElementById('modul3E').innerText = '';
        }

        if (moDul4.value === '') {
            document.getElementById('modul4E').innerText = 'Vui lòng nhập điểm số modul 4';
            isValid = false;
        } else {
            document.getElementById('modul4E').innerText = '';
        }

        if (isValid) {
            addGrade(id);
            console.log(id);
            moDul1.value = "";
            moDul2.value = "";
            moDul3.value = "";
            moDul4.value = ""
        } else {
            alert("Vui lòng nhập đầy đủ điểm số");
        }
    }
}
