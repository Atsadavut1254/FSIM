import React, { Component, Fragment } from "react";

import {
    Container,
    Divider,
    Header,
    Image,
    Grid,
    Button, Icon
} from "semantic-ui-react";

import bgyel from "../../../img/head-left.png";
import bannerbot from "../../../img/bottom-right.png";
import TemplateHomeAdmin from "../../admin/TemplateHomeAdmin";




const url = [
    {
        id: 1,
        name: "DEPARTMENT",
        detail: "ระบบจัดการภาควิชา",
        url: "/admin/activity",
        
    },
    {
        id: 2,
        name: "BRANCH",
        detail:"ระบบจัดการสาขา",
        url: "/Alumni",
        
    },
    {
        id: 3,
        name: "COURSE",
        detail: "ระบบจัดการวิชาเรียน",
        url: "/",
        
    },
    {
        id: 4,
        name: "SCHOOL",
        detail: "ระบบจัดการโรงเรียน",
        url: "/",
        
    }
]

class AdminHome extends Component {


    render() {
        return (
            <Fragment>
                <Image size="massive" className="background-white" src={bgyel} />
                <Image size="massive" className="bottom-left2" src={bannerbot} />
                <TemplateHomeAdmin manage={url} header={"จัดการข้อมูลทั่วไป"}/>
            </Fragment>
        )
    }
}

export default AdminHome