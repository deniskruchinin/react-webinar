import React, {useCallback, useEffect, useState} from 'react';
import propTypes from "prop-types";
import {cn} from '@bem-react/classname'
import './styles.css';
import throttle from "lodash.throttle";

function TextArea(props) {

  // Внутренний стейт по умолчанию с переданным value
  const [value, change] = useState(props.value);
  const [name, changeName] = useState(props.name);

  // Задержка для вызова props.onChange
  const changeThrottle = useCallback(throttle((value,name) => props.onChange(value,name), 1000), [props.onChange]);

  // Обработчик изменений в поле
  const onChange = useCallback(event => {
    change(event.target.value);
    changeThrottle(event.target.value,event.target.name);
  }, [change, changeThrottle]);

  // Обновление стейта, если передан новый value
  useEffect(() => {
    change(props.value);
    changeName(props.name)
  }, [props.value,props.name]);

  // CSS классы по БЭМ
  const className = cn('TextArea');

  return (
    <textarea
      name={props.name}
      className={className({theme: props.theme})}
      value={value}
      placeholder={props.placeholder}
      onChange={onChange}
    />
  )
}

TextArea.propTypes = {

  value: propTypes.string,
  placeholder: propTypes.string,
  onChange: propTypes.func,
  theme: propTypes.string,
}

TextArea.defaultProps = {
  onChange: () => {},
  theme: ''
}

export default React.memo(TextArea);
