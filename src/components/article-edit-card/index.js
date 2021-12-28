import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn} from '@bem-react/classname'
import './styles.css';
import Select from "../select";
import Input from "../input";
import TextArea from "../text-area";

function ArticleEditCard({error, article, onChange, countries, category, sendArticle}) {
  // CSS классы по БЭМ
  const className = cn('ArticleEditCard');
  const onChangeHandler = useCallback((value, name) => {
    const edit = {...article}
    edit[name]._id ? edit[name]._id = value : edit[name] = value
     return onChange(edit)
  }, [onChange]);

  const send = () => {
    sendArticle(article)
  }

  return (
    <div className={className()}>

      <div className={className('Prop')}>
        <div className={className('Label')}>Название</div>
        <Input name={"title"} onChange={onChangeHandler} value={article.title}/>
      </div>

      <div className={className('Prop')}>
        <div className={className('Label')}>Описание</div>
        <TextArea name={'description'} value={article.description} onChange={onChangeHandler}
                  theme={"big"}/>
      </div>

      <div className={className('Prop')}>
        <div className={className('Label')}>Страна производитель</div>
        <Select name={"maidIn"} onChange={onChangeHandler} options={countries}
                value={article.maidIn?._id}/>
      </div>

      <div className={className('Prop')}>
        <div className={className('Label')}>Категория</div>
        <Select name={"category"}  onChange={onChangeHandler} options={category} value={article.category?._id}/>
      </div>

      <div className={className('Prop')}>
        <div className={className('Label')}>Год выпуска</div>
        <Input name={"edition"} onChange={onChangeHandler} value={article.edition} type={"number"}/>
      </div>

      <div className={className('Prop')}>
        <div className={className('Label')}>Цена</div>
        <Input name={"price"} onChange={onChangeHandler} value={article.price} type="number"/>
      </div>

      {error ? <p style={{color: "red"}}>{error}</p> : null}
      <button onClick={() => send()}>Сохранить</button>
    </div>
  )
}

ArticleEditCard.propTypes = {
  article: propTypes.object.isRequired,
  sendArticle: propTypes.func
}

ArticleEditCard.defaultProps = {
  article: {},
}

export default React.memo(ArticleEditCard);
