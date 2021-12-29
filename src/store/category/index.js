import StoreModule from "../module";

class CategoryStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      category: []
    };
  }

  /**
   * Загрузка категорий товара
   */

  async load() {
    const responseCategory = await fetch(`/api/v1/categories?limit=*&fields=_id,parent,title`)
    const jsonCategory = await responseCategory.json();

    function rec(data, initId, acc, count) {
      const dataSort = data.sort((a, b) => {
          const current = a.title.toLowerCase(), prev = b.title.toLowerCase()
          if (current > prev)
            return -1
          if (current < prev)
            return 1
          return 0
        }
      )
      count += 1
      dataSort.map((item) => {
        if (item.parent?._id === initId || item.parent === initId) {
          let nesting = ''
          for (let i = 0; i < count; i++) {
            nesting += "-"
          }
          acc.push({title: `${nesting}${item.title}`, value: item._id})
          rec(data, item._id, acc, count)
        }
      })
      return acc;
    }

    const category = rec(jsonCategory.result.items, null, [{title: 'все', value: ''}], -1)

    this.setState({
      category: category
    });

  }


}

export default CategoryStore;
