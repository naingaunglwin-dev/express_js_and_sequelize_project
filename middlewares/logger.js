module.exports = (req, res, next) => {

  const formattedDateTime = new Intl.DateTimeFormat('en-Us', {
    timeZone: 'Asia/Yangon',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date());

  console.log(`${req.method} ${req.url} at ${formattedDateTime}`);

  next();
}
