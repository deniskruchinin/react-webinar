import StoreModule from "../module";

class ArticleEditStore extends StoreModule {

  export
  default
  ArticleEditStore;

  /**
   * Начальное состояние
   */
  initState() {
    return {
      countries: [],
      header: "",
      data: {},
      waiting: true,
      error: false
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(id) {
    this.updateState({
      waiting: true,
      data: {}
    });
    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
      const json = await response.json();
      const responseCountries = await fetch(` api/v1/countries?limit=*&fields=_id,title,code&sort=title.ru`);
      const jsonCountry = await responseCountries.json();

      const countries = jsonCountry.result.items.map((item) => {
        return {title: item.title, value: item._id}
      })
      if (json.error) throw new Error(json.error);
      this.updateState({
        countries: countries,
        data: json.result,
        header: json.result.title,
        waiting: false
      });
    } catch (e) {
      this.updateState({
        data: {},
        waiting: false
      });
    }
  }

  async sendArticle(article) {

    try {
      const response = await fetch(`/api/v1/articles/${article._id}`,
        {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(article)
        }
      );
      const json = await response.json();
      if (json.error) throw new Error(json.error.message);

      this.updateState({
        data: json.result,
        header: json.result.title,
        waiting: false
      });
    } catch (e) {
      this.updateState({
        error:e.message,
        waiting: false
      });
    }
  }

  changeArticle(editArticle) {


    this.updateState({
      data: {...editArticle},
      waiting: false
    });
  }

}

export default ArticleEditStore;
