export function sortItemsByDate(arr) {
  return arr.sort(
    (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
  );
}

export function parseData(dataName, { created_at }, userId) {
  const date = new Date(Date.parse(created_at));

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Spt',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = months[date.getMonth()];

  return `${dataName} was added by ${userId} on ${date.getDate()} ${month} ${date.getFullYear()} in ${date.getHours()}:${
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  } `;
}

export function getCommentsForUser(comments, userId) {
  const res = [];
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].user_id === userId) {
      res.push(comments[i]);
    }
  }
  return res;
}

export function getPostsByUser(userId, posts) {
  return posts.reduce((acc, post) => {
    if (userId === post.user_id) {
      acc.push(post);
    }
    return acc;
  }, []);
}
