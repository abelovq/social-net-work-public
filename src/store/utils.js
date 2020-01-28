export function sortItemsByCreated_at(arr) {
  return arr.sort(
    (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
  );
}

export function parseData({ created_at }, userId) {
  const date = new Date(Date.parse(created_at));

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Spt",
    "Oct",
    "Nov",
    "Dec"
  ];
  const month = months[date.getMonth()];

  return `Comment was added by ${userId} on ${date.getDate()} ${month} ${date.getFullYear()} in ${date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  } `;
}
