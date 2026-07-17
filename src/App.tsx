import { Footer } from '@/components/layout/Footer'
import { Nav } from '@/components/layout/Nav'
import { Focus } from '@/components/sections/Focus'
import { Hero } from '@/components/sections/Hero'
import { JoinUs } from '@/components/sections/JoinUs'
import { Products } from '@/components/sections/Products'
import { Team } from '@/components/sections/Team'
import { Vision } from '@/components/sections/Vision'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Team />
        <Focus />
        <Products />
        <Vision />
        <JoinUs />
      </main>
      <Footer />
    </>
  )
}
