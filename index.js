const BASE_URL = "http://localhost:8000";

let mode = "CREATE"; // default
let selectedId = "";

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search); // learn more
  const id = urlParams.get("id");
  console.log(id);
  if (id) {
    mode = "EDIT";
    selectedId = id;

    try {
      // get old data
      const response = await axios.get(`${BASE_URL}/users/${id}`); // template literal
      const user = response.data[0];
      console.log("data", response.data);

      // insert the old one
      let firstnameDOM = document.querySelector("input[name=firstname]");
      let lastnameDOM = document.querySelector("input[name=lastname]");
      let ageDOM = document.querySelector("input[name=age]");
      let descriptionDOM = document.querySelector("textarea[name=description]");

      firstnameDOM.value = user.firstName;
      lastnameDOM.value = user.lastName;
      ageDOM.value = user.age;
      descriptionDOM.value = user.description;

      let genderDOM = document.querySelectorAll("input[name=gender]") || {};
      let interestDOMs = document.querySelectorAll("input[name=interest]");

      for (let i = 0; i < genderDOM.length; i++) {
        if (genderDOM[i].value == user.gender) {
          genderDOM[i].checked = true;
        }
      }

      for (let i = 0; i < interestDOMs.length; i++) {
        if (user.interest.includes(interestDOMs[i].value)) {
          interestDOMs[i].checked = true;
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  }
};

const validateData = (userData) => {
  let errors = [];

  if (!userData.firstname) {
    errors.push("add your name");
  }
  if (!userData.lastname) {
    errors.push("add your lastname");
  }
  if (!userData.age) {
    errors.push("add your age");
  }
  if (!userData.gender) {
    errors.push("select your gender");
  }
  if (!userData.interest) {
    errors.push("select your interests");
  }
  if (!userData.description) {
    errors.push("add your description");
  }

  return errors;
};

const submitData = async () => {
  let firstnameDOM = document.querySelector("input[name=firstname]");
  let lastnameDOM = document.querySelector("input[name=lastname]");
  let ageDOM = document.querySelector("input[name=age]");

  let genderDOM = document.querySelector("input[name=gender]:checked") || {};
  let interestDOMs = document.querySelectorAll("input[name=interest]:checked");

  let descriptionDOM = document.querySelector("textarea[name=description]");

  let messageDOM = document.getElementById("message");

  try {
    let interestDOM = "";
    for (let i = 0; i < interestDOMs.length; i++) {
      interestDOM += interestDOMs[i].value;
      if (i != interestDOMs.length - 1) {
        interestDOM += ", ";
      }
    }
    console.log("test");
    let userData = {
      firstname: firstnameDOM.value,
      lastname: lastnameDOM.value,
      age: ageDOM.value,
      gender: genderDOM.value,
      interest: interestDOM,
      description: descriptionDOM.value,
    };
    console.log("submit data", userData);

    const errors = validateData(userData);

    if (errors.length > 0) {
      throw {
        message: "data incomplete from frontend",
        errors: errors,
      };
    }
    let message = "data saved";
    if (mode == "CREATE") {
      const response = await axios.post(`${BASE_URL}/users/`, userData);
    } else {
      message = "data edited";
      const response = await axios.put(
        `${BASE_URL}/users/${selectedId}`,
        userData
      );
    }
    // console.log("response", response.data);
    messageDOM.innerHTML = message;
    messageDOM.className = "message success";
  } catch (error) {
    // const tmp = JSON.stringify(error);
    // console.log("error check 0 ", tmp);
    console.error("error message", error.error || error.message);
    if (error.response) {
      console.log("first");
      // console.log(error.response.data.message);
      error.message = error.response.data.error || error.response.data.message;
      error.errors = error.response.data.errors;
    }

    let htmlData = "<div>";
    htmlData += `<div>${error.message}</div>`;
    htmlData += "<ul>";
    for (let i = 0; i < error.errors.length; i++) {
      htmlData += `<li>${error.errors[i]}</li>`;
    }
    htmlData += "</ul>";
    htmlData += "</div>";
    messageDOM.innerHTML = htmlData;
    messageDOM.className = "message danger";
  }
  //   const response = await axios.post("http://localhost:8000/users/", userData);
  //   console.log("response", response.data);
};
