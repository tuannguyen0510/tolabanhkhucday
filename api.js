function getdata() {
    fetch('https://646b70ec7d3c1cae4ce3cd87.mockapi.io/students', {
        method: 'GET'
    })
        .then(async function (response) {
            let students = await response.json();
            console.log(students);
            displayStudents(students);
        })
        .catch(function (er) {
            alert('có lỗi');
        })
}
function displayStudents(students) {
    let studentsE = document.getElementById('students');
    let html = '';
    for (var student of students) {
        html += `
        <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.address}</td> 
        </tr> `
    }
    studentsE.innerHTML = html;
  }

  getdata();