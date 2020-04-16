import React, {Component, Fragment} from "react";

import {
    Dropdown,
    Divider,
    Grid,
    Header,
    Container,
    Card,
    Table,
    Image
} from "semantic-ui-react";

// redux
import {connect} from 'react-redux'
import {getAllBranch} from "../../redux/action/BranchAction";

// import bgyel from "../img/bg-head3.png";
import GraphPie from "../../components/Graph/Pie";
import GraphBar from "../../components/Graph/Bar";
import AlumniTypePanel from "../../components/AlumniTypePanel";


class SummarySurvey extends Component {
    
  
    render() {
        let {branch_list} = this.props
        return (
            <Fragment>
                 <Container>
                     <Grid>
                           
                         <Grid.Row>
                            
                            <Header  as = "h3">
                                ตารางสรุปความพึงพอใจของผู้เรียนต่อคุณภาพหลักสูตรและการจัดการเรียนการสอน
                                </Header>
                            <Divider/>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={12} textAlign="center">
                                            ประเด็นการประเมิน
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={4} textAlign="center">
                                            ระดับความพึงพอใจ
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                1.ความสัมพันธ์ของหลักสูตรต่อความสามารถในการทำงาน
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            ท่านมีความพึงพอใจต่อทักษะความรู้ที่ได้จากการเรียนในหลักสูตร
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            ท่านมีความพึงพอใจต่อทักษะด้านการประยุกต์ใช้ความรู้ที่ได้จากการเรียนมาใช้ในการทำงาน
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            ท่านมีความพึงพอใจต่อทักษะด้านการคิดวิเคราะห์ที่ได้จากการเรียนมาใช้ใน
                                            การทำงาน
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            ท่านมีความพึงพอใจต่อทักษะด้านการประเมินลักษณะปัญหาที่ได้จาก
                                            การเรียนหลักสูตรมาใช้ในการทำงาน
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)
                                            ท่านมีความพึงพอใจต่อทักษะด้านการสร้างสรรค์ที่ได้จากการเรียนในหลักสูตร
                                            มาใช้ในการทำงาน
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">2.โครงสร้างหลักสูตร</Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            ท่านมีความเห็นว่าจำนวนรายวิชาภาคทฤษฎีในหลักสูตรมีความเหมาะสม
                                            เพียงใด
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            ท่านมีความเห็นว่าจำนวนรายวิชาภาคปฏิบัติในหลักสูตรมีความเหมาะสม
                                            เพียงใด
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            ท่านมีความว่าความร่วมสมัยของเนื้อหาในหลักสูตรมีความเหมาะสมเพียงใด
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            รายวิชาพื้นฐานทางวิศวกรรมในหลักสูตรช่วยส่งเสริมการทำงานของท่าน
                                            มากน้อยเพียงใด
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)
                                            รายวิชาภาษาอังกฤษในหลักสูตรช่วยส่งเสริมการทำงานของท่านมากน้อยเพียงใด
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            6.) รายวิชาศึกษาทั่วไป (Gen. Ed.)
                                            ในหลักสูตรช่วยส่งเสริมการทำงานของท่าน มากน้อยเพียงใด
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                3.ความสัมพันธ์ของการจัดการเรียนการสอนของหลักสูตรต่อคุณลักษณะของบัณฑิต
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.) ท่านมีความพีงพอใจต่อการจัดการเรียนการสอนและกิจกรรม/
                                            เนื้อหาด้านคุณธรรม จริยธรรม ที่มีอยู่ในหลักสูตร
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.) ท่านมีความพีงพอใจต่อการจัดการเรียนการสอนและกิจกรรม/
                                            เนื้อหาด้านทักษะความสัมพันธ์ระหว่างบุคคลและความรับผิดชอบ
                                            ที่มีอยู่ในหลักสูตร
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.) ท่านมความพีงพอใจต่อการจัดการเรียนการสอนและกิจกรรม/
                                            เนื้อหาด้านทักษะการวิเคราะห์เชิงตัวเลข
                                            การสื่อสารและการใช้ เทคโนโลยีสารสนเทศ
                                            ที่มีอยู่ในหลักสูตร
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            กิจกรรมเสริมหลักสูตรและกิจกรรมนักศึกษาช่วยส่งเสริมการทำงาน
                                            ของท่านเพียงใด
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)
                                            กิจกรรมด้านความเป็นนานาชาติช่วยส่งเสริมการทำงานของท่านเพียงใด
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Row>
                        <Grid.Row>
                            <Header as="h3">
                                 ความผูกพันของนักศึกษาต่อคณะวิทยาศาสตร์
                            </Header>
                            <Divider/>
                            <Table celled structured>
                                <Table.Header>
                                    <Table.Row active>
                                        <Table.HeaderCell width={12} textAlign="center">
                                            ประเด็นการประเมิน
                                        </Table.HeaderCell>
                                        <Table.HeaderCell width={4} textAlign="center">
                                            ระดับความพึงพอใจ
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                1.ความผูกพันต่อคณะวิทยาศาสตร์
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            ท่านมีความภูมิใจที่ได้เป็นนักศึกษาคณะวิทยาศาสตร์
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            ท่านรู้สึกไม่พอใจเมื่อมีการกล่าวถึงคณะวิทยาศาสตร์ในทางที่เสื่อมเสีย
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            ท่านจะรักษาชื่อเสียงและสร้างชื่อเสียงให้กับคณะวิทยาศาสตร์ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            ท่านมีความต้องการที่จะประชาสัมพันธ์ให้ผู้อื่นได้รับรู้ถึงศักยภาพของคณะวิทยาศาสตร์
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)
                                            ท่านมีความรู้สึกพึงพอใจที่ได้อยู่ในคณะวิทยาศาสตร์
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            6.)
                                            ท่านมีความเต็มใจที่จะเสียสละเวลาส่วนตนเมื่อมีโอกาสร่วมกิจกรรมที่คณะวิทยาศาสตร์จัดขึ้น
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            7.)
                                            เมื่อท่านจบการศึกษาจากคณะวิทยาศาสตร์ไปแล้ว ท่านมีความต้องการที่จะกลับมาเยี่ยมเยือนคณะ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            8.)
                                            ท่านคิดว่าท่านตัดสินใจถูกในการเข้าศึกษาในคณะวิทยาศาสตร์ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            9.)
                                            ท่านเห็นด้วยกับนโยบายของคณะวิทยาศาสตร์ในส่วนที่เกี่ยวข้องกับนักศึกษาและอื่นๆ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                   
                                </Table.Body>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell colSpan="2" textAlign="left">
                                            <Header as="h4">
                                                2. ความผูกพันต่ออาจารย์และบุคลากร
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            1.)
                                            ท่านมีความรักและเคารพอาจารย์และบุคลากร 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            2.)
                                            ท่านรู้สึกดีใจและภูมิใจที่ได้เป็นลูกศิษย์ของอาจารย์ในคณะวิทยาศาสตร์ 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            3.)
                                            ท่านมีความรู้สึกว่าอาจารย์คือบุคคลหนึ่งที่ท่านไว้ใจและต้องการคำปรึกษา
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            4.)
                                            ท่านคิดว่าอาจารย์และบุคลากรในคณะวิทยาศาสตร์มีความทุ่มเทและเสียสละในการทำงานของคณะวิทยาศาสตร์
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            5.)
                                            อาจารย์ส่วนใหญ่รับฟังความเห็นของนักศึกษา
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            6.)
                                            อาจารย์มีส่วนช่วยส่งเสริมการพัฒนาตนเองเกี่ยวกับทัศนคติและค่านิยมในทางที่ดีให้แก่ท่าน
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            7.)
                                            ท่านคิดว่าอาจารย์หรือบุคลากรเป็นบุคคลที่ควรนำไปเป็นแบบอย่างที่ดีในการดำเนินชึวิต 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            8.)
                                            ท่านเต็มใจที่จะเสียสละเวลาส่วนตัว เมื่ออาจารย์ไหว้วานให้ช่วยงาน 
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell style={{paddingLeft: "4%"}}>
                                            9.)
                                            ท่านมีความผูกพันกับอาจารย์และบุคลากรในคณะวิทยาศาสตร์ในทางที่ดี
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">3</Table.Cell>
                                    </Table.Row>
                                   
                                </Table.Body> 
                                
                              
                            </Table>
                        </Grid.Row>  
                    </Grid>

                </Container>

            </Fragment>
        )
    }
}
export default SummarySurvey