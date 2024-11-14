const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const humanDate = (dateString) => new Date(dateString).toLocaleDateString(undefined, options);