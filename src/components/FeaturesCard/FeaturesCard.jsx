import React from 'react'

function FeaturesCard({iconClass, description}) {
  return (
    <>
        <div className="item group shadow-[var(--box-shadow)] bg-[var(--card-background)] py-6 rounded-[var(--border-radius)] flex flex-col justify-center items-center mt-2">
            <i className={`${iconClass} text-5xl text-[var(--secondary-color)] mb-5 transition-transform duration-300 group-hover:scale-125`}></i>
            <p className="leading-[var(--line-height)]">{description}</p>
        </div>
    </>
  )
}

export default FeaturesCard