import StoreModule from "../module";

class ArticleStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: {},
      waiting: true
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(id){

    const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    if (json.error) throw new Error(json.error);

    this.updateState({
      data: json.result,
    });

    // return??
  }
}

export default ArticleStore;
