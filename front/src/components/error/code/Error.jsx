import { Link } from "react-router-dom"
import "../style/Error.scss"
export default function Error(){
    return (
        <div className="error">
        <div class="box">
<h1>500</h1>
<p>Sorry, it's me, not you.</p>
<p>&#58;&#40;</p>
<p><Link to="/" >Let me try again!</Link></p>
</div>
        </div>
    )
}