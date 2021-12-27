import React, {useState} from 'react';
import propTypes from 'prop-types';
import {cn} from '@bem-react/classname'
import './styles.css';
import Select from "../select";

function ArticleEditCard({ error,article, changeArticle, countries, category, sendArticle}) {
  // CSS классы по БЭМ

  const className = cn('ArticleEditCard');
  const [edit, setEdit] = useState(article)
  const changeTitle = (e) => {
    const edit = {...article}
    edit.title = e.target.value
    changeArticle(edit)
  }
  const changeDesc = (e) => {
    const edit = {...article}
    edit.description = e.target.value
    changeArticle(edit)
  }
  const changeCountry = (e) => {
    const edit = {...article}
    edit.maidIn._id = e
    changeArticle(edit)
  }
  const changeCategory = (e) => {
    const edit = {...article}
    edit.category._id = e
    changeArticle(edit)
  }
  const changeYears = (e) => {

    const edit = {...article}
    edit.edition = e.target.value
    changeArticle(edit)
  }
  const changePrice = (e) => {
    const edit = {...article}
    edit.price = e.target.value
    changeArticle(edit)
  }
  const send = () => {
    sendArticle(article)
  }


  return (
    <div className={className()}>
      <div className={className('Prop')}>
        <div className={className('Label')}>Название</div>
        <input className={className('Value')} onChange={(e) => changeTitle(e)}
               value={article.title}/>
      </div>
      <div className={className('Description')}>
        <div className={className('Prop')}>
          <div className={className('Label')}>Описание</div>
          <textarea className={className('Value')} onChange={(e) => changeDesc(e)}
                    value={article.description}/>
        </div>
      </div>

      <div className={className('Prop')}>
        <div className={className('Label')}>Страна производитель</div>
        <Select onChange={changeCountry} options={countries} value={article.maidIn?._id}/>
      </div>
      <div className={className('Prop')}>
        <div className={className('Label')}>Категория</div>

        <Select onChange={changeCategory} options={category} value={article.category?._id}/>

      </div>
      <div className={className('Prop')}>
        <div className={className('Label')}>Год выпуска</div>
        <input className={className('Value')} onChange={changeYears} type={"number"}
               value={article.edition}/>
      </div>
      <div className={className('Prop')}>
        <div className={className('Label')}>Цена</div>
        <input className={className('Value')} onChange={changePrice} type={"number"}
               value={article.price}/>
      </div>
      {error?<p style={{color:"red"}}>{error}</p>:null}
      <button onClick={() => send()}>Сохранить</button>
    </div>
  )
}

ArticleEditCard.propTypes = {
  article: propTypes.object.isRequired,
  onAdd: propTypes.func
}

ArticleEditCard.defaultProps = {
  article: {},
}

export default React.memo(ArticleEditCard);
