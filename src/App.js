import ctl from "@netlify/classnames-template-literals"
import { Video } from "./components"
import Footer from "./components/Footer"
import { ReactComponent as WeTube } from "./icons/wetube.svg"

function App() {
	return (
		<main className={mainStyle}>
			<section className={sectionStyle}>
				<div></div>
				<header>
					<WeTube className={logoStyle} />
				</header>
				<div>
					<Video src='https://res.cloudinary.com/aremusmog/video/upload/v1668090866/WeTube/TRAILER_qurlei.mp4' />
				</div>
				<Footer />
			</section>
		</main>
	)
}

const logoStyle = ctl(`
mx-auto
md:w-auto
w-[126px]
`)
const mainStyle = ctl(`
flex
flex-col
justify-center
bg-[#0F0F0F]
min-h-screen 
`)
const sectionStyle = ctl(`

py-12 
text-center 
text-white 
px-8

`)

export default App
