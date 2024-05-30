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

    const response = await axios.post("http://localhost:8000/users/", userData);
    console.log("response", response.data);
    messageDOM.innerHTML = "data saved";
    messageDOM.className = "message success";
  } catch (error) {
    // const tmp = JSON.stringify(error);
    // console.log("error check 0 ", tmp);
    console.log("error check 1 ", error);
    console.error("error message", error.error || error.message);
    // console.error("error", error);
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
