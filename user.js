const BASE_URL = "http://localhost:8000";

window.onload = async () => {
  await loadData();
};

const loadData = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  //   console.log(response);
  //   console.log(response.data);

  const userDOM = document.getElementById("user");

  let htmlData = "<div>";
  for (let i = 0; i < response.data.length; i++) {
    let user = response.data[i];
    htmlData += `<div>
    ${user.id} ${user.firstName} ${user.lastName}
    <a href='home2.html?id=${user.id}'><button>Edit</button></a>
    <button class='delete' data-id='${user.id}'>Delete</button>
    </div>`; // in <a> have query param concept
  }
  htmlData += "</div>";
  userDOM.innerHTML = htmlData;

  const deleteDOMs = document.getElementsByClassName("delete");
  //   console.log(deleteDOMs);
  for (let i = 0; i < deleteDOMs.length; i++) {
    deleteDOMs[i].addEventListener("click", async (event) => {
      const id = event.target.dataset.id; // js access data
      try {
        await axios.delete(`${BASE_URL}/users/${id}`);
        loadData();
      } catch (error) {
        console.log("error", error);
      }
    });
    // if (i == 1) {
    //   console.log("1", deleteDOMs);
    // }
  }
};
