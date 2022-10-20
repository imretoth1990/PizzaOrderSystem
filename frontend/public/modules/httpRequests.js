export const postOrderData = async (object) => {
  const url = "http://127.0.0.1:9002/api/order";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
    .then((response) => response)
    .then((data) => {
      if (data.ok) {
        alert(`Status: ${Number(data.status)} ${data.statusText}`);
      } else {
        alert("Status: 400 Bad Request");
      }
    })
    .catch((err) => {
      alert(`Error: ${err}`);
    });
};
