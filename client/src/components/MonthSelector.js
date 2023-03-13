import { v4 as uuidv4 } from 'uuid';

//component responsible for displaying a dropdown with month values
const MonthSelector = ({ monthBtnValue, onClick }) => {

    const months = [
        {id:'JAN', text: 'January'}, 
        {id:'FEB', text:'February'}, 
        {id:'MAR', text:'March'},
        {id:'APR', text:'April'},
        {id:'MAY', text:'May'},
        {id:'JUN', text:'June'},
        {id:'JUL', text:'July'},
        {id:'AUG', text:'August'},
        {id:'SEP', text:'September'},
        {id:'OCT', text:'October'},
        {id:'NOV', text:'November'},
        {id:'DEC', text:'December'} 
    ]

    const monthOptions = months.map( month => {
        return <li key={uuidv4()} onClick={onClick.bind(this, month)} ><a className="dropdown-item" >{month.text}</a></li>
    })

    return (
        <div>
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                { monthBtnValue }
            </button> 
            <ul className="dropdown-menu" >
                { monthOptions }
            </ul>
        </div>
    )
}

export default MonthSelector