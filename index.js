const submitData = async () => {
  let firstnameDOM = document.querySelector("input[name=firstname]");
  let lastnameDOM = document.querySelector("input[name=lastname]");
  let ageDOM = document.querySelector("input[name=age]");

  let genderDOM = document.querySelector("input[name=gender]:checked");
  let interestDOMs = document.querySelectorAll("input[name=interest]:checked");

  let descriptionDOM = document.querySelector("textarea[name=description]");

  let interestDOM = "";
  for (let i = 0; i < interestDOMs.length; i++) {
    interestDOM += interestDOMs[i].value;
    if (i != interestDOMs.length - 1) {
      interestDOM += ", ";
    }
  }
  let userData = {
    firstname: firstnameDOM.value,
    lastname: lastnameDOM.value,
    age: ageDOM.value,
    gender: genderDOM.value,
    interest: interestDOM,
    description: descriptionDOM.value,
  };
  console.log("submit data", userData);
  const response = await axios.post("http://localhost:8000/users/", userData);
  console.log("response", response.data);
};
