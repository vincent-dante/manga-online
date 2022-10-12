// utility
import Details from '../../utility/manga.json';

export default function handler(req, res) {
  const details = Details.data;
  const {
    query: { id },
  } = req;

  res.json({
    ...details.find((details) => details.id === id),
  });
}
