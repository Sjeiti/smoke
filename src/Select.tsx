import React, {ChangeEventHandler} from 'react'
import styled from 'styled-components'
// import {StyledInput} from './Input'
// import {noop} from '../../util'

const noop = ()=>{}

const StyledSelect = styled.select`
  max-width: 100%;
  height: 1.875rem;
  padding: 0 0 0 0.75rem;
`

interface ISelectProp {
  name?:string
  , value?:any
  , onChange?:ChangeEventHandler<HTMLSelectElement>
  , setter?:Function
  , options:{value:any, text:string}[]
}

export const Select = ({ name, value, onChange, setter, options, ...attr }:ISelectProp) => {
  setter?.(value||options[0]?.value)
  return <StyledSelect
      name={name}
      defaultValue={value}
      onChange={onChange || setter && (({ target: { value } }) => setter(value)) || noop}
      {...attr}
  >
    {options.map(({value, text}, i) => <option value={value} key={'n'+(value||i)}>{text}</option>)}
  </StyledSelect>
}
