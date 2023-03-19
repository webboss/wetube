import ctl from "@netlify/classnames-template-literals"
import React from "react"
import { useState, useRef } from "react"
import { convertToMinuteSeconds } from "../../utils/formatters"
import { VideoOverlay } from "./overlay"

const Video = ({ src, ...props }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [isPlaying, setIsPlaying] = useState(false)
	const [videoDuration, setVideoDuration] = useState("00:00")
	const [currentTime, setCurrentTime] = useState("00:00")
	const [jumpTime, setJumpTime] = useState(0)
	const videoRef = useRef(null)
	const videoWrapperRef = useRef(null)

	const playPauseVideo = () => {
		const currentVideo = videoRef.current

		if (isPlaying) {
			currentVideo.pause()
		} else {
			currentVideo.play()
		}

		setIsPlaying(prevState => !prevState)
	}

	const onTimeUpdate = () => {
		setCurrentTime(() => convertToMinuteSeconds(videoRef.current.currentTime))
	}
	return (
		<div className={videoWrapperStyle} ref={videoWrapperRef}>
			<video
				onCanPlayThrough={() => {
					setVideoDuration(() =>
						convertToMinuteSeconds(videoRef.current.duration)
					)
					setIsLoading(false)
				}}
				onWaiting={() => setIsLoading(true)}
				preload='metadata'
				onEnded={() => {
					setIsPlaying(false)
					setJumpTime(0)
				}}
				onTimeUpdate={onTimeUpdate}
				{...props}
				className={videoStyle}
				ref={videoRef}>
				<source src={src} type='video/mp4'></source>
			</video>
			<VideoOverlay
				isPlaying={isPlaying}
				isLoading={isLoading}
				video={videoRef.current}
				playPauseVideo={playPauseVideo}
				currentTime={currentTime}
				videoWrapper={videoWrapperRef.current}
				videoDuration={videoDuration}
				jumpTime={jumpTime}
				setJumpTime={setJumpTime}
			/>
		</div>
	)
}

const videoWrapperStyle = ctl(`
w-full
max-w-[967px]
mx-auto
my-8
relative
`)

const videoStyle = ctl(`
w-full
`)

export { Video }
