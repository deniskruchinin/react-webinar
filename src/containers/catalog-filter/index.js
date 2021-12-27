import React, {useCallback, useMemo} from "react";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Select from "../../components/select";
import LayoutTools from "../../components/layout-tools";
import Input from "../../components/input";
import useInit from "../../utils/use-init";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categoryValue: state.catalog.category,
    category: state.category.category
  }));

  // Опции для полей
  const options = {
    sort: useMemo(() => ([
      {value: 'key', title: 'По коду'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), [])
  }

  useInit(async () => {
    await store.category.loadCategory()
    await store.catalog.setParams({category: '', page: 1})
  }, []);


  const callbacks = {
    onSort: useCallback(sort => store.catalog.setParams({sort}), [store]),
    onCategory: useCallback(category => store.catalog.setParams({category, page: 1}), [store]),
    onSearch: useCallback(query => store.catalog.setParams({query, page: 1}), [store]),
    onReset: useCallback(() => store.catalog.resetParams(), [store]),
  }

  return (
    <LayoutTools>
      <Select onChange={callbacks.onCategory} options={select.category}
              value={select.categoryValue}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <label>Сортировка:</label>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort}/>
      <button onClick={callbacks.onReset}>Сбросить</button>
    </LayoutTools>
  );
}

export default React.memo(CatalogFilter);