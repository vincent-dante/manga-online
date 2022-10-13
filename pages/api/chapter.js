// utility
import ChapterList from '../../utility/chapter.json';

export default function handler(req, res) {
  const chapter = ChapterList.data;
  const {
    query: { id },
  } = req;

  const findResult = chapter.find((chapter) => chapter.id === id);

  /*   res.json({
    data: [{ ...chapter.find((chapter) => chapter.id === id) }],
  }); */

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
