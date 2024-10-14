import React from 'react'

const Spinner = ({ borderColor }: {borderColor?: string}) => {

  return (
    <span className={`inline-block w-[16px] h-[16px] border-2 ${borderColor ?? "border-white"} border-b-transparent rounded-full animate-spin`}></span>
  )
}

export default Spinner;