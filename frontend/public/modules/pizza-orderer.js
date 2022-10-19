export function orderPizza(orderObj) {
    fetch('http://127.0.0.1:9002/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderObj)
    })
    .then(res => {
        if (res.ok) alert(`${res.status}, ${res.statusText}, Order successful, redirecting to payment site...`);
        else alert(`${res.status}, ${res.statusText}. Order failed.`)
    })
    .catch(err => console.error(err))
}