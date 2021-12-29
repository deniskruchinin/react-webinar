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


  const onChangeHandler = useCallback((name) => {
    return (value) => {
      const edit = {...article}
      edit[name]._id ? edit[name]._id = value : edit[name] = value
      return onChange(edit)
    }
  },[onChange])

  const send = () => {
    sendArticle(article)
  }

  return (
    <div className={className()}>

      <div className={className('Prop')}>
        <div className={className('Label')}>Название</div>
        <Input  onChange={onChangeHandler("title")} value={article.title}/>
      </div>

      <div className={className('Prop')}>
        <div className={className('Label')}>Описание</div>
        <TextArea  value={article.description} onChange={onChangeHandler("description")}
                  theme={"big"}/>
      </div>

      <div className={className('Prop')}>
        <div className={className('Label')}>Страна производитель</div>
        <Select onChange={onChangeHandler("maidIn")} options={countries}
                value={article.maidIn?._id}/>
      </div>

      <div className={className('Prop')}>
        <div className={className('Label')}>Категория</div>
        <Select  onChange={onChangeHandler("category")} options={category}
                value={article.category?._id}/>
      </div>

      <div className={className('Prop')}>
        <div className={className('Label')}>Год выпуска</div>
        <Input  onChange={onChangeHandler("edition")} value={article.edition} type={"number"}/>
      </div>

      <div className={className('Prop')}>
        <div className={className('Label')}>Цена</div>
        <Input onChange={onChangeHandler("price")} value={article.price} type="number"/>
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
