import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Button, Modal, Form, Icon, Input, Row, Col, Card, Table, notification } from 'ant-design-vue';
import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { UserInfoApi } from '@/apis'
import EditModal from './childrens/Edit';

@Component({
  name: 'UserInfo'
})

export default class UserInfo extends Vue {
  private pageNumber = 0;
  private pageSize = 10;
  private data = [];
  private total = 0;
  private currentRow = {};
  private editShow = false;
  private mode: 'create' | 'edit' = 'create';
  private searchParams = {
    user_name: ''
  }

  private created() {
    this.getUserInfo();
  }

  private getUserInfo() {
    UserInfoApi.ApiUserAllSearch({ ...this.searchParams, pageNum: this.pageNumber, pageSize: this.pageSize }).then((res: any) => {
      this.data = res.data.data
      this.total = res.data.total;
    })
  }

  private get pagination() {
    return {
      current: this.pageNumber + 1,
      pageSize: this.pageSize,
      total: this.total,
      onChange: (page: number) => { this.pageNumber = page - 1 },
      showTotal: (total: number) => { return `共 ${total} 条` }
    };
  }

  @Watch('pageNumber')
  private pageNumberChange(val: any) {
    console.log(val);
    if (val + '') {
      this.getUserInfo();
    }
  }

  private onClickSearch() {
    console.log(this.searchParams);
    this.getUserInfo();
  }

  // 关闭弹窗回调
  private onCloseModal() {
    this.editShow = false;
    this.getUserInfo();
  }

  private onClickEdit(row: userItem) {
    this.mode = 'edit';
    this.currentRow = row;
    this.editShow = true;
  }

  private onClickAdd() {
    this.mode = 'create';
    this.currentRow = {};
    this.editShow = true;
  }

  private onClickDelete(row: userItem) {
    Modal.confirm({
      title: '删除用户',
      content: `是否删除用户名为${row.user_name}？删除后不可恢复?`,
      onOk: () => {
        UserInfoApi.ApiDeleteUser({ user_Id: row.user_Id }).then(() => {
          notification.success({
            message: '操作成功',
            description: '删除成功'
          });
          this.getUserInfo();
        })
      }
    });
  }

  private render() {
    const columns = [
      { title: '用户名', dataIndex: 'user_name' },
      { title: '真实姓名', dataIndex: 'user_nickname' },
      { title: '头像', dataIndex: 'avatar' },
      { title: '创建时间', dataIndex: 'create_time' },
      { title: '手机号', dataIndex: 'moble_phone' },
      {
        title: '操作', customRender: (row: userItem) => {
          return (
            <Button.Group size="small">
              <Button type="primary" onClick={() => this.onClickEdit(row)}>编辑</Button>
              <Button type="danger" onClick={() => this.onClickDelete(row)}>删除</Button>
            </Button.Group>
          )
        }
      }
    ]
    return (
      <section>
        <Card>
          用户名：<Input style="width: 200px" placeholder="请输入用户名" vModel={this.searchParams.user_name} />
          <Button onClick={this.onClickSearch} type="primary" icon="search">
            查询
          </Button>
        </Card>
        <div style="text-align: right;">
          <Button.Group style="margin: 10px;">
            <Button type="primary" onClick={this.onClickAdd}>新增</Button>
          </Button.Group>
        </div>
        <Table border columns={columns} dataSource={this.data} pagination={this.pagination} size="small" rowKey="user_Id" >
        </Table>
        <EditModal data={this.currentRow} show={this.editShow} onClose={this.onCloseModal} mode={this.mode} />
      </section>
    )
  }
}

export interface userItem {
  user_name: string,
  user_nickname: string,
  avatar: string,
  create_time: string,
  moble_phone: string,
  email: string,
  birthday: null | moment.Moment,
  age: string,
  user_Id: number
}