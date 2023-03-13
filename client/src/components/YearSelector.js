import { v4 as uuidv4 } from 'uuid';

//component responsible for displaying a dropdown with year values
const YearSelector = ({ yearBtnValue, onClick }) => {

    const years = ['2010','2011','2012','2013','2014','2015',
        '2016','2017','2018','2019','2020','2021','2022','2023']

    const yearOptions = years.map( year => {
        return <li key={uuidv4()} onClick={onClick.bind(this, year)} ><a className="dropdown-item" >{year}</a></li>
    })

    return (
        <div>
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                { yearBtnValue }
            </button>
            <ul className="dropdown-menu">
                { yearOptions }
            </ul>
        </div>
    )
}

export default YearSelector