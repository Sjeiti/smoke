import {hot} from 'react-hot-loader/root'
import React, {useCallback, useMemo, useState} from 'react'
import styled from 'styled-components'
import {Select} from './Select'
// import * as path from 'path'
// import {Switch, BrowserRouter as Router} from 'react-router-dom'
// import {Providers} from './context'
// import {Routes} from './Routes'
// import {Footer, Ghost, Header} from './component'

export interface IColumn {
  path: string
  num: number
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  flex: 1 0 auto;
  overflow: hidden;
  >main { 
    flex: 1 1 auto;
    padding: 2rem 0 1rem;
  }
  >header, >footer { flex: 0 0 auto; }
  svg {
    
  }
  
  .wrap {
    position: relative;
    width: 256px;
    height: 256px;
    margin: 10rem auto 0 auto;
    box-shadow: 0 0 0 1px red;
  }

  .handle {
    position: absolute;
  }

  .handle:after {
    content: '';
    display: block;
    transform: translate(-50%, -50%);
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #F008;
  }

  .handle_col1:after {
    background-color: #0F08;
  }
`

const size = 32
const scale = 8
const duration = 3500
const dur = duration+'ms'
const animateMotionAttrs = {
  dur,
  repeatCount: 'indefinite',
  path: 'M5 25C24 20 2 7 25 5',
  calcMode: 'spline',
  // keySplines: '.4,.1,.4,.9',
  // keySplines: '0,.9,1,.1',
  keySplines: '.5,0,.5,1',
  keyTimes: '0;1'
}

const animateAttrs = {
  dur,
  attributeName: 'r',
  values: '.1;5;.1',
  repeatCount: 'indefinite',
  // calcMode: 'spline',
  //keySplines: '.1,0,.6,1;.7,0,.4,1'
  //keySplines: '.42,0,1,1;0,0,.58,1'
  //keySplines: '0,0,.6,1;.4,0,1,1'
  // keySplines: '0,0,.5,1;.4,0,1,1'
}


function splitPath(path){
  return path.substring(1)
      .split(/[^-.t\d]/).map(n=>parseFloat(n))
      .reduce((acc,o,i)=>{
        const newIndex = Math.floor(i/2)
        const sub = acc[newIndex]||[]
        sub.push(o)
        acc[newIndex] = sub
        return acc
      },[])
}

export const App = hot(()=> {

  const [columns, setColumns] = useState<IColumn[]>([
        {path:'M4 28C13 16 2 7 11 3', num:6},
        {path:'M15 29C18 22 27 13 30 5', num:12}
      ]
  )

  const addColumn = ()=>{
    setColumns([...columns,{path:'M4 28C13 16 2 7 11 3', num:6}])
    console.log('addColumn',addColumn) // todo: remove log
  }

  const [currentColumn, setCurrentColumn] = useState<IColumn>(columns[0])
  const currentIndex = useMemo(()=>columns.indexOf(currentColumn), [columns, currentColumn])
  const currentPathPoints = useMemo(()=>splitPath(currentColumn.path), [currentColumn])
  console.log('currentPathPoints',currentPathPoints) // todo: remove log


  const setNum = useCallback((number:number)=>{
    columns[currentIndex].num = number
    setColumns(columns)
  }, [columns, currentIndex])

  return <Layout>
    <button onClick={()=>addColumn()}>add column</button>

    hello {columns.length}

    <Select
        options={columns.map((c,i)=>({text:c.path,value:i}))}
        onChange={(e)=>setCurrentColumn(columns[e.target.value])}
        value={currentIndex}
    />

    <div>index: {currentIndex}</div>
    <div>path: {currentColumn?.path}</div>
    <label>num: <input type="number" defaultValue={currentColumn?.num} onChange={(e)=>setNum(e.target.valueAsNumber)} /></label>

    <div className="wrap">

      <svg width="32" height="32" viewBox="0 0 32 32" style={{width: '256px', height: '256px'}}>
        {columns.map((column,i)=>{
          const {path, num} = column
          return Array(num).fill(1).map((o,j)=>{
            const begin = -duration + (duration/num*j) + 'ms'
            return <circle key={i*1E9+j}>
              <animateMotion {...{...animateMotionAttrs,begin,path}} />
              <animate {...{...animateAttrs,begin}} />
            </circle>
          })
        })}
      </svg>

      {currentPathPoints.map(([x,y],i)=>{
        return <div
            key={'handle'+i}
            className="handle"
            data-index={i}
            style={{left: x*scale+'px', top: y*scale+'px'}}
        />
      })}

    </div>

  </Layout>

})

/*

<meta name="viewport" content="width=device-width, initial-scale=1">

<style>
	:root {
		--start: 0.4deg;
		--end: 2deg;
		--clr: rgba(255,255,255,0.3);
		--t: 0;
		--sin: 0;
		--cos: 1;
		--part: 0.1;
		--total: 1;
	}

	body,
	html {
		width: 100vw;
		height: 101vh;
		margin: 0;
		padding: 0;
		overflow: hidden;
		background-color: #666;
	}

  .handle {
		position: absolute;
  }
  .handle:after {
    content: '';
    display: block;
		transform: translate(-50%,-50%);
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
		background-color: #F008;
  }
	.handle_col1:after {
		background-color: #0F08;
	}
</style>
<div>
  <button data-add>add column</button>
  <input type="number" data-num/>
</div>

<script>
  const {body} = document
  const xmlns = 'http://www.w3.org/2000/svg'

  const columns = [
    {path:'M4 28C13 16 2 7 11 3', num:6},
    {path:'M15 29C18 22 27 13 30 5', num:6}
  ]

  const size = 32
  const scale = 8
  const duration = 3500
  const dur = duration+'ms'

  const animateMotionAttrs = {
    dur,
    repeatCount: 'indefinite',
    path: 'M5 25C24 20 2 7 25 5',
    calcMode: 'spline',
    // keySplines: '.4,.1,.4,.9',
    // keySplines: '0,.9,1,.1',
    keySplines: '.5,0,.5,1',
    keyTimes: '0;1'
  }

  const animateAttrs = {
    dur,
    attributeName: 'r',
    values: '.1;5;.1',
    repeatCount: 'indefinite',
    // calcMode: 'spline',
    //keySplines: '.1,0,.6,1;.7,0,.4,1'
    //keySplines: '.42,0,1,1;0,0,.58,1'
    //keySplines: '0,0,.6,1;.4,0,1,1'
    // keySplines: '0,0,.5,1;.4,0,1,1'
  }

  create('script', body, {src:'//cdn.jsdelivr.net/npm/eruda'})
      .addEventListener('load', onLoadScript)

  function onLoadScript(){
    window.eruda.init()
  	initSVG()
  }

  function initSVG(){

    const wrap = create('div',body)
    Object.assign(wrap.style,{
      position: 'relative',
      width: '256px',
      height: '256px',
      margin: '10rem auto 0 auto',
      boxShadow: '0 0 0 1px red'
    })
    const svg = createNS('svg',wrap,{
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`
    })
    Object.assign(svg.style,{
      width: size*scale+'px',
      height: size*scale+'px'
    })
    // const svg = document.querySelector('svg')

    ;columns.forEach((column,i,a)=>{

      const {path,num} = column

      const [x1, y1, x1s, y1s, x2s, y2s, x2, y2] = splitPath(path)

      createHandle(x1, y1, 0, i)
      createHandle(x1s, y1s, 1, i)
      createHandle(x2s, y2s, 2, i)
      createHandle(x2, y2, 3, i)

      const animateMotions = []

      Array.from(new Array(num)).forEach((o,j,m)=>{
        const circle = createNS('circle', svg)
        i===11&&(circle.style.fill = '#333')
        const begin = -duration + (duration/num*j) + 'ms'
        animateMotions.push(createNS('animateMotion',circle,{...animateMotionAttrs,begin,path}))
        createNS('animate',circle,{...animateAttrs,begin})
      })

      function createHandle(x,y,index,col){
        const handle = create('div',wrap,{class:`handle handle_col${col}`,'data-index':index})
        Object.assign(handle.style, {left: x*scale+'px', top: y*scale+'px'})
        handle.addEventListener('mousedown', onMousedownHandle)
        return handle
      }

      function onMousedownHandle(e){
        const {target} = e
        const mouseMove = onMousemoveHandle.bind(null, target)
        function mouseUp(){
          console.log('mouseUp',e) // todo: remove log
          body.removeEventListener('mousemove', mouseMove)
          body.removeEventListener('mouseup', mouseUp)
        }
        body.addEventListener('mousemove', mouseMove)
        body.addEventListener('mouseup', mouseUp)
      }

      function onMousemoveHandle(target, e){
        const index = parseInt(target.dataset.index, 10)
        console.log('index',index) // todo: remove log
        const {clientX, clientY} = e
        const {left:l, top:t} = target.parentNode.getBoundingClientRect()
        const left = clientX-l
        const top = clientY-t
        Object.assign(target.style, {left,top})
        console.log('onMousemoveHandle',e) // todo: remove log
        setAnimateMotionsPath(index, left/scale, top/scale)
      }

      function setAnimateMotionsPath(index, x, y){
        const oldPath = animateMotions[0].getAttribute('path')
        const points = splitPath(oldPath)
        points[2*index] = x.toFixed(0)
        points[2*index+1] = y.toFixed(0)
        const [x1, y1, x1s, y1s, x2s, y2s, x2, y2] = points
        const path = `M${x1} ${y1}C${x1s} ${y1s} ${x2s} ${y2s} ${x2} ${y2}`
        animateMotions.forEach(elm=>elm.setAttribute('path', path))
        console.log('setAnimateMotionsPath',animateMotions,index, x, y) // todo: remove log
      }

      function splitPath(path){
        return path.substring(1).split(/[^-.t\d]/).map(n=>parseFloat(n))
      }

    })
  }

  function create(type,parent,attrs){
    const elm = document.createElement(type)
    attrs&&Object.entries(attrs).forEach(([attr, value])=>{
      elm.setAttribute(attr, value)
    })
    parent.appendChild(elm)
    return elm
  }

  function createNS(type,parent,attrs){
    const elm = document.createElementNS(xmlns, type)
    attrs&&Object.entries(attrs).forEach(([attr, value])=>{
      elm.setAttribute(attr, value)
    })
    parent.appendChild(elm)
    return elm
  }
</script>


*/
