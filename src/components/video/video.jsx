import ctl from "@netlify/classnames-template-literals"
import React from "react"
import { useState, useRef } from "react"

const Video = ({ src, ...props }) => {
	const [isLoading, setIsLoading] = useState(true)
	const [isPlaying, setIsPlaying] = useState(false)
	const [videoDuration, setVideoDuration] = useState("00:00")
	const [currentTime, setCurrentTime] = useState("00:00")
	const videoRef = useRef(null)

	const formatToTens = number => {
		if (number < 10) {
			return `0${number}`
		} else {
			return number
		}
	}
	const convertToMinuteSeconds = duration => {
		const ONE_MINUTE = 60 // seconds
		const minutes = Math.round(duration / ONE_MINUTE)
		const minutesInSeconds = ONE_MINUTE * minutes

		let remainingSeconds
		if (minutes) {
			remainingSeconds = Math.round(duration % minutesInSeconds)
		} else {
			remainingSeconds = Math.round(duration)
		}

		console.log(duration, minutes, minutesInSeconds, remainingSeconds)
		return `${formatToTens(minutes)}:${formatToTens(remainingSeconds)}`
	}
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
		console.log(videoRef.current.currentTime)

		setCurrentTime(() => convertToMinuteSeconds(videoRef.current.currentTime))
	}
	return (
		<div className={videoWrapperStyle}>
			{isLoading ? "Loading..." : ""}
			<video
				onCanPlayThrough={() => {
					setVideoDuration(() =>
						convertToMinuteSeconds(videoRef.current.duration)
					)
					setIsLoading(false)
				}}
				onWaiting={() => setIsLoading(true)}
				preload='metadata'
				onEnded={() => setIsPlaying(false)}
				onTimeUpdate={onTimeUpdate}
				{...props}
				className={videoStyle}
				ref={videoRef}>
				<source src={src} type='video/mp4'></source>
			</video>
			<div className={videoOverlayStyle}>
				{/* Controls Container */}
				<div>
					{/* Progress bar container */}
					<div className={progressBarContainerStyle}>
						{/* Progress bar inner */}
						<div
							className={`${progressBarInnerStyle} ${
								isLoading ? "" : "progress-inner"
							}`}
							style={{
								animationPlayState: isPlaying ? "running" : "paused",
								animationDuration: isLoading
									? "0s"
									: `${videoRef.current.duration}s`,
							}}
						/>
					</div>
					{/* Buttons Container Style */}
					<div className={buttonsContainerStyle}>
						<button onClick={playPauseVideo}>
							{isPlaying ? "Pause" : "Play"}
						</button>
						<span>
							{currentTime}/{videoDuration}
						</span>
						<button>Fullscreen</button>
					</div>
				</div>
			</div>
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

const videoOverlayStyle = ctl(`
absolute
left-0
right-0
top-0
bottom-0
w-full
h-[100%]
bg-black/20
flex
flex-col
justify-end
`)

const progressBarContainerStyle = ctl(`
h-1
w-[98%]
mx-auto 
bg-white
`)

const progressBarInnerStyle = ctl(`
bg-black
h-full
w-0

`)

const buttonsContainerStyle = ctl(`
w-[95%]
mx-auto
flex
justify-between
items-center
py-3
font-[12px]
`)
export { Video }
