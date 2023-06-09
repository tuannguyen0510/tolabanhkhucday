var formInp = document.querySelectorAll('input');
var gradeValidate = function () {
    for (let index = 0; index < formInp.length; index++) {
        if (formInp[index].value == '') {
            formInp[index].nextElementSibling.innerHTML = 'Vui lòng nhập' + formInp[index].name;
        } else {
            formInp[index].nextElementSibling.innerHTML = '';
        }
    }
}
for (let index = 0; index < formInp.length; index++) {
    formInp[index].oninput = gradeValidate
}
document.getElementById('submit').addEventListener('click', function () {
    gradeValidate();
    var checkSmall = document.querySelectorAll('small');
    var resul = Array.from(checkSmall).every(function (small) {
        return small.innerText == '';
    })
    console.log(resul);
    if (resul) {
        for (let index = 0; index < formInp.length; index++) {
            console.log(formInp[index].name + ": " + formInp[index].value);
        }
    }
})
