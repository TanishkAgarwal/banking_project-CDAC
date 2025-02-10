import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { url } from '../common/constants'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import $, { data } from 'jquery'
import { useLocation } from 'react-router'
import './rating.css'



const Rating = () => {

    $(document).ready(function () {

        $("input[type='radio']").click(function () {
            var sim = $("input[type='radio']:checked").val();
            //alert(sim);
            if (sim < 3) { $('.myratings1').css('color', 'red'); $(".myratings1").text(sim); } else { $('.myratings1').css('color', 'green'); $(".myratings1").text(sim); }
        });
    });



    return (
        <div className='.body1'>
            <div className="container d-flex justify-content-center mt-100">
                <div className="row">
                    <div className="col-md-6">
                        <div className="car1">
                            <div className="car1-body text-center"> <span className="myratings1">4.5</span>
                                <h4 className="mt-1">Rate us</h4>
                                <fieldset className="rating1"> <input type="radio" id="star5" name="rating" value="5" />
                                    <label className="full1" for="star5" title="Awesome - 5 stars"></label>
                                    <input type="radio" id="star4half" name="rating" value="4.5" />
                                    <label className="half" for="star4half" title="Pretty good - 4.5 stars"></label>
                                    <input type="radio" id="star4" name="rating" value="4" />
                                    <label className="full1" for="star4" title="Pretty good - 4 stars"></label>
                                    <input type="radio" id="star3half" name="rating" value="3.5" />
                                    <label className="half" for="star3half" title="Meh - 3.5 stars"></label>
                                    <input type="radio" id="star3" name="rating" value="3" />
                                    <label className="full1" for="star3" title="Meh - 3 stars"></label>
                                    <input type="radio" id="star2half" name="rating" value="2.5" />
                                    <label className="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
                                    <input type="radio" id="star2" name="rating" value="2" />
                                    <label className="full1" for="star2" title="Kinda bad - 2 stars"></label>
                                    <input type="radio" id="star1half" name="rating" value="1.5" />
                                    <label className="half" for="star1half" title="Meh - 1.5 stars"></label>
                                    <input type="radio" id="star1" name="rating" value="1" />
                                    <label className="full1" for="star1" title="Sucks big time - 1 star"></label>
                                    <input type="radio" id="starhalf" name="rating" value="0.5" />
                                    <label className="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
                                    <input type="radio" className="reset-option1" name="rating" value="reset" /> 
                                </fieldset>
                                    <a href='/' type='button' className="btn btn-success mx-auto d-block">ok</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rating