import React, { Component } from "react";
import {
  Dropdown,
  Divider,
  Grid,
  Header,
  Container,
  Card,
  Table
} from "semantic-ui-react";

import GraphPie from "../Graph/GraphPie";
import GraphLine from "../Graph/GraphLine";
import GraphBar from "../Graph/GraphBar";

class Alumni extends Component {
  render() {
    // let branch = this.props.body.map(item => (
    //   <TemplateBranchModal item={item} />
    // ));
    return (
      <React.Fragment>
        <Container className="my-5">
          <Header as="h5">
            ค้นหาข้อมูลศิษย์เก่าของปีการศึกษา{" "}
            <Dropdown
              options={[
                { key: "2560", value: "2560", text: "2560" },
                { key: "2561", value: "2561", text: "2561" }
              ]}
              placeholder="Select"
              selection
            />
          </Header>
          <Divider />
          <Grid columns={4} centered>
            <Grid.Row>
              <Grid.Column>
                <div className="rectangle-30">
                  <Header as="h4"></Header>
                  <div className="rectangle-40"> คน</div>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="rectangle-30">
                  <Header as="h4"></Header>
                  <div className="rectangle-40"> คน</div>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="rectangle-30">
                  <Header as="h4"></Header>
                  <div className="rectangle-40"> คน</div>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="rectangle-30">
                  <Header as="h4"></Header>
                  <div className="rectangle-40"> คน</div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid centered>
            <Grid.Row columns={2} stackable>
              <Grid.Column>
                <Card className="card-circle-modal">
                  <Card.Content>
                    <GraphPie />
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Row columns={2} fluid>
                <Grid.Column>
                  <Card className="card-twin-modal">
                    <Card.Content>
                      <GraphBar />
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <br />
                <Grid.Column>
                  <Card className="card-twin-modal">
                    <Card.Content>
                      <GraphLine />
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            </Grid.Row>
            <Grid.Row fluid>
              <Grid.Column width={16}>
                <Card className="card-default">
                  <Card.Header as="h3">
                    การแสดงจำนวนนักศึกษารับเข้าจากโครงการ A
                  </Card.Header>
                  <Card.Content>
                    <GraphBar />
                  </Card.Content>
                  <Card.Content>
                    <Grid columns={4}>
                      <Grid.Row>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <Header as="h5">ทั้งหมด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">สูงสุด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">ต่ำสุด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">ค่าเฉลี่ย</Header>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row fluid>
              <Grid.Column width={16}>
                <Card className="card-default">
                  <Card.Header as="h3">
                    การแสดงจำนวนนักศึกษารับเข้าจากโครงการ A
                  </Card.Header>
                  <Card.Content>
                    <GraphBar />
                  </Card.Content>
                  <Card.Content>
                    <Grid columns={4}>
                      <Grid.Row>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                        <Grid.Column>
                          <Card className="card-count">100</Card>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <Header as="h5">ทั้งหมด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">สูงสุด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">ต่ำสุด</Header>
                        </Grid.Column>
                        <Grid.Column>
                          <Header as="h5">ค่าเฉลี่ย</Header>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row fluid>
              <Header as="h2">
                ตารางสรุปความพึงพอใจของผู้เรียนต่อคุณภาพหลักสูตรและการจัดการเรียนการสอน
              </Header>
              <Divider />
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
                    <Table.Cell style={{ paddingLeft: "4%" }}>
                      1.)
                      ท่านมีความพึงพอใจต่อทักษะความรู้ที่ได้จากการเรียนในหลักสูตร
                    </Table.Cell>
                    <Table.Cell textAlign="center">3</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell style={{ paddingLeft: "4%" }}>
                      2.)
                      ท่านมีความพึงพอใจต่อทักษะด้านการประยุกต์ใช้ความรู้ที่ได้จากการเรียนมาใช้ในการทำงาน
                    </Table.Cell>
                    <Table.Cell textAlign="center">3</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell style={{ paddingLeft: "4%" }}>
                      3.)
                      ท่านมีความพึงพอใจต่อทักษะด้านการคิดวิเคราะห์ที่ได้จากการเรียนมาใช้ใน
                      การทำงาน
                    </Table.Cell>
                    <Table.Cell textAlign="center">3</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell style={{ paddingLeft: "4%" }}>
                      4.)
                      ท่านมีความพึงพอใจต่อทักษะด้านการประเมินลักษณะปัญหาที่ได้จาก
                      การเรียนหลักสูตรมาใช้ในการทำงาน
                    </Table.Cell>
                    <Table.Cell textAlign="center">3</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell style={{ paddingLeft: "4%" }}>
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
                    <Table.Cell style={{ paddingLeft: "4%" }}>
                      1.)
                      ท่านมีความเห็นว่าจำนวนรายวิชาภาคทฤษฎีในหลักสูตรมีความเหมาะสม
                      เพียงใด
                    </Table.Cell>
                    <Table.Cell textAlign="center">3</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell style={{ paddingLeft: "4%" }}>
                      2.)
                      ท่านมีความเห็นว่าจำนวนรายวิชาภาคปฏิบัติในหลักสูตรมีความเหมาะสม
                      เพียงใด
                    </Table.Cell>
                    <Table.Cell textAlign="center">3</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell style={{ paddingLeft: "4%" }}>
                      3.)
                      ท่านมีความว่าความร่วมสมัยของเนื้อหาในหลักสูตรมีความเหมาะสมเพียงใด
                    </Table.Cell>
                    <Table.Cell textAlign="center">3</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell style={{ paddingLeft: "4%" }}>
                      4.)
                      รายวิชาพื้นฐานทางวิศวกรรมในหลักสูตรช่วยส่งเสริมการทำงานของท่าน
                      มากน้อยเพียงใด
                    </Table.Cell>
                    <Table.Cell textAlign="center">3</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell style={{ paddingLeft: "4%" }}>
                      5.)
                      รายวิชาภาษาอังกฤษในหลักสูตรช่วยส่งเสริมการทำงานของท่านมากน้อยเพียงใด
                    </Table.Cell>
                    <Table.Cell textAlign="center">3</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell style={{ paddingLeft: "4%" }}>
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
                    <Table.Cell style={{ paddingLeft: "4%" }}>
                      1.) ท่านมีความพีงพอใจต่อการจัดการเรียนการสอนและกิจกรรม/
                      เนื้อหาด้านคุณธรรม จริยธรรม ที่มีอยู่ในหลักสูตร
                    </Table.Cell>
                    <Table.Cell textAlign="center">3</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell style={{ paddingLeft: "4%" }}>
                      2.) ท่านมีความพีงพอใจต่อการจัดการเรียนการสอนและกิจกรรม/
                      เนื้อหาด้านทักษะความสัมพันธ์ระหว่างบุคคลและความรับผิดชอบ
                      ที่มีอยู่ในหลักสูตร
                    </Table.Cell>
                    <Table.Cell textAlign="center">3</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell style={{ paddingLeft: "4%" }}>
                      3.) ท่านมความพีงพอใจต่อการจัดการเรียนการสอนและกิจกรรม/
                      เนื้อหาด้านทักษะการวิเคราะห์เชิงตัวเลข การสื่อสารและการใช้
                      เทคโนโลยีสารสนเทศ ที่มีอยู่ในหลักสูตร
                    </Table.Cell>
                    <Table.Cell textAlign="center">3</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell style={{ paddingLeft: "4%" }}>
                      4.)
                      กิจกรรมเสริมหลักสูตรและกิจกรรมนักศึกษาช่วยส่งเสริมการทำงาน
                      ของท่านเพียงใด
                    </Table.Cell>
                    <Table.Cell textAlign="center">3</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell style={{ paddingLeft: "4%" }}>
                      5.)
                      กิจกรรมด้านความเป็นนานาชาติช่วยส่งเสริมการทำงานของท่านเพียงใด
                    </Table.Cell>
                    <Table.Cell textAlign="center">3</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Row>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default Alumni;
