import React from 'react'
import './Section.css'

export default function Section ({title, children}) {
return (
    <section className = 'Section'> {title} {children} </section>
)
}