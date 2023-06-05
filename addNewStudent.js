var nameInp = document.getElementById('name');
        var validateName = function () {
            var NameError = document.getElementById('NameErr');
            if (nameInp.value !== '') {
                NameError.innerText = '';
            } else {
                NameError.innerText = 'Vui lòng nhập tên học viên';
            }
        }
        nameInp.oninput = validateName;
        var ageInp = document.getElementById('age');
        var validateAge = function () {
            var ageError = document.getElementById('ageErr');
            if (ageInp.value > 10) {
                ageError.innerText = '';
            } else {
                ageError.innerText = 'Vui lòng nhập tuổi';
            }
        }
        ageInp.oninput = validateAge;
        var addressInp = document.getElementById('address');
        var validateAddress = function () {
            var addError = document.getElementById('addErr')
            if (addressInp.value !== '') {
                addError.innerText = '';
            } else {
                addError.innerText = 'Vui lòng nhập địa chỉ học viên';
            }
        }
        addressInp.oninput = validateAddress;
        document.getElementById('add').addEventListener('click', function (event) {
            event.preventDefault();

            validateName();
            validateAge();
            validateAddress();
            var checkData = document.querySelectorAll('small');
            var resul = Array.from(checkData).every(function (small) {
                return small.innerText == '';
            })
            console.log(resul);
            if (resul) {
                function Student(name, age, address) {
                    this.name = name;
                    this.age = age;
                    this.address = address;
                }
                var name = nameInp.value;
                var age = ageInp.value;
                var address = addressInp.value;
                var student1 = new Student(name, age, address);
                let postData = JSON.stringify(student1);
                console.log(postData);
                var Alert = document.getElementById('alert');
                fetch('https://646b70ec7d3c1cae4ce3cd87.mockapi.io/students',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: postData
                    })
                    .then(function (response) {
                        if (response.ok) {
                            Alert.innerHTML = 'Thêm học viên thành công';
                            Alert.className = 'text-success';
                            ageInp.value ="";
                            addressInp.value="";
                            nameInp.value="";
                        } else {
                            Alert.innerHTML = 'Thêm học viên thất bại';
                            Alert.className = 'text-danger';
                        }
                    })
                    .catch(function (error) {
                        Alert.innerHTML = 'Có lỗi';
                        Alert.className = 'text-danger';
                    });
            }
        });