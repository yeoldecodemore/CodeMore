export const sanitizeDate = date =>
  date
    ? `${date.getUTCMonth() + 1}/${date.getUTCDate() - 1}/${date
        .getUTCFullYear()
        .toString()
        .slice(2, 4)}`
    : 0
