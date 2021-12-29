import StoreModule from "../module";

class CountriesStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      waiting: false,
      countries: []
    };
  }

  /**
   * Загрузка списка стран
   */
  async load() {
    this.updateState({
      waiting: true,
    });
    try {
      const responseCountries = await fetch(` api/v1/countries?limit=*&fields=_id,title,code&sort=title.ru`);
      const json = await responseCountries.json();
      const countries = json.result.items.map((item) => {
        return {title: item.title, value: item._id}
      })
      if (json.error) throw new Error(json.error);
      this.updateState({
        countries: countries,
      });
    } catch (e) {
      this.updateState({
        countries: [],
        waiting: false
      });
    }
  }
}

export default CountriesStore;
