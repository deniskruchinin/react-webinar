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

  async loadCategory() {
    const responseCategory = await fetch(`/api/v1/categories?limit=*&fields=_id,parent,title`)
    const jsonCategory = await responseCategory.json();

    function rec(data, initId, acc, count) {
      count += 1
      data.map((item) => {
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

    const category = rec(jsonCategory.result.items, null, [{title: 'все', value:''}], -1)

    this.setState({
      category:category
    });

  }


}

export default CategoryStore;
