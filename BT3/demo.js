const data = [];

const res = fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
  res.json().then((res) => data.push(res.data))
);

console.log(data);
