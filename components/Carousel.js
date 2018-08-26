import React, {Component} from 'react'
import {render} from 'react-dom'
import cx from 'classnames'
import data from '../static/demo-slide-data'
import NonPassiveTouchTarget from 'react-touch-carousel'
import TouchCarousel, {clamp} from 'react-touch-carousel'
import touchWithMouseHOC from 'react-touch-carousel'
import '../styles/components/_carousel.scss'

const query = ""
const enableLoop = 0
const enableAutoplay = 0

const cardSize = 300
const cardPadCount = enableLoop ? 3 : 0
// const carouselWidth = clamp(window.innerWidth, 0, 960)

function log (text) {
  document.getElementById('console').innerText = text
}

function CarouselContainer (props) {
  const {cursor, carouselState: {active, dragging}, ...rest} = props
  let current = -Math.round(cursor) % data.length
  while (current < 0) {
    current += data.length
  }
  // Put current card at center
  const translateX = (cursor - cardPadCount) * cardSize + (carouselWidth - cardSize) / 2
  return (
    <NonPassiveTouchTarget
      className={cx(
        'carousel-container',
        {
          'is-active': active,
          'is-dragging': dragging
        }
      )}
    >
      <NonPassiveTouchTarget
        className='carousel-track'
        style={{transform: `translate3d(${translateX}px, 0, 0)`}}
        {...rest}
      />

      <div className='carousel-pagination-wrapper'>
        <ol className='carousel-pagination'>
          {data.map((_, index) => (
            <li
              key={index}
              className={current === index ? 'current' : ''}
            />
          ))}
        </ol>
      </div>
    </NonPassiveTouchTarget>
  )
}

const Container = touchWithMouseHOC(CarouselContainer)

class Carousel extends React.Component {
  renderCard (index, modIndex) {
    const item = data[modIndex]
    return (
      <div
        key={index}
        className='carousel-card'
        onClick={() => log(`clicked card ${1 + modIndex}`)}
      >
        <div
          className='carousel-card-inner'
          style={{backgroundColor: item.background}}
        >
          <div className='carousel-title'>{item.title}</div>
          <div className='carousel-text'>{item.text}</div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <TouchCarousel
        component={Container}
        cardSize={cardSize}
        cardCount={data.length}
        cardPadCount={cardPadCount}
        loop={enableLoop}
        autoplay={enableAutoplay ? 2e3 : false}
        renderCard={this.renderCard}
        onRest={index => log(`rest at index ${index}`)}
        onDragStart={() => log('dragStart')}
        onDragEnd={() => log('dragEnd')}
        onDragCancel={() => log('dragCancel')}
      />
    )
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const ndRoot = document.getElementById('react-root')
  render(<App />, ndRoot)

  let optionExplain = []
  if (enableLoop) {
    optionExplain.push('loop')
  }
  if (enableAutoplay) {
    optionExplain.push('autoplay=2000')
  }
  if (optionExplain.length) {
    document.getElementById('option-explain').textContent = optionExplain.join(' ')
  }
})

export default Carousel
