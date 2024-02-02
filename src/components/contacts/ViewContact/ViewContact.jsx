import React, { useEffect, useState } from "react";
import {Link, useParams} from 'react-router-dom';
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

let ViewContact = () => {

    let {contactId} = useParams(); //get parameter from url

    let [state, setState] = useState({
        loading: false,
        contact: {},
        errorMessage: '',
        group: {}

    });

    useEffect(()=>{
        async function fetchData() {

            setState({...state, loading: true});

            try {
                let response = await ContactService.getContact(contactId);
                let groupResponse = await ContactService.getGroup(response.data);

                setTimeout(()=>{
                    setState({
                        ...state, 
                        loading: false,
                        contact: response.data,
                        group: groupResponse.data

                    });
                },200)
                console.log(groupResponse.data);
                
            } catch (error) {
                setState({
                    ...state,
                    loading: false,
                    errorMessage: error.message
                });
                
            }

        }

        fetchData();

    },[contactId])

    let {loading, contact, errorMessage, group} = state;

    return (
        <React.Fragment>
            <section className="view-contact-intro p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-warning fw-bold">
                                View Contact
                            </p>
                            <p className="fst-italic">Lorem Ipsum is simply dummy text
                                of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley of
                                type and scrambled it to make a type specimen book. 
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {
                (loading) ? <Spinner/> : 
                <React.Fragment>
                    {
                        Object.keys(contact).length > 0 && Object.keys(contact).length > 0 &&
                   
                        <section className="view-contact mt-3">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-md-4">
                                        <img src={contact.photo} className="contact-img" />
                                    </div>
                                    <div className="col-md-8">
                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-action">
                                                Name: <span className="fw-bold">{contact.name}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Mobile Number: <span className="fw-bold">{contact.mobile}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Email: <span className="fw-bold">{contact.email}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Company: <span className="fw-bold">{contact.company}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Title: <span className="fw-bold">{contact.title}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Group: <span className="fw-bold">{group.name}</span>
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Link to={'/contacts/list'} className="btn btn-warning">Back</Link>

                                    </div>
                                </div>
                            </div>

                        </section>
                    }

                </React.Fragment>
            }


        </React.Fragment>
    )
}

export default ViewContact;