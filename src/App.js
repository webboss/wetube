import ctl from "@netlify/classnames-template-literals"
import Footer from "./components/Footer"

function App() {
	return (
		<section className={sectionStyle}>
			<Footer />
		</section>
	)
}

const sectionStyle = ctl(`
bg-[#0F0F0F]
min-h-screen 
md:pt-36 
md:pb-20 
py-12 
text-center 
text-white 
px-8
`)

export default App
