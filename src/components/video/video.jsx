import ctl from "@netlify/classnames-template-literals"
import React from "react"

const Video = ({ src, ...props }) => {
	return (
		<video controls {...props} className={videoStyle}>
			<source src={src} type='video/mp4'></source>
		</video>
	)
}

const videoStyle = ctl(`
w-full
max-w-[967px]
mx-auto
my-8
`)
export { Video }
