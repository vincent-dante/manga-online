// utility
import ChapterList from '../../utility/chapter.json';

export default function handler(req, res) {
  const chapter = ChapterList.data;
  const {
    query: { id, chapterId },
  } = req;

  res.json({
    ...chapter.find((chapter) => chapter.id === id),
  });
  /* res.status(200).json({ coverImage: '/manga-cover/0001.jpg' }); */
}
