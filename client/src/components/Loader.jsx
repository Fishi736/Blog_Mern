import React from 'react'
import LoadingGif from '../assets/loading.gif'

const Loader = () => {
  return (
    <div className='loader mx-auto'>
        <div className="loader_image" style={{width:100}}>
            <img src={LoadingGif} alt="loading" className='img-fluid'  />

        </div>
    </div>
  )
}

export default Loader