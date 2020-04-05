import React, {Component, Fragment} from "react";

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
        name: "ข้อมูลนักศึกษารับเข้า",
        detail: "ระบบตรวจสอบการรับเข้าในรอบต่างๆ",
        url: "/admin/activity",
        icon: "<FaUserTie/>"
    },
    {
        id: 2,
        name: "ข้อมูลกิจกรรม",
        detail:
            "ระบบตรวจสอบกิจกรรมการรับเข้า รวมไปถึงกิจกรรมประชาสัมพันธ์นักศึกษา",
        url: "/Alumni",
        icon: ""
    },
    {
        id: 3,
        name: "ข้อมูลโครงการรับเข้า",
        detail: "ระบบตรวจสอบข้อมูลโครงการรับเข้า",
        url: "/",
        icon: ""
    }
]

class AdminHome extends Component {


    render() {
        return (
            <Fragment>
                <Image size="massive" className="background-white" src={bgyel}/>
                <Image size="massive" className="bottom-left2" src={bannerbot}/>

                <Container>
                    <TemplateHomeAdmin manage={url} header={"จัดการข้อมูลการรับเข้า"}/>
                </Container>
            </Fragment>
        )
    }
}

export default AdminHome