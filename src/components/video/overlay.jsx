import React, { useState, useEffect } from "react"
import ctl from "@netlify/classnames-template-literals"
import {
	FaPlay,
	FaPause,
	FaSquareFull,
	FaStepBackward,
	FaStepForward,
	FaArrowsAlt,
	FaCompress,
} from "react-icons/fa"

const VideoOverlay = ({
	isLoading,
	isPlaying,
	video,
	videoWrapper,
	currentTime,
	videoDuration,
	playPauseVideo,
	jumpTime,
	setJumpTime,
}) => {
	const [isFullScreen, setIsFullscreen] = useState(false)
	const JUMP_FACTOR = 4

	console.log(jumpTime)

	const handleJumpForward = () => {
		setJumpTime(prevJumpTime => prevJumpTime + JUMP_FACTOR)
		const newTime = video.currentTime + JUMP_FACTOR

		video.currentTime = Math.floor(newTime)
	}
	const handleBackward = () => {
		setJumpTime(prevJumpTime => prevJumpTime - JUMP_FACTOR)
		const newTime = video.currentTime - JUMP_FACTOR

		video.currentTime = Math.floor(newTime)
	}

	useEffect(() => {
		document.addEventListener("fullscreenchange", e => {
			if (document.fullscreenElement) {
				setIsFullscreen(true)
			} else {
				setIsFullscreen(false)
			}
		})
	}, [])

	const toggleFullScreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen()
		} else {
			videoWrapper.requestFullscreen()
		}
	}
	return (
		<div className={videoOverlayStyle}>
			{isLoading ? "Loading..." : ""}
			{/* Controls Container */}
			<div>
				{/* Progress bar container */}
				<div className={progressBarContainerStyle}>
					{/* Progress bar inner */}
					<div
						className={`${progressBarInnerStyle} ${
							video?.ended ? "" : "progress-inner"
						}`}
						style={{
							animationPlayState:
								isPlaying && !isLoading ? "running" : "paused",
							animationDuration: video?.ended
								? "0s"
								: `${Math.ceil(video?.duration - jumpTime)}s`,
						}}
					/>
				</div>
				{/* Buttons Container Style */}
				<div className={buttonsContainerStyle}>
					<div>
						<button onClick={playPauseVideo}>
							{isPlaying ? <FaPause /> : <FaPlay />}
						</button>

						<button
							className='disabled:opacity-70'
							disabled={!isPlaying}
							onClick={handleBackward}>
							<FaStepBackward />
						</button>
						<button
							className='disabled:opacity-70'
							disabled={!isPlaying}
							onClick={handleJumpForward}>
							<FaStepForward />
						</button>
					</div>
					<span>
						{currentTime}/{videoDuration}
					</span>
					<button onClick={toggleFullScreen}>
						{isFullScreen ? <FaCompress /> : <FaArrowsAlt />}
					</button>
				</div>
			</div>
		</div>
	)
}

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
bg-red-500
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

export { VideoOverlay }
