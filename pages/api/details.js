// utility
import Details from '../../utility/manga.json';

export default function handler(req, res) {
  const details = Details.data;
  const {
    query: { id },
  } = req;

  const findResult = details.find((details) => details.id === id);

  if (findResult === undefined) {
    res.json({
      data: [],
    });
  } else {
    res.json({
      data: [{ ...findResult }],
    });
  }
}
