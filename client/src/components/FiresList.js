import { v4 as uuidv4 } from 'uuid';

//component responsible for displaying list of fires
const FiresList = ({ firesData }) => {

    const fires = firesData.map( f => {
        return <li className="list-group-item" key={uuidv4()} >{ `${f.title} - ${f.country}` }</li>
      })
    
    return (
        <div>
            <ul className="list-group list-group-flush">
                { fires }
            </ul>
        </div>
    )
}


export default FiresList