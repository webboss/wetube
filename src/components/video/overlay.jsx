import React from "react"
import ctl from "@netlify/classnames-template-literals"

const VideoOverlay = ({
	isLoading,
	isPlaying,
	video,
	currentTime,
	videoDuration,
	playPauseVideo,
}) => {
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
							isLoading ? "" : "progress-inner"
						}`}
						style={{
							animationPlayState: isPlaying ? "running" : "paused",
							animationDuration: isLoading ? "0s" : `${video.duration}s`,
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

export { VideoOverlay }
