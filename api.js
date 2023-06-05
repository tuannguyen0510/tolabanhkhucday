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
        <td>Điểm Trung Bình</td> 
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
                         <td><button class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">Thêm điểm</button></td> 
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

    } else {
        getdata1();
        document.getElementById('NameErr').innerText = '';
    }
})