import { Content } from './components/Content'
import { Left } from './components/Left'
import { Right } from './components/Right'
import './Layout.css'
const Layout=()=>{
    return <div className='layout'>
        <Left />
        <Content />
        <Right/>
       
    </div>
}

export default Layout