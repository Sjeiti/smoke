import React, {useCallback, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'

const {body} = document

const StyledHandle = styled.div`
  position: absolute;
  &:after {
    content: '';
    display: block;
    transform: translate(-50%, -50%);
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #F008;
  }
`

interface IHandleProp {
  onDrag?:Function
  , x?:number
  , y?:number
}

export const Handle = ({ onDrag, x, y, ...attr }:IHandleProp) => {

  const handleRef = useRef(null)

  const [style, setStyle] = useState({left:x+'px',top:y+'px'})

  const onMousemoveHandle = useCallback((target, e)=>{
    const {clientX, clientY} = e
    const {left, top} = target.parentNode.getBoundingClientRect()
    const x = clientX-left
    const y = clientY-top
    setStyle({left:x+'px',top:y+'px'})
    onDrag?.(x,y)
  }, [])

  const onMousedownHandle = useCallback((e)=>{
    const {target} = e
    const mouseMove = onMousemoveHandle.bind(null, target)
    function mouseUp(){
      body.removeEventListener('mousemove', mouseMove)
      body.removeEventListener('mouseup', mouseUp)
    }
    body.addEventListener('mousemove', mouseMove)
    body.addEventListener('mouseup', mouseUp)
  }, [])

  useEffect(()=>{
    const {current} = handleRef
    current?.addEventListener('mousedown', onMousedownHandle)
    return ()=>current?.removeEventListener('mousedown', onMousedownHandle)
  }, [handleRef])

  return <StyledHandle
      ref={handleRef}
      style={style}
      {...attr}
  />
}
