import React from "react";
import SpinnerImg from '../../assets/img/spinner.gif';

let Spinner = () => {
    return (
        <React.Fragment>
          <div>
            <img src={SpinnerImg} alt="Spinner" className="d-block m-auto" style={{width:'100px'}}/>
          </div>
        </React.Fragment>
    )
}

export default Spinner;