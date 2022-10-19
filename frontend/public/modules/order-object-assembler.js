export function assembleOrderObject() {
    const newDate = new Date();

    const order = {
        "id": 1,
        "pizzas": [{ "id": 1, "amount": +document.querySelector('#number').value }],
        "date": {
          "year": newDate.getFullYear(),
          "month": newDate.getMonth() + 1,
          "day": newDate.getDate(),
          "hour": newDate.getHours(),
          "minute": newDate.getMinutes()
        },
        "customer": {
          "name": "John Doe",
          "email": "jd@example.com",
          "address": {
            "city": "Palermo",
            "street": "Via Appia 6"
          }
        }
      };

    return order;
}