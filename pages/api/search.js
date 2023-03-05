import * as JsSearch from 'js-search';

// utility
import MangaList from '../../utility/manga.json';

export default function handler(req, res) {
  const manga = MangaList.data;
  const search = new JsSearch.Search('title');

  const {
    query: { title },
  } = req;

  search.addIndex('title');
  search.addDocuments(manga);

  const searchResult = search.search(title);

  res.json(searchResult);
}
