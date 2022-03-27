import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { Modal, Form, Input, Select, Radio, notification, Alert, DatePicker } from 'ant-design-vue';
import { UserInfoApi } from '@/apis';
import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { ruleIdentify, rulePhone } from '@/config/rules.config';
import { userItem } from '../UserInfo'
import moment from 'moment';
Vue.use(Modal)

@Component({
  props: {
    Form
  },
  components: {
    Modal, Form, Input, Select, Radio, notification, Alert
  }
})
class Edit extends Vue { // 新增、编辑未完工
  @Prop() private form!: WrappedFormUtils;
  @Prop({
    type: String,
    default: 'create'
  }) private mode!: string;
  @Prop({
    type: Boolean,
    default: false
  }) private show!: boolean;
  @Prop({
    type: Object,
    default: () => { return { id: null } }
  }) private data!: userItem;
  private loading = false;

  @Watch('show')
  private showChange(val: boolean) {
    if (val && this.mode === 'edit') {
      console.log(this.data, 'data');
      this.form.setFieldsValue({
        user_name: this.data.user_name || '0',
        user_nickname: this.data.user_nickname || '',
        avatar: this.data.avatar || '',
        email: this.data.email || '',
        birthday: this.data.birthday ? moment(this.data.birthday, 'YY-MM-dd') : null,
        moble_phone: this.data.moble_phone || '',
        age: this.data.age || ''
      });
    } else {
      this.form.resetFields();
    }
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    this.form.validateFields((err, value) => {
      if (!err) {
        this.loading = true;
        value.birthday = value.birthday === null ? null : value.birthday;
        if (this.mode === 'create') {
          UserInfoApi.ApiCreateUser(value).then(() => {
            notification.success({
              message: '新增成功',
              description: '新增成功'
            });
            this.closeModalEmit(true);
          }).finally(() => {
            this.loading = false;
          });
        } else {
          value.user_Id = this.data.user_Id;
          UserInfoApi.ApiUpdateUser(value).then(() => {
            notification.success({
              message: '更新成功',
              description: '更新成功'
            });
            this.closeModalEmit(true);
          }).finally(() => {
            this.loading = false;
          });
        }
      }
    });
  }

  @Emit('close')
  private closeModalEmit(tag: boolean) {
    return tag;
  }

  private render() {
    const { getFieldDecorator } = this.form;
    const formItemLayout: any = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    };
    return (
      <Modal
        visible={this.show}
        title={this.mode === 'create' ? '新增用户' : '编辑用户'}
        confirmLoading={this.loading}
        onOk={this.handleSubmit.bind(this)}
        onCancel={this.closeModalEmit.bind(this, false)}
      >
        <Form layout="horizontal">
          <Form.Item label="用户名" labelCol={formItemLayout.labelCol} wrapperCol={formItemLayout.wrapperCol}>
            {
              getFieldDecorator('user_name', {
                rules: [
                  { required: true, message: '用户名是必填的' }
                ]
              })(
                <Input
                  disabled={this.mode === 'edit'}
                  placeholder="请输入用户名" maxLength={10}
                >
                </Input>
              )
            }
          </Form.Item>
          <Form.Item label="真实姓名" labelCol={formItemLayout.labelCol} wrapperCol={formItemLayout.wrapperCol}>
            {
              getFieldDecorator('user_nickname', {
                rules: [
                  { required: true, message: '姓名是必填的' }
                ]
              })(
                <Input
                  placeholder="请输入姓名" maxLength={10}
                >
                </Input>
              )
            }
          </Form.Item>
          <Form.Item label="年龄" labelCol={formItemLayout.labelCol} wrapperCol={formItemLayout.wrapperCol}>
            {
              getFieldDecorator('age', {
                rules: [
                  { required: true, message: '年龄是必填的' }
                ]
              })(
                <Input
                  placeholder="请输入年龄" maxLength={10}
                >
                </Input>
              )
            }
          </Form.Item>
          <Form.Item label="联系电话" labelCol={formItemLayout.labelCol} wrapperCol={formItemLayout.wrapperCol}>
            {
              getFieldDecorator('moble_phone', {
                rules: [
                  { pattern: rulePhone, message: '联系电话输入不合法' }
                ]
              })(
                <Input
                  placeholder="请输入联系电话" maxLength={11}
                >
                </Input>
              )
            }
          </Form.Item>
          <Form.Item label="邮箱" labelCol={formItemLayout.labelCol} wrapperCol={formItemLayout.wrapperCol}>
            {
              getFieldDecorator('email', {})(
                <Input
                  placeholder="请输入邮箱" maxLength={30}
                >
                </Input>
              )
            }
          </Form.Item>
          <Form.Item label="头像" labelCol={formItemLayout.labelCol} wrapperCol={formItemLayout.wrapperCol}>
            {
              getFieldDecorator('avatar', {})(
                <Input
                  placeholder="请上传头像" maxLength={30}
                >
                </Input>
              )
            }
          </Form.Item>
          <Form.Item label="生日" labelCol={formItemLayout.labelCol} wrapperCol={formItemLayout.wrapperCol}>
            {
              getFieldDecorator('birthday', {})(
                <DatePicker
                  format="YYYY-MM-DD"
                  placeholder="请选择日期"
                />
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create({
  props: {
    show: Boolean,
    mode: String,
    data: Object
  }
})(Edit);
