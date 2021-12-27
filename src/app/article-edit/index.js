import React, {useCallback} from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import Spinner from "../../components/spinner";
import Header from "../../containers/header";
import useInit from "../../utils/use-init";
import ArticleEditCard from "../../components/article-edit-card";

function ArticleEdit() {

  const store = useStore();
  // Параметры из пути
  const params = useParams();

  // Начальная загрузка
  useInit(async () => {
    await store.articleEdit.load(params.id);
    await store.category.loadCategory();
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.articleEdit.data,
    waiting: state.articleEdit.waiting,
    countries:state.articleEdit.countries,
    category:state.category.category.filter((item)=>item.value!==''),
    header:state.articleEdit.header,
    error:state.articleEdit.error
  }));
  const callbacks = {
    changeArticle: useCallback((article) => store.articleEdit.changeArticle(article), [store]),
    sendArticle: useCallback((article) => store.articleEdit.sendArticle(article), [store]),
  }
  return (
    <Layout head={<h1>{select?.header}</h1>}>
      <Header/>
      <Spinner active={select.waiting}>
        <ArticleEditCard error={select.error} sendArticle={callbacks.sendArticle}  category = {select.category}  article={select.article} countries = {select.countries} changeArticle={callbacks.changeArticle}/>
      </Spinner>
    </Layout>
  );
}

export default React.memo(ArticleEdit);
